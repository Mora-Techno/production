"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/configs";
import { Api } from "@/services/api";

export function useNotes() {
  return useQuery({
    queryKey: queryKey.notes.list(),
    queryFn: async () => {
      const res = await Api.Note.list();
      return res.data;
    },
  });
}
