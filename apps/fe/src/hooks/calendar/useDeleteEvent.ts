'use client';

import { useMutation } from '@tanstack/react-query';

import { queryKey } from '@/configs';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { Api } from '@/services/api';
import type { CalendarEvent, EventQuery } from '@/types/api/productivity';
import type { TResponse } from '@/types/api/response';

import { type CalendarCacheContext, readEventSnapshot } from './calendar.cache';

type DeleteEventVariables = {
  id: string;
  query?: EventQuery;
};

export function useDeleteEvent(defaultQuery?: EventQuery) {
  const ns = useAppNameSpace();

  return useMutation<TResponse<CalendarEvent>, Error, DeleteEventVariables, CalendarCacheContext>({
    mutationFn: ({ id }) => Api.Calendar.remove(id),
    onMutate: async (variables) => {
      const query = variables.query ?? defaultQuery;
      await ns.queryClient.cancelQueries({ queryKey: queryKey.calendarRoot() });
      return { previousData: readEventSnapshot(ns, query) };
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
        queryKey: queryKey.calendarRoot(),
      });
    },
    onError: (err, variables, context) => {
      const query = variables.query ?? defaultQuery;
      if (context?.previousData !== undefined) {
        ns.queryClient.setQueryData(queryKey.calendar.list(query), context.previousData);
      }
      ns.alert.toast({
        title: err.message,
        message: err.message,
        icon: 'error',
      });
    },
  });
}
