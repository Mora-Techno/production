import { TODO_ENDPOINTS, todoById } from '../endpoints/todo.endpoints';
import type { PickCreateTodo, PickUpdateTodo, Todo, TodoQuery } from '../types/todo.types';
import type { TResponse } from '../types/response.types';
import { DeleteResponse, GetResponse, PatchResponse, PostResponse, withQuery } from './http';
import { toServiceResponse } from './service-response';

export async function ListTodos(query?: TodoQuery): Promise<TResponse<Todo[]>> {
  const res = await GetResponse<Todo[]>(withQuery(TODO_ENDPOINTS.LIST, query));
  return toServiceResponse(res, { message: 'Daftar tugas berhasil diambil' });
}

export async function CreateTodo(payload: PickCreateTodo): Promise<TResponse<Todo>> {
  const res = await PostResponse<Todo>(TODO_ENDPOINTS.CREATE, payload);
  return toServiceResponse(res, { message: 'Tugas berhasil dibuat', statusCode: 201 });
}

export async function UpdateTodo(id: string, payload: PickUpdateTodo): Promise<TResponse<Todo>> {
  const res = await PatchResponse<Todo>(todoById(id), payload);
  return toServiceResponse(res, { message: 'Tugas berhasil diperbarui' });
}

export async function DeleteTodo(id: string): Promise<TResponse<Todo>> {
  const res = await DeleteResponse<Todo>(todoById(id));
  return toServiceResponse(res, { message: 'Tugas berhasil dihapus' });
}

export const TodoService = {
  ListTodos,
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
  list: ListTodos,
  create: CreateTodo,
  update: UpdateTodo,
  remove: DeleteTodo,
};
