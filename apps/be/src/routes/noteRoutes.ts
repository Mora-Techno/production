import Elysia from 'elysia';
import NoteController from '@/controllers/NoteController';
import { CreateNoteDto, NoteParamsDto, UpdateNoteDto } from '@/dto/note.dto';

class NoteRouter {
  public noteRouter;

  constructor() {
    this.noteRouter = new Elysia({ prefix: '/notes', tags: ['Notes'] });
    this.routes();
  }

  private routes() {
    this.noteRouter.get('/', (c) => NoteController.list(c), {
      detail: {
        summary: 'Daftar semua catatan',
        description: 'Menampilkan rangkuman atau daftar semua catatan yang tersimpan.',
        tags: ['Notes'],
      },
    });
    this.noteRouter.get('/:id', (c) => NoteController.getById(c), {
      params: NoteParamsDto,
      detail: {
        summary: 'Detail catatan',
        description: 'Menampilkan isi penuh dari satu catatan spesifik.',
        tags: ['Notes'],
      },
    });
    this.noteRouter.post('/', (c) => NoteController.create(c), {
      body: CreateNoteDto,
      detail: {
        summary: 'Simpan catatan baru',
        description: 'Menyimpan catatan baru berisi judul dan konten.',
        tags: ['Notes'],
      },
    });
    this.noteRouter.put('/:id', (c) => NoteController.update(c), {
      params: NoteParamsDto,
      body: UpdateNoteDto,
      detail: {
        summary: 'Edit catatan',
        description: 'Menyimpan perubahan secara menyeluruh pada catatan yang sudah ada.',
        tags: ['Notes'],
      },
    });
    this.noteRouter.delete('/:id', (c) => NoteController.remove(c), {
      params: NoteParamsDto,
      detail: {
        summary: 'Hapus catatan',
        description: 'Menghapus catatan secara permanen berdasarkan ID.',
        tags: ['Notes'],
      },
    });
  }
}

export default new NoteRouter().noteRouter;
