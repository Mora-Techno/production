import { SETTINGS_ENDPOINTS } from "../endpoints/settings.endpoints";
import type { PickUpdateSettings, Settings } from "../types/settings.types";
import type { TResponse } from "../types/response.types";
import { GetResponse, PatchResponse } from "./http";
import { toServiceResponse } from "./service-response";

export async function GetSettings(): Promise<TResponse<Settings>> {
  const res = await GetResponse<Settings>(SETTINGS_ENDPOINTS.GET);
  return toServiceResponse(res, {
    message: "Pengaturan berhasil diambil",
  });
}

export async function UpdateSettings(
  payload: PickUpdateSettings,
): Promise<TResponse<Settings>> {
  const res = await PatchResponse<Settings>(SETTINGS_ENDPOINTS.UPDATE, payload);
  return toServiceResponse(res, {
    message: "Pengaturan berhasil diperbarui",
  });
}

export const SettingsService = {
  get: GetSettings,
  update: UpdateSettings,
};
