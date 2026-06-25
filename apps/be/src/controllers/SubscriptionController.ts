import SubscriptionService from "@/service/SubscriptionService";
import { HttpResponse } from "@/http";
import type { JwtPayload } from "@repo/types/auth.types";
import type { PickCreateCheckout } from "@repo/types/subscription.types";
import type { AppContext } from "@/contex";

function getUser(c: AppContext): JwtPayload {
  return c.user as JwtPayload;
}

class SubscriptionController {
  public async listPlans(c: AppContext) {
    try {
      const data = SubscriptionService.listPlans();
      return HttpResponse(c).ok(
        data,
        undefined,
        "Berhasil mengambil daftar paket",
      );
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }

  public async getMine(c: AppContext) {
    try {
      const user = getUser(c);

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const data = await SubscriptionService.getDetail(user.companyId);
      if (!data) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      return HttpResponse(c).ok(
        data,
        undefined,
        "Berhasil mengambil langganan",
      );
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }

  public async checkout(c: AppContext) {
    try {
      const user = getUser(c);

      if (user.companyRole !== "leader") {
        return HttpResponse(c).forbidden(
          "Hanya leader yang dapat mengelola langganan",
        );
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const body = c.body as PickCreateCheckout;
      const data = await SubscriptionService.createCheckout(
        user.companyId,
        { email: user.email, fullName: user.fullName },
        body,
      );

      return HttpResponse(c).ok(data, undefined, "Checkout berhasil dibuat");
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async cancel(c: AppContext) {
    try {
      const user = getUser(c);

      if (user.companyRole !== "leader") {
        return HttpResponse(c).forbidden(
          "Hanya leader yang dapat membatalkan langganan",
        );
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const data = await SubscriptionService.cancelSubscription(user.companyId);
      return HttpResponse(c).ok(
        data,
        undefined,
        "Langganan berhasil dibatalkan",
      );
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Gagal membatalkan langganan";
      return HttpResponse(c).badRequest(message);
    }
  }

  public async stripeWebhook(c: AppContext) {
    try {
      const payload = await c.request.text();
      const signature = c.request.headers.get("stripe-signature");
      const data = await SubscriptionService.handleStripeWebhook(
        payload,
        signature,
      );

      return HttpResponse(c).ok(data, undefined, "Webhook Stripe diterima");
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Webhook Stripe gagal";
      return HttpResponse(c).badRequest(message);
    }
  }

  public async xenditWebhook(c: AppContext) {
    try {
      const callbackToken = c.request.headers.get("x-callback-token");
      const data = await SubscriptionService.handleXenditWebhook(
        c.body as Record<string, unknown>,
        callbackToken,
      );

      return HttpResponse(c).ok(data, undefined, "Webhook Xendit diterima");
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Webhook Xendit gagal";
      return HttpResponse(c).badRequest(message);
    }
  }
}

export default new SubscriptionController();
