import { t } from "elysia";

export const CreateNoteDto = t.Object({
  title: t.String({ minLength: 1, description: "Judul catatan" }),
  content: t.String({ minLength: 1, description: "Isi catatan" }),
});

export const UpdateNoteDto = t.Object({
  title: t.String({ minLength: 1, description: "Judul catatan" }),
  content: t.String({ minLength: 1, description: "Isi catatan" }),
});

export const NoteParamsDto = t.Object({
  id: t.String({ format: "uuid", description: "ID catatan" }),
});
