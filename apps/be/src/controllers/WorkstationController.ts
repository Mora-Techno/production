import WorkstationService from '@/service/WorkstationService';
import { HttpResponse } from '@/http';
import type { JwtPayload } from '@repo/types/auth.types';
import type {
  PickCreateWorkstation,
  PickInviteMember,
  PickUpdateWorkstation,
} from '@repo/types/workstation.types';
import type { AppContext } from '@/contex';
import { paramsValidate, unauthorizedValidate } from '@/validation/auth.validate';
import { CreateWorkStationValidate } from '@/validation/workstation.validate';

class WorkstationController {
  public async list(c: AppContext) {
    try {
      const user = c.user as JwtPayload;

      const authRespone = await unauthorizedValidate(user, c);
      if (authRespone) return authRespone;

      if (!user.companyId) {
        return HttpResponse(c).notFound('Company tidak ditemukan');
      }

      const data = await WorkstationService.list(user.companyId);

      if (!data) {
        return HttpResponse(c).badRequest();
      }
      return HttpResponse(c).ok(data, 'Berhasil mengambil daftar workstation');
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async getById(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      const params = c.params as { id: string };

      const authRespone = await unauthorizedValidate(user, c);
      if (authRespone) return authRespone;

      const validateParams = await paramsValidate(params.id, c);
      if (validateParams) return validateParams;

      if (!user.companyId) {
        return HttpResponse(c).notFound('Company tidak ditemukan');
      }

      const data = await WorkstationService.getById(params.id, user.companyId);
      if (!data) return HttpResponse(c).notFound('Workstation tidak ditemukan');

      return HttpResponse(c).ok(data, 'Berhasil mengambil detail workstation');
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async create(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      const body = c.body as PickCreateWorkstation;

      const authRespone = await unauthorizedValidate(user, c);
      if (authRespone) return authRespone;

      const validateRespone = await CreateWorkStationValidate(c, body);
      if (validateRespone) return validateRespone;

      if (!user.companyId) {
        return HttpResponse(c).notFound('Company tidak ditemukan');
      }

      const data = await WorkstationService.create(user.companyId, user.id, body);

      return HttpResponse(c).created(data, 'Workstation berhasil dibuat');
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async update(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      const params = c.params as { id: string };

      const authRespone = await unauthorizedValidate(user, c);
      if (authRespone) return authRespone;

      const validateParams = await paramsValidate(params.id, c);
      if (validateParams) return validateParams;

      if (!user.companyId) {
        return HttpResponse(c).notFound('Company tidak ditemukan');
      }

      const body = c.body as PickUpdateWorkstation;
      const data = await WorkstationService.update(params.id, user.companyId, body);

      if (!data) return HttpResponse(c).notFound('Workstation tidak ditemukan');

      return HttpResponse(c).ok(
        data,

        'Workstation berhasil diperbarui',
      );
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  public async remove(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      const params = c.params as { id: string };

      const authRespone = await unauthorizedValidate(user, c);
      if (authRespone) return authRespone;

      const validateParams = await paramsValidate(params.id, c);
      if (validateParams) return validateParams;

      if (!user.companyId) {
        return HttpResponse(c).notFound('Company tidak ditemukan');
      }

      const data = await WorkstationService.remove(params.id, user.companyId);
      if (!data) return HttpResponse(c).notFound('Workstation tidak ditemukan');

      return HttpResponse(c).ok(
        data,

        'Workstation berhasil dihapus',
      );
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }

  // Bisa Join Menggunakan Link
  public async inviteMember(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      const params = c.params as { id: string };

      const authRespone = await unauthorizedValidate(user, c);
      if (authRespone) return authRespone;

      const validateParams = await paramsValidate(params.id, c);
      if (validateParams) return validateParams;

      if (!user.companyId) {
        return HttpResponse(c).notFound('Company tidak ditemukan');
      }

      const body = c.body as PickInviteMember;
      const data = await WorkstationService.inviteMember(params.id, user.companyId, body);

      return HttpResponse(c).created(data, 'Karyawan berhasil diinvite ke workstation');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Gagal menginvite karyawan';
      return HttpResponse(c).badRequest(message);
    }
  }

  public async removeMember(c: AppContext) {
    try {
      const user = c.user as JwtPayload;
      const params = c.params as { id: string; userID: string };

      const authRespone = await unauthorizedValidate(user, c);
      if (authRespone) return authRespone;

      const validateParams = await paramsValidate(params.id, c);
      if (validateParams) return validateParams;

      const validateUserParams = await paramsValidate(params.userID, c);
      if (validateUserParams) return validateUserParams;

      if (!user.companyId) {
        return HttpResponse(c).notFound('Company tidak ditemukan');
      }

      const data = await WorkstationService.removeMember(params.id, user.companyId, params.userID);

      if (!data) return HttpResponse(c).notFound('Anggota tidak ditemukan');

      return HttpResponse(c).ok(data, 'Anggota berhasil dihapus dari workstation');
    } catch (error) {
      return HttpResponse(c).internalError(error);
    }
  }
}

export default new WorkstationController();
