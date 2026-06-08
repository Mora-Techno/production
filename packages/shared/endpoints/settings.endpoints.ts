import { buildEndpoint, listEndpoints } from '../config/api.config';

const mount = '/settings';

export const SETTINGS_ENDPOINTS = {
  GET: buildEndpoint(mount),
  UPDATE: buildEndpoint(mount),
} as const;

export function listSettingsEndpoints() {
  return listEndpoints(SETTINGS_ENDPOINTS);
}
