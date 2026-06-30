export const APP_SESSION_COOKIE_KEY = "production_session";
export const APP_SESSION_COOKIE_REFRESH = "production_refres";
export const APP_SESSION_COOKIE_ROLE = "production_role";
export const APP_REFRESH_TOKEN_COOKIE_EXPIRES_IN = 24 * 60 * 60 * 1000;
export const AUTH_COOKIE_MAX_AGE = {
  accessToken: 60 * 15,
  refreshToken: 60 * 60 * 24 * 7,
  role: 60 * 60 * 24 * 7,
} as const;
