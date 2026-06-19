import NotificationService from "@/service/NotificationService";
import { HttpResponse } from "@/http";
import type { AppContext } from "@/contex";
import type {
  NotificationLogQuery,
  PickSendNotification,
} from "@repo/types/productivity.types";

class NotificationController {
  public async send(c: AppContext) {
    try {
      const data = await NotificationService.send(c.body as PickSendNotification);
      return HttpResponse(c).ok(data, undefined, "Email berhasil dikirim");
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Gagal mengirim email";
      return HttpResponse(c).internalError(error, message);
    }
  }

  public async listLogs(c: AppContext) {
    try {
      const data = await NotificationService.listLogs({
        status: c.query.status as NotificationLogQuery["status"],
        limit: c.query.limit ? Number(c.query.limit) : undefined,
      });
      return HttpResponse(c).ok(data, undefined, "Berhasil mengambil riwayat notifikasi");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(
        error,
        "Gagal mengambil riwayat notifikasi",
      );
    }
  }
}

export default new NotificationController();
