import MusicService from "@/service/MusicService";
import { errorResponse, successResponse } from "@/http/response";

class MusicController {
  public async list(c: any) {
    try {
      const data = await MusicService.list();
      return c.json(successResponse("Berhasil mengambil daftar playlist", data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Gagal mengambil daftar playlist", 500), 500);
    }
  }

  public async create(c: any) {
    try {
      const data = await MusicService.create(c.body);
      return c.json(successResponse("Playlist berhasil ditambahkan", data, 201), 201);
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Gagal menambahkan playlist", 500), 500);
    }
  }

  public async remove(c: any) {
    try {
      const data = await MusicService.remove(c.params.id);
      if (!data)
        return c.json(errorResponse("Playlist tidak ditemukan", 404), 404);
      return c.json(successResponse("Playlist berhasil dihapus", data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Gagal menghapus playlist", 500), 500);
    }
  }
}

export default new MusicController();
