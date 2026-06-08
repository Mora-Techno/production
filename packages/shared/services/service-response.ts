import type { TResponse } from '../types/response.types';

type ServiceResponseOverride = {
  message?: string;
  statusCode?: number;
};

export function toServiceResponse<T>(
  res: TResponse<T>,
  override?: ServiceResponseOverride,
): TResponse<T> {
  return {
    data: res.data,
    message: override?.message ?? res.message,
    statusCode: override?.statusCode ?? res.statusCode,
  };
}
