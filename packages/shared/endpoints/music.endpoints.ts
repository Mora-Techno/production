import { buildEndpoint, listEndpoints } from '../config/api.config';

const mount = '/music/playlists';

export const MUSIC_ENDPOINTS = {
  LIST: buildEndpoint(mount),
  CREATE: buildEndpoint(mount),
} as const;

export const musicPlaylistById = (id: string) => buildEndpoint(mount, `/${id}`);

export function listMusicEndpoints() {
  return listEndpoints(MUSIC_ENDPOINTS);
}
