import { randomBytes } from 'node:crypto';

const OTP_EXPIRY_MINUTES = 5;
const MAGIC_LINK_EXPIRY_MINUTES = 15;
const REFRESH_TOKEN_EXPIRY_DAYS = 7;

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateSecureToken(): string {
  return randomBytes(32).toString('hex');
}

export function getOtpExpiry(): Date {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + OTP_EXPIRY_MINUTES);
  return expiry;
}

export function getMagicLinkExpiry(): Date {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + MAGIC_LINK_EXPIRY_MINUTES);
  return expiry;
}

export function getRefreshTokenExpiry(): Date {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);
  return expiry;
}

export const AUTH_EXPIRY = {
  accessToken: '15m',
  refreshTokenDays: REFRESH_TOKEN_EXPIRY_DAYS,
  otpMinutes: OTP_EXPIRY_MINUTES,
  magicLinkMinutes: MAGIC_LINK_EXPIRY_MINUTES,
} as const;
