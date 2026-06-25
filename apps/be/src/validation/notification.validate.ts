import { AppContext } from "@/contex";
import { HttpResponse } from "@/http";
import { PickSendNotification } from "@repo/types/productivity.types";

export async function SendNotifValidation(
  c: AppContext,
  input: PickSendNotification,
) {
  if (!input) {
    return HttpResponse(c).notFound("body Create Send Dibutuhkan");
  }
}
