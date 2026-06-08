import { buildEndpoint, listEndpoints } from '../config/api.config';

const mount = '/companies';

export const COMPANY_ENDPOINTS = {
  REGISTER: buildEndpoint(mount, '/register'),
  CREATE_ADMIN: buildEndpoint(mount, '/admins'),
  LIST_ADMINS: buildEndpoint(mount, '/admins'),
  ME: buildEndpoint(mount, '/me'),
  UPDATE_SUBSCRIPTION: buildEndpoint(mount, '/subscription'),
} as const;

export function listCompanyEndpoints() {
  return listEndpoints(COMPANY_ENDPOINTS);
}
