export type HttpStatusCode =
  | 200
  | 201
  | 202
  | 204
  | 400
  | 401
  | 403
  | 404
  | 409
  | 422
  | 429
  | 500
  | 502
  | 503;

export interface ApiSuccessResponse<T = unknown> {
  message: string;
  data: T;
  statusCode: HttpStatusCode;
}

export interface ApiErrorResponse<E = unknown> {
  message: string;
  statusCode: HttpStatusCode;
  error?: E;
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export type ApiResponse<T = unknown, E = unknown> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse<E>;
