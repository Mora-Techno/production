import { apiDelete, apiGet, apiPost, apiPut } from "./client";
import type {
  CreateNoteInput,
  Note,
  UpdateNoteInput,
} from "@/types/api/productivity";

const BASE = "/api/notes";

export const NoteApi = {
  list: () => apiGet<Note[]>(BASE),
  getById: (id: string) => apiGet<Note>(`${BASE}/${id}`),
  create: (payload: CreateNoteInput) => apiPost<Note>(BASE, payload),
  update: (id: string, payload: UpdateNoteInput) =>
    apiPut<Note>(`${BASE}/${id}`, payload),
  remove: (id: string) => apiDelete<Note>(`${BASE}/${id}`),
};
