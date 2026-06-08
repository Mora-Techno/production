import Elysia from 'elysia';
import SubscriptionController from '@/controllers/SubscriptionController';
import { verifyToken } from '@/middlewares/auth';
import { CreateCheckoutDto } from '@/dto/subscription.dto';

class SubscriptionRouter {
  public subscriptionRouter;

  constructor() {
    this.subscriptionRouter = new Elysia({
      prefix: '/subscriptions',
      tags: ['Subscriptions'],
    });
    this.routes();
  }

  private routes() {
    this.subscriptionRouter.get('/plans', (c) => SubscriptionController.listPlans(c), {
      detail: {
        summary: 'Daftar paket langganan',
        description:
          'Free (gratis), Pro ($5/bulan atau yearly), Enterprise. Stripe untuk internasional, Xendit untuk Indonesia.',
        tags: ['Subscriptions'],
      },
    });
    this.subscriptionRouter.post(
      '/webhooks/stripe',
      (c) => SubscriptionController.stripeWebhook(c),
      {
        detail: {
          summary: 'Webhook Stripe',
          tags: ['Subscriptions'],
        },
      },
    );
    this.subscriptionRouter.post(
      '/webhooks/xendit',
      (c) => SubscriptionController.xenditWebhook(c),
      {
        detail: {
          summary: 'Webhook Xendit',
          tags: ['Subscriptions'],
        },
      },
    );
    this.subscriptionRouter.use(verifyToken());
    this.subscriptionRouter.get('/me', (c) => SubscriptionController.getMine(c), {
      detail: {
        summary: 'Langganan company saat ini',
        tags: ['Subscriptions'],
      },
    });
    this.subscriptionRouter.post('/checkout', (c) => SubscriptionController.checkout(c), {
      body: CreateCheckoutDto,
      detail: {
        summary: 'Buat checkout langganan',
        description:
          'Leader membuat checkout. Provider: stripe (USD) atau xendit (IDR). Tier free langsung aktif tanpa pembayaran.',
        tags: ['Subscriptions'],
      },
    });
    this.subscriptionRouter.post('/cancel', (c) => SubscriptionController.cancel(c), {
      detail: {
        summary: 'Batalkan langganan',
        description: 'Leader membatalkan langganan dan downgrade ke free.',
        tags: ['Subscriptions'],
      },
    });
  }
}

export default new SubscriptionRouter().subscriptionRouter;
