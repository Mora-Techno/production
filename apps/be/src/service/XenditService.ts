import type { BillingCycle, SubscriptionTier } from '@/types/company.types';
import { getPlan, getPlanPrice } from '@/config/subscriptionPlans';

interface XenditInvoiceResponse {
  id: string;
  external_id: string;
  invoice_url: string;
  status: string;
  amount: number;
  currency: string;
}

class XenditService {
  private getSecretKey(): string {
    const secretKey = process.env.XENDIT_SECRET_KEY;
    if (!secretKey) {
      throw new Error('XENDIT_SECRET_KEY belum dikonfigurasi');
    }
    return secretKey;
  }

  public isConfigured(): boolean {
    return Boolean(process.env.XENDIT_SECRET_KEY);
  }

  private authHeader(): string {
    return `Basic ${Buffer.from(`${this.getSecretKey()}:`).toString('base64')}`;
  }

  public async createInvoice(input: {
    companyId: string;
    email: string;
    fullName: string;
    tier: SubscriptionTier;
    billingCycle: BillingCycle;
    successUrl: string;
    cancelUrl: string;
  }) {
    const plan = getPlan(input.tier);
    const { amount, currency } = getPlanPrice(input.tier, input.billingCycle, 'xendit');

    const externalId = `mora-${input.companyId}-${Date.now()}`;

    const response = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        Authorization: this.authHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        external_id: externalId,
        amount,
        currency: currency.toUpperCase(),
        payer_email: input.email,
        description: `Mora ${plan.name} - ${input.billingCycle}`,
        customer: {
          given_names: input.fullName,
          email: input.email,
        },
        success_redirect_url: input.successUrl,
        failure_redirect_url: input.cancelUrl,
        metadata: {
          companyId: input.companyId,
          tier: input.tier,
          billingCycle: input.billingCycle,
          provider: 'xendit',
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Xendit error: ${errorBody}`);
    }

    const invoice = (await response.json()) as XenditInvoiceResponse;

    return {
      checkoutUrl: invoice.invoice_url,
      sessionId: invoice.id,
      externalId: invoice.external_id,
      amount: invoice.amount,
      currency: invoice.currency.toLowerCase(),
    };
  }

  public verifyWebhookToken(token: string | null): boolean {
    const expected = process.env.XENDIT_WEBHOOK_TOKEN;
    if (!expected) {
      throw new Error('XENDIT_WEBHOOK_TOKEN belum dikonfigurasi');
    }

    return token === expected;
  }
}

export default new XenditService();
