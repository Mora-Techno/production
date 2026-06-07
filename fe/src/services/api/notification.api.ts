import { apiGet, apiPost } from "./client";
import type {
  NotificationLog,
  NotificationLogQuery,
  SendNotificationInput,
} from "@/types/api/productivity";

const BASE = "/api/notifications";

export const NotificationApi = {
  send: (payload: SendNotificationInput) =>
    apiPost<NotificationLog>(`${BASE}/send`, payload),
  listLogs: (query?: NotificationLogQuery) =>
    apiGet<NotificationLog[]>(
      `${BASE}/logs`,
      query as Record<string, string | number | undefined>
    ),
};
