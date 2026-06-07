import { apiDelete, apiGet, apiPatch, apiPost } from "./client";
import type {
  CalendarEvent,
  CreateEventInput,
  EventQuery,
  UpdateEventInput,
} from "@/types/api/productivity";

const BASE = "/api/calendar/events";

export const CalendarApi = {
  list: (query?: EventQuery) =>
    apiGet<CalendarEvent[]>(BASE, query as Record<string, string | undefined>),
  create: (payload: CreateEventInput) => apiPost<CalendarEvent>(BASE, payload),
  update: (id: string, payload: UpdateEventInput) =>
    apiPatch<CalendarEvent>(`${BASE}/${id}`, payload),
  remove: (id: string) => apiDelete<CalendarEvent>(`${BASE}/${id}`),
};
