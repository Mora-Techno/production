import Elysia from 'elysia';
import WorkstationController from '@/controllers/WorkstationController';
import { verifyToken } from '@/middlewares/auth';
import {
  CreateWorkstationDto,
  InviteMemberDto,
  MemberParamsDto,
  UpdateWorkstationDto,
  WorkstationParamsDto,
} from '@/dto/workstation.dto';

class WorkstationRouter {
  public workstationRouter;

  constructor() {
    this.workstationRouter = new Elysia({
      prefix: '/workstations',
      tags: ['Workstations'],
    });
    this.routes();
  }

  private routes() {
    this.workstationRouter.use(verifyToken());
    this.workstationRouter.get('/', (c) => WorkstationController.list(c), {
      detail: {
        summary: 'Daftar workstation',
        description: 'Leader/Admin melihat semua workstation di company.',
        tags: ['Workstations'],
      },
    });
    this.workstationRouter.post('/', (c) => WorkstationController.create(c), {
      body: CreateWorkstationDto,
      detail: {
        summary: 'Buat workstation baru',
        tags: ['Workstations'],
      },
    });
    this.workstationRouter.get('/:id', (c) => WorkstationController.getById(c), {
      params: WorkstationParamsDto,
      detail: {
        summary: 'Detail workstation + anggota',
        tags: ['Workstations'],
      },
    });
    this.workstationRouter.patch('/:id', (c) => WorkstationController.update(c), {
      params: WorkstationParamsDto,
      body: UpdateWorkstationDto,
      detail: {
        summary: 'Perbarui workstation',
        tags: ['Workstations'],
      },
    });
    this.workstationRouter.delete('/:id', (c) => WorkstationController.remove(c), {
      params: WorkstationParamsDto,
      detail: {
        summary: 'Hapus workstation',
        tags: ['Workstations'],
      },
    });
    this.workstationRouter.post('/:id/members', (c) => WorkstationController.inviteMember(c), {
      params: WorkstationParamsDto,
      body: InviteMemberDto,
      detail: {
        summary: 'Invite karyawan ke workstation',
        description:
          'Menambah anggota ke workstation. Batas: 4 (free) / 8 (pro) / 16 (enterprise).',
        tags: ['Workstations'],
      },
    });
    this.workstationRouter.delete(
      '/:id/members/:userId',
      (c) => WorkstationController.removeMember(c),
      {
        params: MemberParamsDto,
        detail: {
          summary: 'Hapus anggota dari workstation',
          tags: ['Workstations'],
        },
      },
    );
  }
}

export default new WorkstationRouter().workstationRouter;
