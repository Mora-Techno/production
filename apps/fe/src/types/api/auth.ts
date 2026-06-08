export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  token: string;
}

export interface AuthSession {
  user: AuthUser;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  fullName: string;
  password: string;
  role?: string;
}

export interface AuthLoginData {
  id: string;
  email: string;
  fullName: string;
  role: string;
  token: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}
