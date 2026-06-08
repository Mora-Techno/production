import SubscriptionService from '@/service/SubscriptionService';
import { errorResponse, successResponse } from '@/http/response';
import type { JwtPayload } from '@/types/auth.types';
import type { CreateCheckoutBody } from '@/types/subscription.types';

function getUser(c: any): JwtPayload {
  return c.user as JwtPayload;
}

class SubscriptionController {
  public async listPlans(c: any) {
    try {
      const data = SubscriptionService.listPlans();
      return c.json(successResponse('Berhasil mengambil daftar paket', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal mengambil daftar paket', 500), 500);
    }
  }

  public async getMine(c: any) {
    try {
      const user = getUser(c);

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const data = await SubscriptionService.getDetail(user.companyId);
      if (!data) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      return c.json(successResponse('Berhasil mengambil langganan', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal mengambil langganan', 500), 500);
    }
  }

  public async checkout(c: any) {
    try {
      const user = getUser(c);

      if (user.companyRole !== 'leader') {
        return c.json(errorResponse('Hanya leader yang dapat mengelola langganan', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const body = c.body as CreateCheckoutBody;
      const data = await SubscriptionService.createCheckout(
        user.companyId,
        { email: user.email, fullName: user.fullName },
        body,
      );

      return c.json(successResponse('Checkout berhasil dibuat', data));
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Gagal membuat checkout';
      return c.json(errorResponse(message, 400), 400);
    }
  }

  public async cancel(c: any) {
    try {
      const user = getUser(c);

      if (user.companyRole !== 'leader') {
        return c.json(errorResponse('Hanya leader yang dapat membatalkan langganan', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const data = await SubscriptionService.cancelSubscription(user.companyId);
      return c.json(successResponse('Langganan berhasil dibatalkan', data));
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Gagal membatalkan langganan';
      return c.json(errorResponse(message, 400), 400);
    }
  }

  public async stripeWebhook(c: any) {
    try {
      const payload = await c.request.text();
      const signature = c.request.headers.get('stripe-signature');
      const data = await SubscriptionService.handleStripeWebhook(payload, signature);

      return c.json(successResponse('Webhook Stripe diterima', data));
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Webhook Stripe gagal';
      return c.json(errorResponse(message, 400), 400);
    }
  }

  public async xenditWebhook(c: any) {
    try {
      const callbackToken = c.request.headers.get('x-callback-token');
      const data = await SubscriptionService.handleXenditWebhook(
        c.body as Record<string, unknown>,
        callbackToken,
      );

      return c.json(successResponse('Webhook Xendit diterima', data));
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Webhook Xendit gagal';
      return c.json(errorResponse(message, 400), 400);
    }
  }
}

export default new SubscriptionController();
