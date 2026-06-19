import CompanyService from "@/service/CompanyService";
import AuthService from "@/service/AuthService";
import { HttpResponse } from "@/http";
import type { JwtPayload } from "@repo/types/auth.types";
import type {
  PickCreateAdmin,
  PickRegisterCompany,
  PickUpdateCompanySubscription,
} from "@repo/types/company.types";
import type { AppContext } from "@/contex";

function getUser(c: AppContext): JwtPayload {
  return c.user as JwtPayload;
}

class CompanyController {
  public async register(c: AppContext) {
    try {
      const body = c.body as PickRegisterCompany;
      const data = await CompanyService.registerLeader(body);
      const session = await AuthService.createSession(data.leader.id);

      return HttpResponse(c).created(
        { company: data.company, leader: data.leader, ...session },
        "Company dan akun leader berhasil dibuat",
      );
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Gagal mendaftarkan company";
      return HttpResponse(c).badRequest(message);
    }
  }

  public async createAdmin(c: AppContext) {
    try {
      const user = getUser(c);

      if (user.companyRole !== "leader") {
        return HttpResponse(c).forbidden("Hanya leader yang dapat membuat admin");
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const body = c.body as PickCreateAdmin;
      const data = await CompanyService.createAdmin(user.companyId, body);

      return HttpResponse(c).created(data, "Admin berhasil dibuat");
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Gagal membuat admin";
      return HttpResponse(c).badRequest(message);
    }
  }

  public async listAdmins(c: AppContext) {
    try {
      const user = getUser(c);

      if (!["leader", "admin"].includes(user.companyRole)) {
        return HttpResponse(c).forbidden("Akses ditolak");
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const data = await CompanyService.listAdmins(user.companyId);
      return HttpResponse(c).ok(data, undefined, "Berhasil mengambil daftar admin");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal mengambil daftar admin");
    }
  }

  public async getProfile(c: AppContext) {
    try {
      const user = getUser(c);

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const data = await CompanyService.getById(user.companyId);
      if (!data) return HttpResponse(c).notFound("Company tidak ditemukan");

      return HttpResponse(c).ok(data, undefined, "Berhasil mengambil profil company");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal mengambil profil company");
    }
  }

  public async updateSubscription(c: AppContext) {
    try {
      const user = getUser(c);

      if (user.companyRole !== "leader") {
        return HttpResponse(c).forbidden(
          "Hanya leader yang dapat mengubah langganan",
        );
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const body = c.body as PickUpdateCompanySubscription;
      const data = await CompanyService.updateSubscription(
        user.companyId,
        body,
      );

      if (!data) return HttpResponse(c).notFound("Company tidak ditemukan");

      return HttpResponse(c).ok(data, undefined, "Langganan berhasil diperbarui");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal memperbarui langganan");
    }
  }
}

export default new CompanyController();
