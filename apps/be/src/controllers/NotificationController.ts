import NotificationService from "@/service/NotificationService";
import { HttpResponse } from "@/http";
import type { AppContext } from "@/contex";
import type {
  NotificationLogQuery,
  PickSendNotification,
} from "@repo/types/productivity.types";
import { JwtPayload } from "@repo/types/auth.types";
import { unauthorizedValidate } from "@/validation/auth.validate";
import { SendNotifValidation } from "@/validation/notification.validate";

class NotificationController {
  public async send(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      const input = c.body as PickSendNotification;

      const authRespone = await unauthorizedValidate(user, c);
      if (authRespone) return authRespone;

      const validateRespone = await SendNotifValidation(c, input);
      if (validateRespone) return validateRespone;

      const data = await NotificationService.send(input);
      if (!data) {
        return HttpResponse(c).badRequest();
      }

      return HttpResponse(c).ok(data, "Email berhasil dikirim");
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async listLogs(c: AppContext) {
    try {
      const user = c.user as JwtPayload;

      const authRespone = await unauthorizedValidate(user, c);
      if (authRespone) return authRespone;

      const data = await NotificationService.listLogs({
        status: c.query.status as NotificationLogQuery["status"],
        limit: c.query.limit ? Number(c.query.limit) : undefined,
      });
      return HttpResponse(c).ok(data, "Berhasil mengambil riwayat notifikasi");
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
}

export default new NotificationController();
