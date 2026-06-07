import { env } from "@/configs";
import type {
  AuthLoginData,
  LoginInput,
  RegisterInput,
} from "@/types/api/auth";

const BASE_URL = env.NEXT_PUBLIC_BACKEND_URL;

type AuthResponse<T> = {
  status?: number;
  statusCode?: number;
  message: string;
  data: T;
};

async function parseAuthResponse<T>(res: Response): Promise<AuthResponse<T>> {
  const json = (await res.json()) as AuthResponse<T> & { message: string };

  const isOk =
    res.ok || json.statusCode === 200 || json.statusCode === 201;

  if (!isOk) {
    throw new Error(json.message ?? "Request gagal");
  }

  return json;
}

function authHeaders(token?: string): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export const AuthApi = {
  login: async (payload: LoginInput) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    return parseAuthResponse<AuthLoginData>(res);
  },

  register: async (payload: RegisterInput) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ ...payload, role: payload.role ?? "user" }),
      cache: "no-store",
    });
    return parseAuthResponse<AuthLoginData>(res);
  },

  logout: async (token: string) => {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: authHeaders(token),
      cache: "no-store",
    });
    return parseAuthResponse<null>(res);
  },
};
