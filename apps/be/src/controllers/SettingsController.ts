import SettingsService from '@/service/SettingsService';
import { errorResponse, successResponse } from '@/http/response';

class SettingsController {
  public async get(c: any) {
    try {
      const data = await SettingsService.get();
      return c.json(successResponse('Berhasil mengambil pengaturan', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal mengambil pengaturan', 500), 500);
    }
  }

  public async update(c: any) {
    try {
      const data = await SettingsService.update(c.body);
      return c.json(successResponse('Pengaturan berhasil diperbarui', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal memperbarui pengaturan', 500), 500);
    }
  }
}

export default new SettingsController();
