import { NotificationLogQuery } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { notificationLogsKey } from "./utils";
import Api from "@/services/api";

export function useNotificationLogs(query?: NotificationLogQuery) {
  return useQuery({
    queryKey: notificationLogsKey(query),
    queryFn: async () => {
      const res = await Api.Notification.listLogs(query);
      return res.data;
    },
  });
}
