export type { TResponse } from '@/types/api/response';

export type TPagedList<T> = {
  items: T[];
  totalData: number;
  totalPages: number;
};

export type TPagedListResponse<T> = import('@/types/api/response').TResponse<TPagedList<T>>;

export type TListResponse<T> = import('@/types/api/response').TResponse<T[]>;
