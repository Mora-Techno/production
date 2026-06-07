import { queryKey } from "@/configs";
import type { AppNameSpace } from "@/hooks/useAppNameSpace";
import type { NotificationLog, NotificationLogQuery } from "@/types/api/productivity";

export type NotificationCacheContext = {
  previousData?: NotificationLog[];
};

export const notificationLogsKey = (query?: NotificationLogQuery) =>
  queryKey.notifications.logs(query);

export function readNotificationLogsSnapshot(
  ns: AppNameSpace,
  query?: NotificationLogQuery
): NotificationLog[] | undefined {
  return ns.queryClient.getQueryData<NotificationLog[]>(
    notificationLogsKey(query)
  );
}
