import { buildEndpoint, listEndpoints } from "../config/api.config";

const mount = "/auth";

export const AUTH_ENDPOINTS = {
  LOGIN: buildEndpoint(mount, "/login"),
  REGISTER: buildEndpoint(mount, "/register"),
  LOGOUT: buildEndpoint(mount, "/logout"),
  REFRESH: buildEndpoint(mount, "/refresh"),
  SEND_MAGIC_LINK: buildEndpoint(mount, "/magic-link/send"),
  VERIFY_MAGIC_LINK: buildEndpoint(mount, "/magic-link/verify"),
  SEND_OTP: buildEndpoint(mount, "/otp/send"),
  VERIFY_OTP: buildEndpoint(mount, "/otp/verify"),
} as const;

export function listAuthEndpoints() {
  return listEndpoints(AUTH_ENDPOINTS);
}
