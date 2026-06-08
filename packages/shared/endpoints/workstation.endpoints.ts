import { buildEndpoint, listEndpoints } from '../config/api.config';

const mount = '/workstations';

export const WORKSTATION_ENDPOINTS = {
  LIST: buildEndpoint(mount),
  CREATE: buildEndpoint(mount),
} as const;

export const workstationById = (id: string) => buildEndpoint(mount, `/${id}`);

export const workstationMembers = (id: string) => buildEndpoint(mount, `/${id}/members`);

export const workstationMemberById = (workstationId: string, userId: string) =>
  buildEndpoint(mount, `/${workstationId}/members/${userId}`);

export function listWorkstationEndpoints() {
  return listEndpoints(WORKSTATION_ENDPOINTS);
}
