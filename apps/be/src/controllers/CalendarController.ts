import CalendarService from "@/service/CalendarService";
import { HttpResponse } from "@/http";
import type { AppContext } from "@/contex";
import type { PickCreateEvent, PickUpdateEvent } from "@repo/types/productivity.types";

class CalendarController {
  public async list(c: AppContext) {
    try {
      const data = await CalendarService.list(c.query);
      return HttpResponse(c).ok(data, undefined, "Berhasil mengambil jadwal kalender");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal mengambil jadwal kalender");
    }
  }

  public async create(c: AppContext) {
    try {
      const data = await CalendarService.create(c.body as PickCreateEvent);
      return HttpResponse(c).created(data, "Jadwal berhasil ditambahkan");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal menambahkan jadwal");
    }
  }

  public async update(c: AppContext) {
    try {
      const data = await CalendarService.update(
        c.params.id,
        c.body as PickUpdateEvent,
      );
      if (!data) return HttpResponse(c).notFound("Jadwal tidak ditemukan");
      return HttpResponse(c).ok(data, undefined, "Jadwal berhasil diperbarui");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal memperbarui jadwal");
    }
  }

  public async remove(c: AppContext) {
    try {
      const data = await CalendarService.remove(c.params.id);
      if (!data) return HttpResponse(c).notFound("Jadwal tidak ditemukan");
      return HttpResponse(c).ok(data, undefined, "Jadwal berhasil dihapus");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal menghapus jadwal");
    }
  }
}

export default new CalendarController();
