import prisma from 'prisma/client';
import type { CreateNoteBody, UpdateNoteBody } from '@/types/note.types';

class NoteService {
  public async list() {
    return prisma.note.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  public async getById(id: string) {
    return prisma.note.findUnique({ where: { id } });
  }

  public async create(input: CreateNoteBody) {
    return prisma.note.create({ data: input });
  }

  public async update(id: string, input: UpdateNoteBody) {
    const existing = await prisma.note.findUnique({ where: { id } });
    if (!existing) return null;

    return prisma.note.update({ where: { id }, data: input });
  }

  public async remove(id: string) {
    const existing = await prisma.note.findUnique({ where: { id } });
    if (!existing) return null;

    await prisma.note.delete({ where: { id } });
    return existing;
  }
}

export default new NoteService();
