import Elysia from 'elysia';
import SettingsController from '@/controllers/SettingsController';
import { UpdateSettingsDto } from '@/dto/settings.dto';

class SettingsRouter {
  public settingsRouter;

  constructor() {
    this.settingsRouter = new Elysia({
      prefix: '/settings',
      tags: ['Settings'],
    });
    this.routes();
  }

  private routes() {
    this.settingsRouter.get('/', (c) => SettingsController.get(c), {
      detail: {
        summary: 'Ambil pengaturan',
        description:
          'Mengambil preferensi pengguna seperti format jam (24h/12h) dan notifikasi default.',
        tags: ['Settings'],
      },
    });
    this.settingsRouter.patch('/', (c) => SettingsController.update(c), {
      body: UpdateSettingsDto,
      detail: {
        summary: 'Perbarui pengaturan',
        description: 'Memperbarui preferensi UI dan notifikasi pengguna.',
        tags: ['Settings'],
      },
    });
  }
}

export default new SettingsRouter().settingsRouter;
