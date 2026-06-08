import { buildEndpoint, listEndpoints } from '../config/api.config';

const mount = '/notifications';

export const NOTIFICATION_ENDPOINTS = {
  SEND: buildEndpoint(mount, '/send'),
  LOGS: buildEndpoint(mount, '/logs'),
} as const;

export function listNotificationEndpoints() {
  return listEndpoints(NOTIFICATION_ENDPOINTS);
}
