import { NOTE_ENDPOINTS, noteById } from '../endpoints/note.endpoints';
import type { Note, PickCreateNote, PickUpdateNote } from '../types/note.types';
import type { TResponse } from '../types/response.types';
import { DeleteResponse, GetResponse, PostResponse, PutResponse } from './http';
import { toServiceResponse } from './service-response';

export async function ListNotes(): Promise<TResponse<Note[]>> {
  const res = await GetResponse<Note[]>(NOTE_ENDPOINTS.LIST);
  return toServiceResponse(res, { message: 'Daftar catatan berhasil diambil' });
}

export async function GetNote(id: string): Promise<TResponse<Note>> {
  const res = await GetResponse<Note>(noteById(id));
  return toServiceResponse(res, { message: 'Detail catatan berhasil diambil' });
}

export async function CreateNote(payload: PickCreateNote): Promise<TResponse<Note>> {
  const res = await PostResponse<Note>(NOTE_ENDPOINTS.CREATE, payload);
  return toServiceResponse(res, {
    message: 'Catatan berhasil dibuat',
    statusCode: 201,
  });
}

export async function UpdateNote(id: string, payload: PickUpdateNote): Promise<TResponse<Note>> {
  const res = await PutResponse<Note>(noteById(id), payload);
  return toServiceResponse(res, { message: 'Catatan berhasil diperbarui' });
}

export async function DeleteNote(id: string): Promise<TResponse<Note>> {
  const res = await DeleteResponse<Note>(noteById(id));
  return toServiceResponse(res, { message: 'Catatan berhasil dihapus' });
}

export const NoteService = {
  list: ListNotes,
  getById: GetNote,
  create: CreateNote,
  update: UpdateNote,
  remove: DeleteNote,
};
