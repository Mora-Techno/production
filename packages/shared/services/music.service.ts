import {
  MUSIC_ENDPOINTS,
  musicPlaylistById,
} from "../endpoints/music.endpoints";
import type { MusicPlaylist, PickCreatePlaylist } from "../types/music.types";
import type { TResponse } from "../types/response.types";
import { DeleteResponse, GetResponse, PostResponse } from "./http";
import { toServiceResponse } from "./service-response";

export async function ListPlaylists(): Promise<TResponse<MusicPlaylist[]>> {
  const res = await GetResponse<MusicPlaylist[]>(MUSIC_ENDPOINTS.LIST);
  return toServiceResponse(res, {
    message: "Daftar playlist berhasil diambil",
  });
}

export async function CreatePlaylist(
  payload: PickCreatePlaylist,
): Promise<TResponse<MusicPlaylist>> {
  const res = await PostResponse<MusicPlaylist>(
    MUSIC_ENDPOINTS.CREATE,
    payload,
  );
  return toServiceResponse(res, {
    message: "Playlist berhasil dibuat",
    statusCode: 201,
  });
}

export async function DeletePlaylist(
  id: string,
): Promise<TResponse<MusicPlaylist>> {
  const res = await DeleteResponse<MusicPlaylist>(musicPlaylistById(id));
  return toServiceResponse(res, { message: "Playlist berhasil dihapus" });
}

export const MusicService = {
  list: ListPlaylists,
  create: CreatePlaylist,
  remove: DeletePlaylist,
};
