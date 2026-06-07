"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/configs";
import { Api } from "@/services/api";

export function useSettings() {
  return useQuery({
    queryKey: queryKey.settings.detail(),
    queryFn: async () => {
      const res = await Api.Settings.get();
      return res.data;
    },
  });
}
