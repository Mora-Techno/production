import { useCreateTodo, useDeleteTodo, useUpdateTodo } from './state/mutate';
import { todosListKey } from './state/utils';

export const useTodo = () => {
  return {
    mutate: {
      create: useCreateTodo,
      delete: useDeleteTodo,
      update: useUpdateTodo,
    },
    query: {
      get: todosListKey,
    },
  };
};
