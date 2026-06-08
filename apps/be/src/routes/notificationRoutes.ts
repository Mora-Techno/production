import Elysia from 'elysia';
import NotificationController from '@/controllers/NotificationController';
import { NotificationLogQueryDto, SendNotificationDto } from '@/dto/notification.dto';

class NotificationRouter {
  public notificationRouter;

  constructor() {
    this.notificationRouter = new Elysia({
      prefix: '/notifications',
      tags: ['Notifications'],
    });
    this.routes();
  }

  private routes() {
    this.notificationRouter.post('/send', (c) => NotificationController.send(c), {
      body: SendNotificationDto,
      detail: {
        summary: 'Kirim notifikasi email',
        description:
          'Men-trigger pengiriman email secara manual atau digunakan oleh cron job internal backend via SMTP Gmail.',
        tags: ['Notifications'],
      },
    });
    this.notificationRouter.get('/logs', (c) => NotificationController.listLogs(c), {
      query: NotificationLogQueryDto,
      detail: {
        summary: 'Riwayat notifikasi',
        description: 'Melihat riwayat notifikasi email yang sukses atau gagal dikirim oleh sistem.',
        tags: ['Notifications'],
      },
    });
  }
}

export default new NotificationRouter().notificationRouter;
