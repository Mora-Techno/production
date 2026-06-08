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

export type TPagedList<T> = {
  items: T[];
  totalData: number;
  totalPages: number;
};

export type TPagedListResponse<T> = TResponse<TPagedList<T>>;

export type TListResponse<T> = TResponse<T[]>;
