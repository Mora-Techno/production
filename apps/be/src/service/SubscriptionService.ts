import prisma from 'prisma/client';
import type { Prisma } from '@prisma/client';
import StripeService from '@/service/StripeService';
import XenditService from '@/service/XenditService';
import { SUBSCRIPTION_PLANS, getPeriodEnd, getPlanPrice } from '@/config/subscriptionPlans';
import { getWorkstationUserLimit } from '@/utils/tierLimits';
import type { BillingCycle, SubscriptionTier } from '@repo/types/company.types';
import type {
  CheckoutData,
  PaymentProvider,
  PickCreateCheckout,
  SubscriptionDetail,
} from '@repo/types/subscription.types';

class SubscriptionService {
  public listPlans() {
    return SUBSCRIPTION_PLANS;
  }

  public async getDetail(companyId: string): Promise<SubscriptionDetail | null> {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        subscription: true,
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!company) return null;

    return {
      company: {
        id: company.id,
        name: company.name,
        tier: company.tier,
        billingCycle: company.billingCycle,
        subscriptionStartsAt: company.subscriptionStartsAt.toISOString(),
        subscriptionEndsAt: company.subscriptionEndsAt?.toISOString() ?? null,
        maxWorkstationUsers: getWorkstationUserLimit(company.tier),
      },
      subscription: company.subscription
        ? {
            id: company.subscription.id,
            companyId: company.subscription.companyId,
            tier: company.subscription.tier,
            billingCycle: company.subscription.billingCycle,
            status: company.subscription.status,
            provider: company.subscription.provider,
            currentPeriodStart: company.subscription.currentPeriodStart?.toISOString() ?? null,
            currentPeriodEnd: company.subscription.currentPeriodEnd?.toISOString() ?? null,
            cancelAtPeriodEnd: company.subscription.cancelAtPeriodEnd,
            maxWorkstationUsers: getWorkstationUserLimit(company.subscription.tier),
          }
        : null,
      recentPayments: company.payments.map((payment) => ({
        id: payment.id,
        provider: payment.provider,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        tier: payment.tier,
        billingCycle: payment.billingCycle,
        createdAt: payment.createdAt.toISOString(),
      })),
    };
  }

  private async activateSubscription(input: {
    companyId: string;
    tier: SubscriptionTier;
    billingCycle: BillingCycle;
    provider: PaymentProvider;
    providerCustomerId?: string | null;
    providerSubscriptionId?: string | null;
    providerPaymentId?: string | null;
    amount: number;
    currency: string;
    metadata?: Record<string, unknown>;
  }) {
    const now = new Date();
    const periodEnd = getPeriodEnd(input.billingCycle, now);

    return prisma.$transaction(async (tx) => {
      const company = await tx.company.update({
        where: { id: input.companyId },
        data: {
          tier: input.tier,
          billingCycle: input.billingCycle,
          subscriptionStartsAt: now,
          subscriptionEndsAt: periodEnd,
          ...(input.provider === 'stripe' &&
            input.providerCustomerId && {
              stripeCustomerId: input.providerCustomerId,
            }),
          ...(input.provider === 'xendit' &&
            input.providerCustomerId && {
              xenditCustomerId: input.providerCustomerId,
            }),
        },
      });

      const subscription = await tx.subscription.upsert({
        where: { companyId: input.companyId },
        create: {
          companyId: input.companyId,
          tier: input.tier,
          billingCycle: input.billingCycle,
          status: 'active',
          provider: input.provider,
          providerCustomerId: input.providerCustomerId ?? null,
          providerSubscriptionId: input.providerSubscriptionId ?? null,
          currentPeriodStart: now,
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: false,
        },
        update: {
          tier: input.tier,
          billingCycle: input.billingCycle,
          status: 'active',
          provider: input.provider,
          providerCustomerId: input.providerCustomerId ?? null,
          providerSubscriptionId: input.providerSubscriptionId ?? null,
          currentPeriodStart: now,
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: false,
        },
      });

      const payment = await tx.payment.create({
        data: {
          companyId: input.companyId,
          subscriptionId: subscription.id,
          provider: input.provider,
          providerPaymentId: input.providerPaymentId ?? null,
          amount: input.amount,
          currency: input.currency,
          status: input.amount === 0 ? 'paid' : 'paid',
          tier: input.tier,
          billingCycle: input.billingCycle,
          metadata: input.metadata as Prisma.InputJsonValue | undefined,
        },
      });

      return { company, subscription, payment };
    });
  }

  public async createCheckout(
    companyId: string,
    leader: { email: string; fullName: string },
    input: PickCreateCheckout,
  ): Promise<CheckoutData> {
    if (input.tier === 'free') {
      const { amount, currency } = getPlanPrice('free', input.billingCycle, input.provider);

      await this.activateSubscription({
        companyId,
        tier: 'free',
        billingCycle: input.billingCycle,
        provider: input.provider,
        amount,
        currency,
      });

      return {
        provider: input.provider,
        checkoutUrl: null,
        sessionId: 'free-tier',
        tier: input.tier,
        billingCycle: input.billingCycle,
        amount,
        currency,
      };
    }

    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
    const successUrl = `${frontendUrl}/subscription/success?provider=${input.provider}`;
    const cancelUrl = `${frontendUrl}/subscription/cancel?provider=${input.provider}`;

    if (input.provider === 'stripe') {
      if (!StripeService.isConfigured()) {
        throw new Error('Stripe belum dikonfigurasi. Isi STRIPE_SECRET_KEY di .env');
      }

      const session = await StripeService.createCheckoutSession({
        companyId,
        email: leader.email,
        tier: input.tier,
        billingCycle: input.billingCycle,
        successUrl,
        cancelUrl,
      });

      await prisma.payment.create({
        data: {
          companyId,
          provider: 'stripe',
          providerPaymentId: session.sessionId,
          amount: session.amount,
          currency: session.currency,
          status: 'pending',
          tier: input.tier,
          billingCycle: input.billingCycle,
        },
      });

      return {
        provider: 'stripe',
        checkoutUrl: session.checkoutUrl,
        sessionId: session.sessionId,
        tier: input.tier,
        billingCycle: input.billingCycle,
        amount: session.amount,
        currency: session.currency,
      };
    }

    if (!XenditService.isConfigured()) {
      throw new Error('Xendit belum dikonfigurasi. Isi XENDIT_SECRET_KEY di .env');
    }

    const invoice = await XenditService.createInvoice({
      companyId,
      email: leader.email,
      fullName: leader.fullName,
      tier: input.tier,
      billingCycle: input.billingCycle,
      successUrl,
      cancelUrl,
    });

    await prisma.payment.create({
      data: {
        companyId,
        provider: 'xendit',
        providerPaymentId: invoice.sessionId,
        amount: invoice.amount,
        currency: invoice.currency,
        status: 'pending',
        tier: input.tier,
        billingCycle: input.billingCycle,
        metadata: { externalId: invoice.externalId },
      },
    });

    return {
      provider: 'xendit',
      checkoutUrl: invoice.checkoutUrl,
      sessionId: invoice.sessionId,
      tier: input.tier,
      billingCycle: input.billingCycle,
      amount: invoice.amount,
      currency: invoice.currency,
    };
  }

  public async cancelSubscription(companyId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { companyId },
    });

    if (!subscription) {
      throw new Error('Langganan aktif tidak ditemukan');
    }

    const now = new Date();

    return prisma.$transaction(async (tx) => {
      await tx.subscription.update({
        where: { companyId },
        data: {
          status: 'canceled',
          cancelAtPeriodEnd: true,
        },
      });

      return tx.company.update({
        where: { id: companyId },
        data: {
          tier: 'free',
          billingCycle: 'monthly',
          subscriptionEndsAt: now,
        },
      });
    });
  }

  public async handleStripeWebhook(payload: string, signature: string | null) {
    const event = StripeService.constructWebhookEvent(payload, signature);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as {
        id: string;
        metadata?: Record<string, string>;
        customer?: string | null;
        subscription?: string | null;
        amount_total?: number | null;
        currency?: string | null;
      };

      const companyId = session.metadata?.companyId;
      const tier = session.metadata?.tier as SubscriptionTier | undefined;
      const billingCycle = session.metadata?.billingCycle as BillingCycle | undefined;

      if (!companyId || !tier || !billingCycle) {
        throw new Error('Metadata checkout Stripe tidak lengkap');
      }

      await prisma.payment.updateMany({
        where: {
          companyId,
          provider: 'stripe',
          providerPaymentId: session.id,
        },
        data: { status: 'paid' },
      });

      await this.activateSubscription({
        companyId,
        tier,
        billingCycle,
        provider: 'stripe',
        providerCustomerId: session.customer ?? null,
        providerSubscriptionId: session.subscription ?? null,
        providerPaymentId: session.id,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? 'usd',
        metadata: session.metadata,
      });
    }

    return { received: true, type: event.type };
  }

  public async handleXenditWebhook(payload: Record<string, unknown>, callbackToken: string | null) {
    if (!XenditService.verifyWebhookToken(callbackToken)) {
      throw new Error('Xendit webhook token tidak valid');
    }

    const status = String(payload.status ?? '');
    const metadata = (payload.metadata ?? {}) as Record<string, string>;
    const companyId = metadata.companyId;
    const tier = metadata.tier as SubscriptionTier | undefined;
    const billingCycle = metadata.billingCycle as BillingCycle | undefined;
    const invoiceId = String(payload.id ?? '');

    if (status.toUpperCase() === 'PAID' && companyId && tier && billingCycle) {
      await prisma.payment.updateMany({
        where: {
          companyId,
          provider: 'xendit',
          providerPaymentId: invoiceId,
        },
        data: { status: 'paid' },
      });

      await this.activateSubscription({
        companyId,
        tier,
        billingCycle,
        provider: 'xendit',
        providerPaymentId: invoiceId,
        amount: Number(payload.amount ?? 0),
        currency: String(payload.currency ?? 'idr').toLowerCase(),
        metadata: payload,
      });
    }

    return { received: true, status };
  }
}

export default new SubscriptionService();
