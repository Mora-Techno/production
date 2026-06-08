'use client';

import { useQuery } from '@tanstack/react-query';

import { queryKey } from '@/configs';
import { Api } from '@/services/api';

export function useSubscription() {
  return useQuery({
    queryKey: queryKey.subscriptions.me(),
    queryFn: async () => {
      const res = await Api.Subscription.getMine();
      return res.data;
    },
  });
}
