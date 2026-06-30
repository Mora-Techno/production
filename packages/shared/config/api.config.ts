/** Path prefix API — base URL diatur per platform via `setBaseURLProvider`. */
export const api = '';
export const version = '/api';

export function buildEndpoint(mount: string, path = ''): string {
  return `${api}${version}${mount}${path}`;
}

export function listEndpoints<const T extends Record<string, string>>(endpoints: T) {
  return (Object.keys(endpoints) as (keyof T)[]).map((key) => ({
    name: String(key),
    path: endpoints[key],
  }));
}
