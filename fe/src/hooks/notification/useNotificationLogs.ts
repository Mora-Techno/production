"use client";

import { useQuery } from "@tanstack/react-query";
import { Api } from "@/services/api";
import { notificationLogsKey } from "./notification.cache";
import type { NotificationLogQuery } from "@/types/api/productivity";

export function useNotificationLogs(query?: NotificationLogQuery) {
  return useQuery({
    queryKey: notificationLogsKey(query),
    queryFn: async () => {
      const res = await Api.Notification.listLogs(query);
      return res.data;
    },
  });
}
