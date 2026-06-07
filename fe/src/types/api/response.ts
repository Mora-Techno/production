export type TResponse<T> = {
  message: string;
  data: T;
  statusCode: number;
};

export type TErrorResponse = {
  message: string;
  statusCode: number;
  error?: unknown;
};
