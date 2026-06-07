'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/dispatch/dispatch';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { Api } from '@/services/api';
import { setCurrentUser } from '@/stores/authSlice/authSlice';
import type { LoginInput } from '@/types/api/auth';
import { mapAuthData, persistAuthSession } from './auth.utils';

export function useLogin() {
  const ns = useAppNameSpace();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginInput) => Api.Auth.login(payload),
    onSuccess: (res) => {
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
