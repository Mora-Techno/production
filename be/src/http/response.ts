export interface ApiSuccessResponse<T = unknown> {
  message: string;
  data: T;
  statusCode: number;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  error?: unknown;
}

export const successResponse = <T>(
  message: string,
  data: T,
  statusCode = 200
): ApiSuccessResponse<T> => ({
  message,
  data,
  statusCode,
});

export const errorResponse = (
  message: string,
  statusCode = 400,
  error?: unknown
): ApiErrorResponse => ({
  message,
  statusCode,
  ...(error !== undefined && { error }),
});
