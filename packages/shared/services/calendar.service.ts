import {
  CALENDAR_ENDPOINTS,
  calendarEventById,
} from "../endpoints/calendar.endpoints";
import type {
  CalendarEvent,
  EventQuery,
  PickCreateEvent,
  PickUpdateEvent,
} from "../types/productivity.types";
import type { TResponse } from "../types/response.types";
import {
  DeleteResponse,
  GetResponse,
  PatchResponse,
  PostResponse,
  withQuery,
} from "./http";
import { toServiceResponse } from "./service-response";

export async function ListEvents(
  query?: EventQuery,
): Promise<TResponse<CalendarEvent[]>> {
  const res = await GetResponse<CalendarEvent[]>(
    withQuery(CALENDAR_ENDPOINTS.LIST, query),
  );
  return toServiceResponse(res, { message: "Daftar jadwal berhasil diambil" });
}

export async function CreateEvent(
  payload: PickCreateEvent,
): Promise<TResponse<CalendarEvent>> {
  const res = await PostResponse<CalendarEvent>(
    CALENDAR_ENDPOINTS.CREATE,
    payload,
  );
  return toServiceResponse(res, {
    message: "Jadwal berhasil dibuat",
    statusCode: 201,
  });
}

export async function UpdateEvent(
  id: string,
  payload: PickUpdateEvent,
): Promise<TResponse<CalendarEvent>> {
  const res = await PatchResponse<CalendarEvent>(
    calendarEventById(id),
    payload,
  );
  return toServiceResponse(res, { message: "Jadwal berhasil diperbarui" });
}

export async function DeleteEvent(
  id: string,
): Promise<TResponse<CalendarEvent>> {
  const res = await DeleteResponse<CalendarEvent>(calendarEventById(id));
  return toServiceResponse(res, { message: "Jadwal berhasil dihapus" });
}

export const CalendarService = {
  ListEvents,
  CreateEvent,
  UpdateEvent,
  DeleteEvent,
  list: ListEvents,
  create: CreateEvent,
  update: UpdateEvent,
  remove: DeleteEvent,
};
