'use client';

import { useQuery } from '@tanstack/react-query';

import { queryKey } from '@/configs';
import { Api } from '@/services/api';

export function usePlaylists() {
  return useQuery({
    queryKey: queryKey.music.list(),
    queryFn: async () => {
      const res = await Api.Music.list();
      return res.data;
    },
  });
}
