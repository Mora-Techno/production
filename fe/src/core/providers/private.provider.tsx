'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import type { RootState } from '@/stores/store';
import { isPublicRoute } from '@/configs/routes.config';
import { useEffect } from 'react';

export default function PrivateProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const token = useSelector(
    (state: RootState) => state.auth.currentUser?.user?.token
  );

  useEffect(() => {
    if (!pathname || isPublicRoute(pathname)) return;
    if (!token) router.replace('/login');
  }, [pathname, token, router]);

  return <>{children}</>;
}
