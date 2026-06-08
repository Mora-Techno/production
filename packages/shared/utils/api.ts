// api.ts

type TokenProvider = () => string | undefined | Promise<string | undefined>;
type BaseURLProvider = () => string | undefined | Promise<string | undefined>;
type OnUnauthorized = () => void | Promise<void>;

let _tokenProvider: TokenProvider | null = null;
let _baseURLProvider: BaseURLProvider | null = null;
let _onUnauthorized: OnUnauthorized | null = null;

export const setTokenProvider = (provider: TokenProvider) => {
  _tokenProvider = provider;
};

export const setBaseURLProvider = (provider: BaseURLProvider) => {
  _baseURLProvider = provider;
};

export const setOnUnauthorized = (handler: OnUnauthorized) => {
  _onUnauthorized = handler;
};

const isDev = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';

const getBaseURL = async (): Promise<string | undefined> => {
  if (_baseURLProvider) return _baseURLProvider();
  return undefined;
};

const getToken = async (): Promise<string | undefined> => {
  if (_tokenProvider) return _tokenProvider();
  return undefined;
};

export class FetchError extends Error {
  status?: number;
  url?: string;
  data?: unknown;

  constructor(message: string, status?: number, url?: string, data?: unknown) {
    super(message);
    this.status = status;
    this.url = url;
    this.data = data;
    this.name = 'FetchError';
  }
}

async function fetchClient<T = unknown>(
  endpoint: string,
  options: RequestInit & { data?: unknown } = {},
): Promise<T> {
  const { data, ...customOptions } = options;

  let url = endpoint;
  if (!url.startsWith('http')) {
    const baseURL = await getBaseURL();
    if (baseURL) {
      url = `${baseURL.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
    }
  }

  const token = await getToken();
  const headers = new Headers(customOptions.headers);

  if (!headers.has('Content-Type') && !(data instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...customOptions,
    headers,
  };

  if (data) {
    config.body = data instanceof FormData ? data : JSON.stringify(data);
  }

  try {
    const res = await fetch(url, config);

    let resData: unknown = null;
    const text = await res.text();
    if (text) {
      try {
        resData = JSON.parse(text);
      } catch {
        resData = text;
      }
    }

    if (!res.ok) {
      if (isDev) {
        console.log('[API ERR]', res.status, url, res.statusText);
      }

      if (res.status === 401 && _onUnauthorized) {
        await _onUnauthorized();
      }

      throw new FetchError(`Error: ${res.statusText}`, res.status, url, resData);
    }

    if (isDev) {
      console.log('[API RES]', res.status, url, resData);
    }

    return resData as T;
  } catch (error) {
    if (error instanceof FetchError) throw error;

    if (isDev) {
      console.log('[API ERR NETWORK]', url, (error as Error).message);
    }
    throw error;
  }
}

const FetchClient = {
  get: <T = unknown>(url: string, config?: RequestInit) =>
    fetchClient<T>(url, { ...config, method: 'GET' }),

  post: <T = unknown>(url: string, data?: unknown, config?: RequestInit) =>
    fetchClient<T>(url, { ...config, method: 'POST', data }),

  put: <T = unknown>(url: string, data?: unknown, config?: RequestInit) =>
    fetchClient<T>(url, { ...config, method: 'PUT', data }),

  patch: <T = unknown>(url: string, data?: unknown, config?: RequestInit) =>
    fetchClient<T>(url, { ...config, method: 'PATCH', data }),

  delete: <T = unknown>(url: string, config?: RequestInit) =>
    fetchClient<T>(url, { ...config, method: 'DELETE' }),
};

export default FetchClient;
