import CalendarService from "@/service/CalendarService";
import { HttpResponse } from "@/http";
import type { AppContext } from "@/contex";
import type {
  PickCreateEvent,
  PickUpdateEvent,
} from "@repo/types/productivity.types";
import { JwtPayload } from "@repo/types/auth.types";
import { CreateEventValidation } from "@/validation/calender.validate";
import {
  paramsValidate,
  unauthorizedValidate,
} from "@/validation/auth.validate";

class CalendarController {
  public async list(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      await unauthorizedValidate(user, c);

      const data = await CalendarService.list(c.query);
      if (!data) {
        return HttpResponse(c).badRequest();
      }
      return HttpResponse(c).ok(
        data,
        undefined,
        "Berhasil mengambil jadwal kalender",
      );
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async create(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      const input = c.body as PickCreateEvent;

      await CreateEventValidation(input, c);
      await unauthorizedValidate(user, c);
      const data = await CalendarService.create(input);

      if (!data) {
        return HttpResponse(c).badRequest();
      }
      return HttpResponse(c).created(data, "Jadwal berhasil ditambahkan");
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async update(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      const input = c.body as PickUpdateEvent;
      const params = c.params as { id: string };

      await unauthorizedValidate(user, c);
      await paramsValidate(params.id, c);
      const data = await CalendarService.update(params.id, input);
      if (!data) {
        return HttpResponse(c).notFound("Jadwal tidak ditemukan");
      }
      return HttpResponse(c).ok(data, "Jadwal berhasil diperbarui");
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async remove(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      const params = c.params as { id: string };

      await unauthorizedValidate(user, c);
      await paramsValidate(params.id, c);

      const data = await CalendarService.remove(params.id);

      if (!data) return HttpResponse(c).notFound("Jadwal tidak ditemukan");
      return HttpResponse(c).ok(data, "Jadwal berhasil dihapus");
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
}

export default new CalendarController();
