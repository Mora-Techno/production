import { setCookie, deleteCookie } from 'cookies-next';
import {
  APP_SESSION_COOKIE_KEY,
  APP_SESSION_COOKIE_ROLE,
} from '@/configs/cookies.config';
import type { AuthLoginData, AuthSession } from '@/types/api/auth';

const SESSION_MAX_AGE = 60 * 60 * 24;

export function mapAuthData(data: AuthLoginData): AuthSession {
  return {
    user: {
      id: data.id,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      token: data.token,
    },
  };
}

export function persistAuthSession(session: AuthSession) {
  setCookie(APP_SESSION_COOKIE_KEY, session.user.token, {
    maxAge: SESSION_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  });
  setCookie(APP_SESSION_COOKIE_ROLE, session.user.role, {
    maxAge: SESSION_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  });
}

export function clearAuthSession() {
  deleteCookie(APP_SESSION_COOKIE_KEY, { path: '/' });
  deleteCookie(APP_SESSION_COOKIE_ROLE, { path: '/' });
}
