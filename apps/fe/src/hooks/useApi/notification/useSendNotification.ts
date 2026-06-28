'use client';

import { useMutation } from '@tanstack/react-query';

import { queryKey } from '@/configs';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { Api } from '@/services/api';
import type {
  NotificationLog,
  NotificationLogQuery,
  SendNotificationInput,
} from '@/types/api/productivity';
import type { TResponse } from '@/types/api/response';

import { type NotificationCacheContext, readNotificationLogsSnapshot } from './notification.cache';

type SendNotificationVariables = SendNotificationInput & {
  logsQuery?: NotificationLogQuery;
};

export function useSendNotification(defaultLogsQuery?: NotificationLogQuery) {
  const ns = useAppNameSpace();

  return useMutation<
    TResponse<NotificationLog>,
    Error,
    SendNotificationVariables,
    NotificationCacheContext
  >({
    mutationFn: ({ logsQuery: _logsQuery, ...payload }) => Api.Notification.send(payload),
    onMutate: async (variables) => {
      const logsQuery = variables.logsQuery ?? defaultLogsQuery;
      await ns.queryClient.cancelQueries({
        queryKey: queryKey.notificationsRoot(),
      });
      return { previousData: readNotificationLogsSnapshot(ns, logsQuery) };
    },
    onSuccess: (res) => {
      ns.alert.toast({
        title: res.message,
        message: res.message,
        icon: 'success',
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({
        queryKey: queryKey.notificationsRoot(),
      });
    },
    onError: (err, variables, context) => {
      const logsQuery = variables.logsQuery ?? defaultLogsQuery;
      if (context?.previousData !== undefined) {
        ns.queryClient.setQueryData(queryKey.notifications.logs(logsQuery), context.previousData);
      }
      ns.alert.toast({
        title: err.message,
        message: err.message,
        icon: 'error',
      });
    },
  });
}
