"use client";

import { useMutation } from "@tanstack/react-query";
import { queryKey } from "@/configs";
import { useAppNameSpace } from "@/hooks/useAppNameSpace";
import { Api } from "@/services/api";
import type { TResponse } from "@/types/api/response";
import type {
  CalendarEvent,
  CreateEventInput,
  EventQuery,
} from "@/types/api/productivity";
import { readEventSnapshot, type CalendarCacheContext } from "./calendar.cache";

type CreateEventVariables = CreateEventInput & { query?: EventQuery };

export function useCreateEvent(defaultQuery?: EventQuery) {
  const ns = useAppNameSpace();

  return useMutation<
    TResponse<CalendarEvent>,
    Error,
    CreateEventVariables,
    CalendarCacheContext
  >({
    mutationFn: ({ query: _query, ...payload }) => Api.Calendar.create(payload),
    onMutate: async (variables) => {
      const query = variables.query ?? defaultQuery;
      await ns.queryClient.cancelQueries({ queryKey: queryKey.calendarRoot() });
      return { previousData: readEventSnapshot(ns, query) };
    },
    onSuccess: (res) => {
      ns.alert.toast({
        title: res.message,
        message: res.message,
        icon: "success",
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
        ns.queryClient.setQueryData(
          queryKey.calendar.list(query),
          context.previousData
        );
      }
      ns.alert.toast({
        title: err.message,
        message: err.message,
        icon: "error",
      });
    },
  });
}
