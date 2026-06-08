'use client';

import { useMutation } from '@tanstack/react-query';

import { queryKey } from '@/configs';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { Api } from '@/services/api';
import type { CreateTodoInput, Todo } from '@/types/api/productivity';
import type { TResponse } from '@/types/api/response';

import { readTodoSnapshot, type TodoCacheContext } from './todo.cache';

export function useCreateTodo(filters?: Parameters<typeof readTodoSnapshot>[1]) {
  const ns = useAppNameSpace();

  return useMutation<TResponse<Todo>, Error, CreateTodoInput, TodoCacheContext>({
    mutationFn: (payload) => Api.Todo.create(payload),
    onMutate: async () => {
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
    onError: (err, _variables, context) => {
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
