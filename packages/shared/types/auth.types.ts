import type { CompanyRole } from './company.types';

export interface SafeAuthUser {
  id: string;
  email: string;
  phone: string | null;
  fullName: string;
  companyRole: CompanyRole;
  companyId: string | null;
  isVerify: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokensResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface AuthSessionResponse extends AuthTokensResponse {
  user: SafeAuthUser;
}

export type PickLogin = {
  email: string;
  password: string;
};

export type PickRegister = {
  email: string;
  fullName: string;
  password: string;
  phone?: string;
  companyRole?: CompanyRole;
};

export type PickRefreshToken = {
  refreshToken: string;
};

export type PickSendMagicLink = {
  email: string;
};

export type PickVerifyMagicLink = {
  token: string;
};

export type PickSendOtp = {
  email?: string;
  phone?: string;
};

export type PickVerifyOtp = {
  email?: string;
  phone?: string;
  otp: string;
};
