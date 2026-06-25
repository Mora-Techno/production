import { AppContext } from "@/contex";
import { HttpResponse } from "@/http";
import { PickCreatePlaylist } from "@repo/types/productivity.types";

export async function CreateMusicValidate(
  c: AppContext,
  input: PickCreatePlaylist,
) {
  if (!input) {
    return HttpResponse(c).notFound("body Create Music Dibutuhkan ");
  }
}
