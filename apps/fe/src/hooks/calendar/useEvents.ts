'use client';

import { useQuery } from '@tanstack/react-query';

import { Api } from '@/services/api';
import type { EventQuery } from '@/types/api/productivity';

import { eventsListKey } from './calendar.cache';

export function useEvents(query?: EventQuery) {
  return useQuery({
    queryKey: eventsListKey(query),
    queryFn: async () => {
      const res = await Api.Calendar.list(query);
      return res.data;
    },
  });
}
