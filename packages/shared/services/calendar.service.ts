import {
  CALENDAR_ENDPOINTS,
  calendarEventById,
} from "../endpoints/calendar.endpoints";
import type {
  CalendarEvent,
  EventQuery,
  PickCreateEvent,
  PickUpdateEvent,
} from "../types/calendar.types";
import type { TResponse } from "../types/response.types";
import {
  DeleteResponse,
  GetResponse,
  PatchResponse,
  PostResponse,
  withQuery,
} from "./http";
import { toServiceResponse } from "./service-response";
import { PickApiID } from "@repo/types/api.types";

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
  id: PickApiID,
  payload: PickUpdateEvent,
): Promise<TResponse<CalendarEvent>> {
  const res = await PatchResponse<CalendarEvent>(
    calendarEventById(id.id),
    payload,
  );
  return toServiceResponse(res, { message: "Jadwal berhasil diperbarui" });
}

export async function DeleteEvent(
  id: PickApiID,
): Promise<TResponse<CalendarEvent>> {
  const res = await DeleteResponse<CalendarEvent>(calendarEventById(id.id));
  return toServiceResponse(res, { message: "Jadwal berhasil dihapus" });
}

export const CalendarService = {
  list: ListEvents,
  create: CreateEvent,
  update: UpdateEvent,
  remove: DeleteEvent,
};
