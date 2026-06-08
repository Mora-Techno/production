import type { CompanyRole } from './company.types';

export interface Auth {
  id: string;
  email: string;
  phone?: string | null;
  fullName: string;
  password: string;
  token?: string;
  companyRole: CompanyRole;
  companyId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  otp?: string;
  expOtp?: Date;
  isVerify?: boolean;
}

export type JwtPayload = Pick<Auth, 'id' | 'email' | 'companyRole' | 'fullName' | 'companyId'>;

export type PickRegister = Pick<Auth, 'email' | 'fullName' | 'password' | 'companyRole' | 'phone'>;

export type PickLogin = Pick<Auth, 'email' | 'password'>;
export type PickLogout = Pick<Auth, 'id'>;

export interface AuthTokensResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface RefreshTokenBody {
  refreshToken: string;
}

export interface SendMagicLinkBody {
  email: string;
}

export interface VerifyMagicLinkBody {
  token: string;
}

export interface SendOtpBody {
  email?: string;
  phone?: string;
}

export interface VerifyOtpBody {
  email?: string;
  phone?: string;
  otp: string;
}

export interface SafeAuthUser {
  id: string;
  email: string;
  phone: string | null;
  fullName: string;
  companyRole: string;
  companyId: string | null;
  isVerify: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSessionResponse extends AuthTokensResponse {
  user: SafeAuthUser;
}
