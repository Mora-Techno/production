import MusicService from "@/service/MusicService";
import { HttpResponse } from "@/http";
import type { AppContext } from "@/contex";
import type { PickCreatePlaylist } from "@repo/types/productivity.types";

class MusicController {
  public async list(c: AppContext) {
    try {
      const data = await MusicService.list();
      return HttpResponse(c).ok(data, undefined, "Berhasil mengambil daftar playlist");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal mengambil daftar playlist");
    }
  }

  public async create(c: AppContext) {
    try {
      const data = await MusicService.create(c.body as PickCreatePlaylist);
      return HttpResponse(c).created(data, "Playlist berhasil ditambahkan");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal menambahkan playlist");
    }
  }

  public async remove(c: AppContext) {
    try {
      const data = await MusicService.remove(c.params.id);
      if (!data) return HttpResponse(c).notFound("Playlist tidak ditemukan");
      return HttpResponse(c).ok(data, undefined, "Playlist berhasil dihapus");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal menghapus playlist");
    }
  }
}

export default new MusicController();
