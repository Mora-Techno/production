import { AppContext } from "@/contex";
import { JwtPayload } from "@repo/types/auth.types";
import { HttpResponse } from "@/http";

export async function unauthorizedValidate(user: JwtPayload, c: AppContext) {
  if (!user) {
    return HttpResponse(c).unauthorized();
  }
}

export async function paramsValidate(id: string, c: AppContext) {
  if (!id) {
    return HttpResponse(c).notFound("params tidak ditemukan");
  }
}
