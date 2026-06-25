import MusicService from "@/service/MusicService";
import { HttpResponse } from "@/http";
import type { AppContext } from "@/contex";
import type { PickCreatePlaylist } from "@repo/types/productivity.types";
import { JwtPayload } from "@repo/types/auth.types";
import {
  paramsValidate,
  unauthorizedValidate,
} from "@/validation/auth.validate";
import { CreateMusicValidate } from "@/validation/music.validate";

class MusicController {
  public async list(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      await unauthorizedValidate(user, c);
      const data = await MusicService.list();

      if (!data) {
        return HttpResponse(c).badRequest();
      }
      return HttpResponse(c).ok(data, "Berhasil mengambil daftar playlist");
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async create(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      await unauthorizedValidate(user, c);
      const input = c.body as PickCreatePlaylist;
      await CreateMusicValidate(c, input);

      const data = await MusicService.create(input);
      if (!data) {
        return HttpResponse(c).badRequest();
      }
      return HttpResponse(c).created(data, "Playlist berhasil ditambahkan");
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async remove(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      await unauthorizedValidate(user, c);
      const params = c.params as { id: string };
      await paramsValidate(params.id, c);
      const data = await MusicService.remove(params.id);
      if (!data) return HttpResponse(c).notFound("Playlist tidak ditemukan");
      return HttpResponse(c).ok(data, undefined, "Playlist berhasil dihapus");
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
}

export default new MusicController();
