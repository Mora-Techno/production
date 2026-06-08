import WorkstationService from '@/service/WorkstationService';
import { errorResponse, successResponse } from '@/http/response';
import type { JwtPayload } from '@/types/auth.types';
import type {
  CreateWorkstationBody,
  InviteMemberBody,
  UpdateWorkstationBody,
} from '@/types/workstation.types';

function getUser(c: any): JwtPayload {
  return c.user as JwtPayload;
}

function canManageWorkstation(user: JwtPayload): boolean {
  return user.companyRole === 'leader' || user.companyRole === 'admin';
}

class WorkstationController {
  public async list(c: any) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return c.json(errorResponse('Akses ditolak', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const data = await WorkstationService.list(user.companyId);
      return c.json(successResponse('Berhasil mengambil daftar workstation', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal mengambil daftar workstation', 500), 500);
    }
  }

  public async getById(c: any) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return c.json(errorResponse('Akses ditolak', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const data = await WorkstationService.getById(c.params.id, user.companyId);
      if (!data) return c.json(errorResponse('Workstation tidak ditemukan', 404), 404);

      return c.json(successResponse('Berhasil mengambil detail workstation', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal mengambil detail workstation', 500), 500);
    }
  }

  public async create(c: any) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return c.json(errorResponse('Akses ditolak', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const body = c.body as CreateWorkstationBody;
      const data = await WorkstationService.create(user.companyId, user.id, body);

      return c.json(successResponse('Workstation berhasil dibuat', data, 201), 201);
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal membuat workstation', 500), 500);
    }
  }

  public async update(c: any) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return c.json(errorResponse('Akses ditolak', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const body = c.body as UpdateWorkstationBody;
      const data = await WorkstationService.update(c.params.id, user.companyId, body);

      if (!data) return c.json(errorResponse('Workstation tidak ditemukan', 404), 404);

      return c.json(successResponse('Workstation berhasil diperbarui', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal memperbarui workstation', 500), 500);
    }
  }

  public async remove(c: any) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return c.json(errorResponse('Akses ditolak', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const data = await WorkstationService.remove(c.params.id, user.companyId);
      if (!data) return c.json(errorResponse('Workstation tidak ditemukan', 404), 404);

      return c.json(successResponse('Workstation berhasil dihapus', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal menghapus workstation', 500), 500);
    }
  }

  public async inviteMember(c: any) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return c.json(errorResponse('Akses ditolak', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const body = c.body as InviteMemberBody;
      const data = await WorkstationService.inviteMember(c.params.id, user.companyId, body);

      return c.json(successResponse('Karyawan berhasil diinvite ke workstation', data, 201), 201);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Gagal menginvite karyawan';
      return c.json(errorResponse(message, 400), 400);
    }
  }

  public async removeMember(c: any) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return c.json(errorResponse('Akses ditolak', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const data = await WorkstationService.removeMember(
        c.params.id,
        user.companyId,
        c.params.userId,
      );

      if (!data) return c.json(errorResponse('Anggota tidak ditemukan', 404), 404);

      return c.json(successResponse('Anggota berhasil dihapus dari workstation', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal menghapus anggota', 500), 500);
    }
  }
}

export default new WorkstationController();
