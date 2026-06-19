import SettingsService from "@/service/SettingsService";
import { HttpResponse } from "@/http";
import type { AppContext } from "@/contex";
import type { PickUpdateSettings } from "@repo/types/productivity.types";

class SettingsController {
  public async get(c: AppContext) {
    try {
      const data = await SettingsService.get();
      return HttpResponse(c).ok(data, undefined, "Berhasil mengambil pengaturan");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal mengambil pengaturan");
    }
  }

  public async update(c: AppContext) {
    try {
      const data = await SettingsService.update(c.body as PickUpdateSettings);
      return HttpResponse(c).ok(data, undefined, "Pengaturan berhasil diperbarui");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal memperbarui pengaturan");
    }
  }
}

export default new SettingsController();
