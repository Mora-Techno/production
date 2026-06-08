import NoteService from '@/service/NoteService';
import { errorResponse, successResponse } from '@/http/response';

class NoteController {
  public async list(c: any) {
    try {
      const data = await NoteService.list();
      return c.json(successResponse('Berhasil mengambil daftar catatan', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal mengambil daftar catatan', 500), 500);
    }
  }

  public async getById(c: any) {
    try {
      const data = await NoteService.getById(c.params.id);
      if (!data) return c.json(errorResponse('Catatan tidak ditemukan', 404), 404);
      return c.json(successResponse('Berhasil mengambil detail catatan', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal mengambil detail catatan', 500), 500);
    }
  }

  public async create(c: any) {
    try {
      const data = await NoteService.create(c.body);
      return c.json(successResponse('Catatan berhasil disimpan', data, 201), 201);
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal menyimpan catatan', 500), 500);
    }
  }

  public async update(c: any) {
    try {
      const data = await NoteService.update(c.params.id, c.body);
      if (!data) return c.json(errorResponse('Catatan tidak ditemukan', 404), 404);
      return c.json(successResponse('Catatan berhasil diperbarui', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal memperbarui catatan', 500), 500);
    }
  }

  public async remove(c: any) {
    try {
      const data = await NoteService.remove(c.params.id);
      if (!data) return c.json(errorResponse('Catatan tidak ditemukan', 404), 404);
      return c.json(successResponse('Catatan berhasil dihapus', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal menghapus catatan', 500), 500);
    }
  }
}

export default new NoteController();
