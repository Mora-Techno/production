import CalendarService from "@/service/CalendarService";
import { errorResponse, successResponse } from "@/http/response";

class CalendarController {
  public async list(c: any) {
    try {
      const data = await CalendarService.list(c.query);
      return c.json(successResponse("Berhasil mengambil jadwal kalender", data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Gagal mengambil jadwal kalender", 500), 500);
    }
  }

  public async create(c: any) {
    try {
      const data = await CalendarService.create(c.body);
      return c.json(successResponse("Jadwal berhasil ditambahkan", data, 201), 201);
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Gagal menambahkan jadwal", 500), 500);
    }
  }

  public async update(c: any) {
    try {
      const data = await CalendarService.update(c.params.id, c.body);
      if (!data)
        return c.json(errorResponse("Jadwal tidak ditemukan", 404), 404);
      return c.json(successResponse("Jadwal berhasil diperbarui", data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Gagal memperbarui jadwal", 500), 500);
    }
  }

  public async remove(c: any) {
    try {
      const data = await CalendarService.remove(c.params.id);
      if (!data)
        return c.json(errorResponse("Jadwal tidak ditemukan", 404), 404);
      return c.json(successResponse("Jadwal berhasil dihapus", data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Gagal menghapus jadwal", 500), 500);
    }
  }
}

export default new CalendarController();
