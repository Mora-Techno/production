import { apiDelete, apiGet, apiPatch, apiPost } from "./client";
import type {
  CreateTodoInput,
  Todo,
  TodoQuery,
  UpdateTodoInput,
} from "@/types/api/productivity";

const BASE = "/api/todos";

export const TodoApi = {
  list: (query?: TodoQuery) =>
    apiGet<Todo[]>(BASE, query as Record<string, string | undefined>),
  create: (payload: CreateTodoInput) => apiPost<Todo>(BASE, payload),
  update: (id: string, payload: UpdateTodoInput) =>
    apiPatch<Todo>(`${BASE}/${id}`, payload),
  remove: (id: string) => apiDelete<Todo>(`${BASE}/${id}`),
};
