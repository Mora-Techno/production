import { queryKey } from '@/configs';
import type { AppNameSpace } from '@/hooks/useAppNameSpace';
import type { Todo, TodoQuery } from '@/types/api/productivity';

export type TodoCacheContext = {
  previousData?: Todo[];
};

export const todosListKey = (filters?: TodoQuery) => queryKey.todos.list(filters);

export function readTodoSnapshot(ns: AppNameSpace, filters?: TodoQuery): Todo[] | undefined {
  return ns.queryClient.getQueryData<Todo[]>(todosListKey(filters));
}
