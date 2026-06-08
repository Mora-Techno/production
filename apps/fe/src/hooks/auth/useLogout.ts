'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/hooks/dispatch/dispatch';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { Api } from '@/services/api';
import { logout as logoutAction } from '@/stores/authSlice/authSlice';

import { clearAuthSession } from './auth.utils';

export function useLogout() {
  const ns = useAppNameSpace();
  const dispatch = useAppDispatch();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      try {
        await Api.Auth.logout();
      } catch {
        // Tetap logout lokal meski BE gagal
      }
      await fetch('/api/session/delete', { method: 'POST' });
    },
    onSuccess: () => {
      clearAuthSession();
      dispatch(logoutAction());
      ns.alert.toast({
        title: 'Logout berhasil',
        message: 'Sampai jumpa lagi!',
        icon: 'success',
      });
      router.replace('/login');
    },
    onError: (err: Error) => {
      clearAuthSession();
      dispatch(logoutAction());
      ns.alert.toast({
        title: err.message,
        message: err.message,
        icon: 'error',
      });
      router.replace('/login');
    },
  });
}
