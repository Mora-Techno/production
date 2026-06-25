import FetchClient from "../utils/api";
import type { TResponse } from "../types/response.types";

type QueryValue = string | number | boolean | undefined | null;

export function withQuery(
  path: string,
  params?: Record<string, QueryValue> | object,
): string {
  if (!params) return path;

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }

  const query = search.toString();
  return query ? `${path}?${query}` : path;
}

export async function PublicGetResponse<T>(
  path: string,
): Promise<TResponse<T>> {
  return FetchClient.get<TResponse<T>>(path);
}

export async function PublicPostResponse<T>(
  path: string,
  data?: unknown,
): Promise<TResponse<T>> {
  return FetchClient.post<TResponse<T>>(path, data);
}

export async function GetResponse<T>(path: string): Promise<TResponse<T>> {
  return FetchClient.get<TResponse<T>>(path);
}

export async function PostResponse<T>(
  path: string,
  data?: unknown,
): Promise<TResponse<T>> {
  return FetchClient.post<TResponse<T>>(path, data);
}

export async function PutResponse<T>(
  path: string,
  data?: unknown,
): Promise<TResponse<T>> {
  return FetchClient.put<TResponse<T>>(path, data);
}

export async function PatchResponse<T>(
  path: string,
  data?: unknown,
): Promise<TResponse<T>> {
  return FetchClient.patch<TResponse<T>>(path, data);
}

export async function DeleteResponse<T>(path: string): Promise<TResponse<T>> {
  return FetchClient.delete<TResponse<T>>(path);
}
