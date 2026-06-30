'use client';

import { useQueryClient } from '@tanstack/react-query';

import { useAlert } from '@/hooks/useAlert/costum-alert';

export type AppNameSpace = {
  queryClient: ReturnType<typeof useQueryClient>;
  alert: ReturnType<typeof useAlert>;
};

export function useAppNameSpace(): AppNameSpace {
  const queryClient = useQueryClient();
  const alert = useAlert();

  return { queryClient, alert };
}
