'use client';

import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

import { APP_SESSION_COOKIE_KEY } from '@/configs/cookies.config';
import { isAuthRoute, isPublicRoute } from '@/configs/routes.config';
import { useAppDispatch } from '@/hooks/dispatch/dispatch';
import { setCurrentUser } from '@/stores/authSlice/authSlice';
import type { RootState } from '@/stores/store';
import type { AuthSession } from '@/types/api/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useAppDispatch();
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const token = getCookie(APP_SESSION_COOKIE_KEY);
    if (token && !currentUser?.user?.token) {
      dispatch(
        setCurrentUser({
          user: {
            id: '',
            email: '',
            fullName: '',
            role: 'user',
            token: String(token),
          },
        } satisfies AuthSession),
      );
    }
    setHydrated(true);
  }, [currentUser?.user?.token, dispatch]);

  React.useEffect(() => {
    if (!hydrated || !pathname) return;

    const isAuthenticated = Boolean(currentUser?.user?.token);
    const onPublic = isPublicRoute(pathname);
    const onAuth = isAuthRoute(pathname);

    if (!isAuthenticated && !onPublic) {
      router.replace('/login');
      return;
    }

    if (isAuthenticated && onAuth) {
      router.replace('/');
    }
  }, [pathname, currentUser, router, hydrated]);

  return <>{children}</>;
}
