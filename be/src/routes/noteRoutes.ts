import Elysia from "elysia";
import NoteController from "@/controllers/NoteController";
import {
  CreateNoteDto,
  NoteParamsDto,
  UpdateNoteDto,
} from "@/dto/note.dto";

const noteRoutes = new Elysia({ prefix: "/notes", tags: ["Notes"] })
  .get("/", (c) => NoteController.list(c), {
    detail: {
      summary: "Daftar semua catatan",
      description: "Menampilkan rangkuman atau daftar semua catatan yang tersimpan.",
      tags: ["Notes"],
    },
  })
  .get("/:id", (c) => NoteController.getById(c), {
    params: NoteParamsDto,
    detail: {
      summary: "Detail catatan",
      description: "Menampilkan isi penuh dari satu catatan spesifik.",
      tags: ["Notes"],
    },
  })
  .post("/", (c) => NoteController.create(c), {
    body: CreateNoteDto,
    detail: {
      summary: "Simpan catatan baru",
      description: "Menyimpan catatan baru berisi judul dan konten.",
      tags: ["Notes"],
    },
  })
  .put("/:id", (c) => NoteController.update(c), {
    params: NoteParamsDto,
    body: UpdateNoteDto,
    detail: {
      summary: "Edit catatan",
      description: "Menyimpan perubahan secara menyeluruh pada catatan yang sudah ada.",
      tags: ["Notes"],
    },
  })
  .delete("/:id", (c) => NoteController.remove(c), {
    params: NoteParamsDto,
    detail: {
      summary: "Hapus catatan",
      description: "Menghapus catatan secara permanen berdasarkan ID.",
      tags: ["Notes"],
    },
  });

export default noteRoutes;
