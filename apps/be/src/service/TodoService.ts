import type { TodoStatus } from '@prisma/client';
import prisma from 'prisma/client';
import type { PickCreateTodo, PickUpdateTodo, TodoQuery } from '@repo/types/todo.types';

class TodoService {
  public async list(query: TodoQuery) {
    const where: {
      status?: TodoStatus;
      dueDate?: { gte: Date; lt: Date };
    } = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.date === 'today') {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      where.dueDate = { gte: start, lt: end };
    }

    return prisma.todo.findMany({
      where,
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
    });
  }

  public async create(input: PickCreateTodo) {
    return prisma.todo.create({
      data: {
        text: input.text,
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
      },
    });
  }

  public async update(id: string, input: PickUpdateTodo) {
    const existing = await prisma.todo.findUnique({ where: { id } });
    if (!existing) return null;

    return prisma.todo.update({
      where: { id },
      data: {
        ...(input.text !== undefined && { text: input.text }),
        ...(input.status !== undefined && { status: input.status }),
        ...(input.dueDate !== undefined && {
          dueDate: input.dueDate ? new Date(input.dueDate) : null,
        }),
      },
    });
  }

  public async remove(id: string) {
    const existing = await prisma.todo.findUnique({ where: { id } });
    if (!existing) return null;

    await prisma.todo.delete({ where: { id } });
    return existing;
  }
}

export default new TodoService();
