import prisma from "prisma/client";

interface CreatePlaylistInput {
  title: string;
  url: string;
}

class MusicService {
  public async list() {
    return prisma.musicPlaylist.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  public async create(input: CreatePlaylistInput) {
    return prisma.musicPlaylist.create({ data: input });
  }

  public async remove(id: string) {
    const existing = await prisma.musicPlaylist.findUnique({ where: { id } });
    if (!existing) return null;

    await prisma.musicPlaylist.delete({ where: { id } });
    return existing;
  }
}

export default new MusicService();
