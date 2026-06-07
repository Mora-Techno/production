import prisma from "prisma/client";

interface ListEventsQuery {
  month?: string;
  year?: string;
}

interface CreateEventInput {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
}

interface UpdateEventInput {
  title?: string;
  description?: string | null;
  startDate?: string;
  endDate?: string | null;
}

class CalendarService {
  public async list(query: ListEventsQuery) {
    const where: { startDate?: { gte: Date; lt: Date } } = {};

    if (query.month && query.year) {
      const month = Number(query.month) - 1;
      const year = Number(query.year);
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 1);
      where.startDate = { gte: start, lt: end };
    }

    return prisma.calendarEvent.findMany({
      where,
      orderBy: { startDate: "asc" },
    });
  }

  public async create(input: CreateEventInput) {
    return prisma.calendarEvent.create({
      data: {
        title: input.title,
        description: input.description,
        startDate: new Date(input.startDate),
        endDate: input.endDate ? new Date(input.endDate) : null,
      },
    });
  }

  public async update(id: string, input: UpdateEventInput) {
    const existing = await prisma.calendarEvent.findUnique({ where: { id } });
    if (!existing) return null;

    return prisma.calendarEvent.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.description !== undefined && {
          description: input.description,
        }),
        ...(input.startDate !== undefined && {
          startDate: new Date(input.startDate),
        }),
        ...(input.endDate !== undefined && {
          endDate: input.endDate ? new Date(input.endDate) : null,
        }),
      },
    });
  }

  public async remove(id: string) {
    const existing = await prisma.calendarEvent.findUnique({ where: { id } });
    if (!existing) return null;

    await prisma.calendarEvent.delete({ where: { id } });
    return existing;
  }
}

export default new CalendarService();
