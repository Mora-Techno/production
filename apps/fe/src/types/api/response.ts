import type { ApiSuccessResponse } from '@repo/types';

export type TResponse<T = unknown> = ApiSuccessResponse<T>;

export type TErrorResponse = {
  message: string;
  statusCode: number;
  error?: unknown;
};
