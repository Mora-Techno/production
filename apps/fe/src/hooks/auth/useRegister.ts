'use client';

import type { AuthSessionResponse } from '@repo/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/hooks/dispatch/dispatch';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { Api } from '@/services/api';
import { setCurrentUser } from '@/stores/authSlice/authSlice';
import type { RegisterInput } from '@/types/api/auth';

import { mapAuthData, persistAuthSession } from './auth.utils';

function isAuthSessionResponse(data: unknown): data is AuthSessionResponse {
  return typeof data === 'object' && data !== null && 'accessToken' in data && 'user' in data;
}

export function useRegister() {
  const ns = useAppNameSpace();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterInput) => Api.Auth.register(payload),
    onSuccess: (res) => {
      if (!isAuthSessionResponse(res.data)) {
        ns.alert.toast({
          title: 'Registrasi berhasil',
          message: 'Silakan login dengan akun baru Anda.',
          icon: 'success',
        });
        router.replace('/login');
        return;
      }

      const session = mapAuthData(res.data);
      persistAuthSession(session);
      dispatch(setCurrentUser(session));
      ns.alert.toast({
        title: res.message,
        message: res.message,
        icon: 'success',
      });
      router.replace('/');
    },
    onError: (err: Error) => {
      ns.alert.toast({
        title: err.message,
        message: err.message,
        icon: 'error',
      });
    },
  });
}
