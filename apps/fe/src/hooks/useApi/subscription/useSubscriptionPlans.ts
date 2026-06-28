'use client';

import { useQuery } from '@tanstack/react-query';

import { queryKey } from '@/configs';
import { Api } from '@/services/api';

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: queryKey.subscriptions.plans(),
    queryFn: async () => {
      const res = await Api.Subscription.getPlans();
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
  });
}
