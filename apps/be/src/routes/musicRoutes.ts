import Elysia from 'elysia';
import MusicController from '@/controllers/MusicController';
import { CreatePlaylistDto, PlaylistParamsDto } from '@/dto/music.dto';

class MusicRouter {
  public musicRouter;

  constructor() {
    this.musicRouter = new Elysia({
      prefix: '/music/playlists',
      tags: ['Music'],
    });
    this.routes();
  }

  private routes() {
    this.musicRouter.get('/', (c) => MusicController.list(c), {
      detail: {
        summary: 'Daftar playlist musik',
        description: 'Mengambil daftar URL musik atau playlist yang tersimpan di database.',
        tags: ['Music'],
      },
    });
    this.musicRouter.post('/', (c) => MusicController.create(c), {
      body: CreatePlaylistDto,
      detail: {
        summary: 'Tambah playlist',
        description: 'Menambahkan URL musik baru ke dalam daftar favorit.',
        tags: ['Music'],
      },
    });
    this.musicRouter.delete('/:id', (c) => MusicController.remove(c), {
      params: PlaylistParamsDto,
      detail: {
        summary: 'Hapus playlist',
        description: 'Menghapus referensi musik dari daftar berdasarkan ID.',
        tags: ['Music'],
      },
    });
  }
}

export default new MusicRouter().musicRouter;
