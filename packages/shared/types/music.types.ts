/** Mirror Prisma model `MusicPlaylist` */
export interface IMusicPlaylist {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
}

export type MusicPlaylist = Pick<IMusicPlaylist, "id" | "title" | "url"> & {
  createdAt: string;
};

export type PickCreatePlaylist = Pick<IMusicPlaylist, "title" | "url">;
export type PlaylistParams = Pick<IMusicPlaylist, "id">;
