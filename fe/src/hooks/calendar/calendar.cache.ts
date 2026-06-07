import { queryKey } from "@/configs";
import type { AppNameSpace } from "@/hooks/useAppNameSpace";
import type { CalendarEvent, EventQuery } from "@/types/api/productivity";

export type CalendarCacheContext = {
  previousData?: CalendarEvent[];
};

export const eventsListKey = (query?: EventQuery) =>
  queryKey.calendar.list(query);

export function readEventSnapshot(
  ns: AppNameSpace,
  query?: EventQuery
): CalendarEvent[] | undefined {
  return ns.queryClient.getQueryData<CalendarEvent[]>(eventsListKey(query));
}
