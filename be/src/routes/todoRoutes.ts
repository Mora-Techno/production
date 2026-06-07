import Elysia from "elysia";
import TodoController from "@/controllers/TodoController";
import {
  CreateTodoDto,
  TodoParamsDto,
  TodoQueryDto,
  UpdateTodoDto,
} from "@/dto/todo.dto";

const todoRoutes = new Elysia({ prefix: "/todos", tags: ["Todos"] })
  .get("/", (c) => TodoController.list(c), {
    query: TodoQueryDto,
    detail: {
      summary: "Daftar semua tugas",
      description:
        "Menampilkan semua daftar tugas. Mendukung filter `?status=completed|pending` atau `?date=today`.",
      tags: ["Todos"],
    },
  })
  .post("/", (c) => TodoController.create(c), {
    body: CreateTodoDto,
    detail: {
      summary: "Buat tugas baru",
      description: "Membuat tugas baru dengan teks dan tenggat waktu opsional.",
      tags: ["Todos"],
    },
  })
  .patch("/:id", (c) => TodoController.update(c), {
    params: TodoParamsDto,
    body: UpdateTodoDto,
    detail: {
      summary: "Perbarui tugas",
      description:
        "Mengubah status tugas (pending/completed), teks, atau tenggat waktu.",
      tags: ["Todos"],
    },
  })
  .delete("/:id", (c) => TodoController.remove(c), {
    params: TodoParamsDto,
    detail: {
      summary: "Hapus tugas",
      description: "Menghapus tugas dari daftar berdasarkan ID.",
      tags: ["Todos"],
    },
  });

export default todoRoutes;
