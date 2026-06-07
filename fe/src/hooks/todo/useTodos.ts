"use client";

import { useQuery } from "@tanstack/react-query";
import { Api } from "@/services/api";
import { todosListKey } from "./todo.cache";
import type { TodoQuery } from "@/types/api/productivity";

export function useTodos(filters?: TodoQuery) {
  return useQuery({
    queryKey: todosListKey(filters),
    queryFn: async () => {
      const res = await Api.Todo.list(filters);
      return res.data;
    },
  });
}
