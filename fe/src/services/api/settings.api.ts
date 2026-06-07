import { apiGet, apiPatch } from "./client";
import type {
  Settings,
  UpdateSettingsInput,
} from "@/types/api/productivity";

const BASE = "/api/settings";

export const SettingsApi = {
  get: () => apiGet<Settings>(BASE),
  update: (payload: UpdateSettingsInput) =>
    apiPatch<Settings>(BASE, payload),
};
