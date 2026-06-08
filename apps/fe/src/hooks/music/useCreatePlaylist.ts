'use client';

import { useMutation } from '@tanstack/react-query';

import { queryKey } from '@/configs';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { Api } from '@/services/api';
import type { CreatePlaylistInput, MusicPlaylist } from '@/types/api/productivity';
import type { TResponse } from '@/types/api/response';

import { type MusicCacheContext, readPlaylistSnapshot } from './music.cache';

export function useCreatePlaylist() {
  const ns = useAppNameSpace();

  return useMutation<TResponse<MusicPlaylist>, Error, CreatePlaylistInput, MusicCacheContext>({
    mutationFn: (payload) => Api.Music.create(payload),
    onMutate: async () => {
      await ns.queryClient.cancelQueries({ queryKey: queryKey.musicRoot() });
      return { previousData: readPlaylistSnapshot(ns) };
    },
    onSuccess: (res) => {
      ns.alert.toast({
        title: res.message,
        message: res.message,
        icon: 'success',
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({ queryKey: queryKey.musicRoot() });
    },
    onError: (err, _variables, context) => {
      if (context?.previousData !== undefined) {
        ns.queryClient.setQueryData(queryKey.music.list(), context.previousData);
      }
      ns.alert.toast({
        title: err.message,
        message: err.message,
        icon: 'error',
      });
    },
  });
}
