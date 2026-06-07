import TodoService from "@/service/TodoService";
import { errorResponse, successResponse } from "@/http/response";

class TodoController {
  public async list(c: any) {
    try {
      const data = await TodoService.list(c.query);
      return c.json(successResponse("Berhasil mengambil daftar tugas", data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Gagal mengambil daftar tugas", 500), 500);
    }
  }

  public async create(c: any) {
    try {
      const data = await TodoService.create(c.body);
      return c.json(successResponse("Tugas berhasil dibuat", data, 201), 201);
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Gagal membuat tugas", 500), 500);
    }
  }

  public async update(c: any) {
    try {
      const data = await TodoService.update(c.params.id, c.body);
      if (!data)
        return c.json(errorResponse("Tugas tidak ditemukan", 404), 404);
      return c.json(successResponse("Tugas berhasil diperbarui", data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Gagal memperbarui tugas", 500), 500);
    }
  }

  public async remove(c: any) {
    try {
      const data = await TodoService.remove(c.params.id);
      if (!data)
        return c.json(errorResponse("Tugas tidak ditemukan", 404), 404);
      return c.json(successResponse("Tugas berhasil dihapus", data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Gagal menghapus tugas", 500), 500);
    }
  }
}

export default new TodoController();
