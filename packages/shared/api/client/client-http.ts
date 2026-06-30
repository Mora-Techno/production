import {
  ApiError as ApiErrorClass,
  type ApiSuccessResponse,
} from "../../types/api.types";

export interface ClientRequestConfig {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
}

function buildClientApiUrl(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

async function clientCoreFetchResponse<T>(
  path: string,
  config: ClientRequestConfig = {},
): Promise<ApiSuccessResponse<T>> {
  const {
    method = "GET",
    body,
    headers: extraHeaders = {},
    cache = "no-store",
  } = config;

  const res = await fetch(buildClientApiUrl(path), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "same-origin",
    cache,
  });

  let json: ApiSuccessResponse<T>;
  try {
    json = await res.json();
  } catch {
    throw new ApiErrorClass(
      `Request failed with status ${res.status}`,
      res.status,
    );
  }

  if (!res.ok || json?.success === false) {
    if (res.status === 401 && typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    throw new ApiErrorClass(
      json?.message ?? `Request failed with status ${res.status}`,
      res.status,
      json?.errors,
    );
  }

  return json;
}

async function clientCoreFetch<T>(
  path: string,
  config?: ClientRequestConfig,
): Promise<T> {
  const json = await clientCoreFetchResponse<T>(path, config);
  return json.data;
}

export async function ClientGetResponse<T>(
  path: string,
): Promise<ApiSuccessResponse<T>> {
  return clientCoreFetchResponse<T>(path, { method: "GET" });
}

export async function ClientPostResponse<T>(
  path: string,
  data?: unknown,
): Promise<ApiSuccessResponse<T>> {
  return clientCoreFetchResponse<T>(path, { method: "POST", body: data });
}

export async function ClientPatchResponse<T>(
  path: string,
  data?: unknown,
): Promise<ApiSuccessResponse<T>> {
  return clientCoreFetchResponse<T>(path, { method: "PATCH", body: data });
}

export async function ClientPutResponse<T>(
  path: string,
  data?: unknown,
): Promise<ApiSuccessResponse<T>> {
  return clientCoreFetchResponse<T>(path, { method: "PUT", body: data });
}

export async function ClientDelResponse<T>(
  path: string,
): Promise<ApiSuccessResponse<T>> {
  return clientCoreFetchResponse<T>(path, { method: "DELETE" });
}

export async function ClientDel<T>(path: string): Promise<T> {
  return clientCoreFetch<T>(path, { method: "DELETE" });
}

export async function ClientGet<T>(path: string): Promise<T> {
  return clientCoreFetch<T>(path, { method: "GET" });
}

export async function ClientPost<T>(path: string, data?: unknown): Promise<T> {
  return clientCoreFetch<T>(path, { method: "POST", body: data });
}
