import { buildEndpoint, listEndpoints } from '../config/api.config';

const mount = '/notes';

export const NOTE_ENDPOINTS = {
  LIST: buildEndpoint(mount),
  CREATE: buildEndpoint(mount),
} as const;

export const noteById = (id: string) => buildEndpoint(mount, `/${id}`);

export function listNoteEndpoints() {
  return listEndpoints(NOTE_ENDPOINTS);
}
