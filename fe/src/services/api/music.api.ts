import { apiDelete, apiGet, apiPost } from "./client";
import type {
  CreatePlaylistInput,
  MusicPlaylist,
} from "@/types/api/productivity";

const BASE = "/api/music/playlists";

export const MusicApi = {
  list: () => apiGet<MusicPlaylist[]>(BASE),
  create: (payload: CreatePlaylistInput) =>
    apiPost<MusicPlaylist>(BASE, payload),
  remove: (id: string) => apiDelete<MusicPlaylist>(`${BASE}/${id}`),
};
