import { AppContext } from "@/contex";
import { PickCreateWorkstation } from "@repo/types/workstation.types";
import { HttpResponse } from "@/http";

export async function CreateWorkStationValidate(
  c: AppContext,
  input: PickCreateWorkstation,
) {
  if (!input) {
    return HttpResponse(c).badRequest();
  }
}
