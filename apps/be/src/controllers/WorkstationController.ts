import WorkstationService from "@/service/WorkstationService";
import { HttpResponse } from "@/http";
import type { JwtPayload } from "@repo/types/auth.types";
import type {
  PickCreateWorkstation,
  PickInviteMember,
  PickUpdateWorkstation,
} from "@repo/types/workstation.types";
import type { AppContext } from "@/contex";

function getUser(c: AppContext): JwtPayload {
  return c.user as JwtPayload;
}

function canManageWorkstation(user: JwtPayload): boolean {
  return user.companyRole === "leader" || user.companyRole === "admin";
}

class WorkstationController {
  public async list(c: AppContext) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return HttpResponse(c).forbidden("Akses ditolak");
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const data = await WorkstationService.list(user.companyId);
      return HttpResponse(c).ok(
        data,
        undefined,
        "Berhasil mengambil daftar workstation",
      );
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(
        error,
        "Gagal mengambil daftar workstation",
      );
    }
  }

  public async getById(c: AppContext) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return HttpResponse(c).forbidden("Akses ditolak");
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const data = await WorkstationService.getById(c.params.id, user.companyId);
      if (!data) return HttpResponse(c).notFound("Workstation tidak ditemukan");

      return HttpResponse(c).ok(
        data,
        undefined,
        "Berhasil mengambil detail workstation",
      );
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(
        error,
        "Gagal mengambil detail workstation",
      );
    }
  }

  public async create(c: AppContext) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return HttpResponse(c).forbidden("Akses ditolak");
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const body = c.body as PickCreateWorkstation;
      const data = await WorkstationService.create(
        user.companyId,
        user.id,
        body,
      );

      return HttpResponse(c).created(data, "Workstation berhasil dibuat");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal membuat workstation");
    }
  }

  public async update(c: AppContext) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return HttpResponse(c).forbidden("Akses ditolak");
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const body = c.body as PickUpdateWorkstation;
      const data = await WorkstationService.update(
        c.params.id,
        user.companyId,
        body,
      );

      if (!data) return HttpResponse(c).notFound("Workstation tidak ditemukan");

      return HttpResponse(c).ok(data, undefined, "Workstation berhasil diperbarui");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal memperbarui workstation");
    }
  }

  public async remove(c: AppContext) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return HttpResponse(c).forbidden("Akses ditolak");
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const data = await WorkstationService.remove(c.params.id, user.companyId);
      if (!data) return HttpResponse(c).notFound("Workstation tidak ditemukan");

      return HttpResponse(c).ok(data, undefined, "Workstation berhasil dihapus");
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal menghapus workstation");
    }
  }

  public async inviteMember(c: AppContext) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return HttpResponse(c).forbidden("Akses ditolak");
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const body = c.body as PickInviteMember;
      const data = await WorkstationService.inviteMember(
        c.params.id,
        user.companyId,
        body,
      );

      return HttpResponse(c).created(
        data,
        "Karyawan berhasil diinvite ke workstation",
      );
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Gagal menginvite karyawan";
      return HttpResponse(c).badRequest(message);
    }
  }

  public async removeMember(c: AppContext) {
    try {
      const user = getUser(c);

      if (!canManageWorkstation(user)) {
        return HttpResponse(c).forbidden("Akses ditolak");
      }

      if (!user.companyId) {
        return HttpResponse(c).notFound("Company tidak ditemukan");
      }

      const data = await WorkstationService.removeMember(
        c.params.id,
        user.companyId,
        c.params.userId,
      );

      if (!data) return HttpResponse(c).notFound("Anggota tidak ditemukan");

      return HttpResponse(c).ok(
        data,
        undefined,
        "Anggota berhasil dihapus dari workstation",
      );
    } catch (error) {
      console.error(error);
      return HttpResponse(c).internalError(error, "Gagal menghapus anggota");
    }
  }
}

export default new WorkstationController();
