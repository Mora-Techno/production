import NoteService from "@/service/NoteService";
import { HttpResponse } from "@/http";
import type { AppContext } from "@/contex";
import type { PickCreateNote, PickUpdateNote } from "@repo/types/productivity.types";

class NoteController {
  public async list(c: AppContext) {
    try {
      const data = await NoteService.list();
      return HttpResponse(c).ok(data, undefined, "Berhasil mengambil daftar catatan");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal mengambil daftar catatan");
    }
  }

  public async getById(c: AppContext) {
    try {
      const data = await NoteService.getById(c.params.id);
      if (!data) return HttpResponse(c).notFound("Catatan tidak ditemukan");
      return HttpResponse(c).ok(data, undefined, "Berhasil mengambil detail catatan");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal mengambil detail catatan");
    }
  }

  public async create(c: AppContext) {
    try {
      const data = await NoteService.create(c.body as PickCreateNote);
      return HttpResponse(c).created(data, "Catatan berhasil disimpan");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal menyimpan catatan");
    }
  }

  public async update(c: AppContext) {
    try {
      const data = await NoteService.update(
        c.params.id,
        c.body as PickUpdateNote,
      );
      if (!data) return HttpResponse(c).notFound("Catatan tidak ditemukan");
      return HttpResponse(c).ok(data, undefined, "Catatan berhasil diperbarui");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal memperbarui catatan");
    }
  }

  public async remove(c: AppContext) {
    try {
      const data = await NoteService.remove(c.params.id);
      if (!data) return HttpResponse(c).notFound("Catatan tidak ditemukan");
      return HttpResponse(c).ok(data, undefined, "Catatan berhasil dihapus");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal menghapus catatan");
    }
  }
}

export default new NoteController();
