import { useQuery } from "@tanstack/react-query";
import { todosListKey } from "./utils";
import Api from "@/services/api";
import { TodoQuery } from "@repo/types";

export function useTodos(filters?: TodoQuery) {
  return useQuery({
    queryKey: todosListKey(filters),
    queryFn: async () => {
      const res = await Api.Todo.list(filters);
      return res.data;
    },
  });
}
