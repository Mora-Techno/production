import { queryKey } from "@/configs";
import type { AppNameSpace } from "@/hooks/useAppNameSpace";
import { MusicPlaylist } from "@repo/types";

export type MusicCacheContext = {
  previousData?: MusicPlaylist[];
};

export function readPlaylistSnapshot(
  ns: AppNameSpace,
): MusicPlaylist[] | undefined {
  return ns.queryClient.getQueryData<MusicPlaylist[]>(queryKey.music.list());
}
