'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { isAuthRoute, isPublicRoute } from '@/configs/routes.config';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [role, setRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadSession() {
      try {
        const res = await fetch('/api/auth/session', {
          credentials: 'include',
        });

        if (!res.ok) {
          setAuthenticated(false);
          return;
        }

        const session = await res.json();

        setAuthenticated(session.authenticated);
        setRole(session.role ?? null);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, []);

  React.useEffect(() => {
    if (loading || !pathname) return;

    const onPublic = isPublicRoute(pathname);
    const onAuth = isAuthRoute(pathname);

    if (!authenticated && !onPublic && !onAuth) {
      router.replace('/login');
      return;
    }

    if (authenticated && onAuth) {
      router.replace('/home');
      return;
    }

    // TODO:
    // cek role di sini
    // if(role !== "admin") ...
  }, [loading, authenticated, pathname, router, role]);

  if (loading) return null;

  return <>{children}</>;
}
