'use client';

import { useMutation } from '@tanstack/react-query';

import { queryKey } from '@/configs';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { Api } from '@/services/api';
import type { Settings, UpdateSettingsInput } from '@/types/api/productivity';
import type { TResponse } from '@/types/api/response';

import { readSettingsSnapshot, type SettingsCacheContext } from './settings.cache';

export function useUpdateSettings() {
  const ns = useAppNameSpace();

  return useMutation<TResponse<Settings>, Error, UpdateSettingsInput, SettingsCacheContext>({
    mutationFn: (payload) => Api.Settings.update(payload),
    onMutate: async () => {
      await ns.queryClient.cancelQueries({ queryKey: queryKey.settingsRoot() });
      return { previousData: readSettingsSnapshot(ns) };
    },
    onSuccess: (res) => {
      ns.alert.toast({
        title: res.message,
        message: res.message,
        icon: 'success',
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.settingsRoot(),
      });
    },
    onError: (err, _variables, context) => {
      if (context?.previousData !== undefined) {
        ns.queryClient.setQueryData(queryKey.settings.detail(), context.previousData);
      }
      ns.alert.toast({
        title: err.message,
        message: err.message,
        icon: 'error',
      });
    },
  });
}
