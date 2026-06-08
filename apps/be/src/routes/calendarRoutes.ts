import Elysia from 'elysia';
import CalendarController from '@/controllers/CalendarController';
import { CreateEventDto, EventParamsDto, EventQueryDto, UpdateEventDto } from '@/dto/calendar.dto';

class CalendarRouter {
  public calendarRouter;

  constructor() {
    this.calendarRouter = new Elysia({
      prefix: '/calendar/events',
      tags: ['Calendar'],
    });
    this.routes();
  }

  private routes() {
    this.calendarRouter.get('/', (c) => CalendarController.list(c), {
      query: EventQueryDto,
      detail: {
        summary: 'Daftar jadwal kalender',
        description:
          'Mengambil data jadwal berdasarkan rentang waktu, contoh: `?month=06&year=2026`.',
        tags: ['Calendar'],
      },
    });
    this.calendarRouter.post('/', (c) => CalendarController.create(c), {
      body: CreateEventDto,
      detail: {
        summary: 'Tambah jadwal baru',
        description: 'Menambahkan jadwal atau event baru ke dalam kalender.',
        tags: ['Calendar'],
      },
    });
    this.calendarRouter.patch('/:id', (c) => CalendarController.update(c), {
      params: EventParamsDto,
      body: UpdateEventDto,
      detail: {
        summary: 'Perbarui jadwal',
        description: 'Melakukan reschedule tanggal atau mengubah detail deskripsi jadwal.',
        tags: ['Calendar'],
      },
    });
    this.calendarRouter.delete('/:id', (c) => CalendarController.remove(c), {
      params: EventParamsDto,
      detail: {
        summary: 'Hapus jadwal',
        description: 'Membatalkan dan menghapus jadwal dari kalender.',
        tags: ['Calendar'],
      },
    });
  }
}

export default new CalendarRouter().calendarRouter;
