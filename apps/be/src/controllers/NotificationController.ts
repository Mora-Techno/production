import NotificationService from '@/service/NotificationService';
import { errorResponse, successResponse } from '@/http/response';

class NotificationController {
  public async send(c: any) {
    try {
      const data = await NotificationService.send(c.body);
      return c.json(successResponse('Email berhasil dikirim', data));
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Gagal mengirim email';
      return c.json(errorResponse(message, 500), 500);
    }
  }

  public async listLogs(c: any) {
    try {
      const data = await NotificationService.listLogs({
        status: c.query.status,
        limit: c.query.limit ? Number(c.query.limit) : undefined,
      });
      return c.json(successResponse('Berhasil mengambil riwayat notifikasi', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal mengambil riwayat notifikasi', 500), 500);
    }
  }
}

export default new NotificationController();
