import TodoService from "@/service/TodoService";
import { HttpResponse } from "@/http";
import type { AppContext } from "@/contex";
import type {
  PickCreateTodo,
  PickUpdateTodo,
  TodoQuery,
} from "@repo/types/productivity.types";

class TodoController {
  public async list(c: AppContext) {
    try {
      const data = await TodoService.list(c.query as TodoQuery);
      return HttpResponse(c).ok(data, undefined);
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }

  public async create(c: AppContext) {
    try {
      const data = await TodoService.create(c.body as PickCreateTodo);
      return HttpResponse(c).created(data, "Tugas berhasil dibuat");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }

  public async update(c: AppContext) {
    try {
      const data = await TodoService.update(
        c.params.id,
        c.body as PickUpdateTodo,
      );
      if (!data) return HttpResponse(c).notFound("Tugas tidak ditemukan");
      return HttpResponse(c).ok(data, undefined, "Tugas berhasil diperbarui");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }

  public async remove(c: AppContext) {
    try {
      const data = await TodoService.remove(c.params.id);
      if (!data) return HttpResponse(c).notFound("Tugas tidak ditemukan");
      return HttpResponse(c).ok(data, undefined, "Tugas berhasil dihapus");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error);
    }
  }
}

export default new TodoController();
