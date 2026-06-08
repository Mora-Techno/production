import { buildEndpoint, listEndpoints } from '../config/api.config';

const mount = '/todos';

export const TODO_ENDPOINTS = {
  LIST: buildEndpoint(mount),
  CREATE: buildEndpoint(mount),
} as const;

export const todoById = (id: string) => buildEndpoint(mount, `/${id}`);

export function listTodoEndpoints() {
  return listEndpoints(TODO_ENDPOINTS);
}
