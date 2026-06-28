'use client';

import { useMutation } from '@tanstack/react-query';

import { queryKey } from '@/configs';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { Api } from '@/services/api';
import type { Todo, TodoQuery, UpdateTodoInput } from '@/types/api/productivity';
import type { TResponse } from '@/types/api/response';

import { readTodoSnapshot, type TodoCacheContext } from './todo.cache';

type UpdateTodoVariables = {
  id: string;
  payload: UpdateTodoInput;
  filters?: TodoQuery;
};

export function useUpdateTodo(defaultFilters?: TodoQuery) {
  const ns = useAppNameSpace();

  return useMutation<TResponse<Todo>, Error, UpdateTodoVariables, TodoCacheContext>({
    mutationFn: ({ id, payload }) => Api.Todo.update(id, payload),
    onMutate: async (variables) => {
      const filters = variables.filters ?? defaultFilters;
      await ns.queryClient.cancelQueries({ queryKey: queryKey.todosRoot() });
      return { previousData: readTodoSnapshot(ns, filters) };
    },
    onSuccess: (res) => {
      ns.alert.toast({
        title: res.message,
        message: res.message,
        icon: 'success',
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({ queryKey: queryKey.todosRoot() });
    },
    onError: (err, variables, context) => {
      const filters = variables.filters ?? defaultFilters;
      if (context?.previousData !== undefined) {
        ns.queryClient.setQueryData(queryKey.todos.list(filters), context.previousData);
      }
      ns.alert.toast({
        title: err.message,
        message: err.message,
        icon: 'error',
      });
    },
  });
}
