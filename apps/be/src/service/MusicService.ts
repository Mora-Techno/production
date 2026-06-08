import prisma from 'prisma/client';
import type { CreatePlaylistBody } from '@/types/music.types';

class MusicService {
  public async list() {
    return prisma.musicPlaylist.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  public async create(input: CreatePlaylistBody) {
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
