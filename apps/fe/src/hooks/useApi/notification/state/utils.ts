import { NotificationLog } from "@repo/types";
import { NotificationLogQuery } from "@repo/types";
import { AppNameSpace } from "@/hooks/useAppNameSpace";
import { queryKey } from "@/configs";

export type NotificationCacheContext = {
  previousData?: NotificationLog[];
};

export const notificationLogsKey = (query?: NotificationLogQuery) =>
  queryKey.notifications.logs(query);

export function readNotificationLogsSnapshot(
  ns: AppNameSpace,
  query?: NotificationLogQuery,
): NotificationLog[] | undefined {
  return ns.queryClient.getQueryData<NotificationLog[]>(
    notificationLogsKey(query),
  );
}
export const notificationsRootKey = queryKey.notificationsRoot();
