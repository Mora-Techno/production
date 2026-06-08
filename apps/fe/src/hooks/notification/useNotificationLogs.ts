'use client';

import { useQuery } from '@tanstack/react-query';

import { Api } from '@/services/api';
import type { NotificationLogQuery } from '@/types/api/productivity';

import { notificationLogsKey } from './notification.cache';

export function useNotificationLogs(query?: NotificationLogQuery) {
  return useQuery({
    queryKey: notificationLogsKey(query),
    queryFn: async () => {
      const res = await Api.Notification.listLogs(query);
      return res.data;
    },
  });
}
