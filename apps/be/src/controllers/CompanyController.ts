import CompanyService from '@/service/CompanyService';
import AuthService from '@/service/AuthService';
import { errorResponse, successResponse } from '@/http/response';
import type { JwtPayload } from '@/types/auth.types';
import type {
  CreateAdminBody,
  RegisterCompanyBody,
  UpdateSubscriptionBody,
} from '@/types/company.types';

function getUser(c: any): JwtPayload {
  return c.user as JwtPayload;
}

class CompanyController {
  public async register(c: any) {
    try {
      const body = c.body as RegisterCompanyBody;
      const data = await CompanyService.registerLeader(body);
      const session = await AuthService.createSession(data.leader.id);

      return c.json(
        successResponse(
          'Company dan akun leader berhasil dibuat',
          { company: data.company, leader: data.leader, ...session },
          201,
        ),
        201,
      );
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Gagal mendaftarkan company';
      return c.json(errorResponse(message, 400), 400);
    }
  }

  public async createAdmin(c: any) {
    try {
      const user = getUser(c);

      if (user.companyRole !== 'leader') {
        return c.json(errorResponse('Hanya leader yang dapat membuat admin', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const body = c.body as CreateAdminBody;
      const data = await CompanyService.createAdmin(user.companyId, body);

      return c.json(successResponse('Admin berhasil dibuat', data, 201), 201);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Gagal membuat admin';
      return c.json(errorResponse(message, 400), 400);
    }
  }

  public async listAdmins(c: any) {
    try {
      const user = getUser(c);

      if (!['leader', 'admin'].includes(user.companyRole)) {
        return c.json(errorResponse('Akses ditolak', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const data = await CompanyService.listAdmins(user.companyId);
      return c.json(successResponse('Berhasil mengambil daftar admin', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal mengambil daftar admin', 500), 500);
    }
  }

  public async getProfile(c: any) {
    try {
      const user = getUser(c);

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const data = await CompanyService.getById(user.companyId);
      if (!data) return c.json(errorResponse('Company tidak ditemukan', 404), 404);

      return c.json(successResponse('Berhasil mengambil profil company', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal mengambil profil company', 500), 500);
    }
  }

  public async updateSubscription(c: any) {
    try {
      const user = getUser(c);

      if (user.companyRole !== 'leader') {
        return c.json(errorResponse('Hanya leader yang dapat mengubah langganan', 403), 403);
      }

      if (!user.companyId) {
        return c.json(errorResponse('Company tidak ditemukan', 404), 404);
      }

      const body = c.body as UpdateSubscriptionBody;
      const data = await CompanyService.updateSubscription(user.companyId, body);

      if (!data) return c.json(errorResponse('Company tidak ditemukan', 404), 404);

      return c.json(successResponse('Langganan berhasil diperbarui', data));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Gagal memperbarui langganan', 500), 500);
    }
  }
}

export default new CompanyController();
