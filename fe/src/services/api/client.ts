import { env } from "@/configs";
import type { TErrorResponse, TResponse } from "@/types/api/response";

const BASE_URL = env.NEXT_PUBLIC_BACKEND_URL;

type QueryParams = Record<string, string | number | undefined | null>;

function buildQuery(params?: QueryParams): string {
  if (!params) return "";

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : "";
}

async function parseResponse<T>(res: Response): Promise<TResponse<T>> {
  const json = (await res.json()) as TResponse<T> | TErrorResponse;

  if (!res.ok) {
    throw new Error(json.message ?? "Request gagal");
  }

  return json as TResponse<T>;
}

export async function apiGet<T>(
  path: string,
  params?: QueryParams
): Promise<TResponse<T>> {
  const res = await fetch(`${BASE_URL}${path}${buildQuery(params)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return parseResponse<T>(res);
}

export async function apiPost<T>(
  path: string,
  body?: unknown
): Promise<TResponse<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  return parseResponse<T>(res);
}

export async function apiPut<T>(
  path: string,
  body?: unknown
): Promise<TResponse<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  return parseResponse<T>(res);
}

export async function apiPatch<T>(
  path: string,
  body?: unknown
): Promise<TResponse<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  return parseResponse<T>(res);
}

export async function apiDelete<T>(path: string): Promise<TResponse<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  return parseResponse<T>(res);
}
