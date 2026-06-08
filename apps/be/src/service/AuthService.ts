import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from 'prisma/client';
import NotificationService from '@/service/NotificationService';
import { AUTH_EXPIRY } from '@/utils/authTokens';
import {
  generateOtp,
  generateSecureToken,
  getMagicLinkExpiry,
  getOtpExpiry,
  getRefreshTokenExpiry,
} from '@/utils/authTokens';
import type { CompanyRole } from '@/types/company.types';
import type {
  AuthSessionResponse,
  AuthTokensResponse,
  JwtPayload,
  SafeAuthUser,
  SendMagicLinkBody,
  SendOtpBody,
  VerifyMagicLinkBody,
  VerifyOtpBody,
} from '@/types/auth.types';

type UserRecord = {
  id: string;
  email: string;
  phone: string | null;
  fullName: string;
  companyRole: CompanyRole;
  companyId: string | null;
  isVerify: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};

class AuthService {
  private getJwtSecret(): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not set');
    }
    return process.env.JWT_SECRET;
  }

  private sanitizeUser(user: UserRecord): SafeAuthUser {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      companyRole: user.companyRole,
      companyId: user.companyId,
      isVerify: user.isVerify,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private buildPayload(user: UserRecord): JwtPayload {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      companyRole: user.companyRole,
      companyId: user.companyId,
    };
  }

  private signAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.getJwtSecret(), {
      expiresIn: AUTH_EXPIRY.accessToken,
    });
  }

  private async createTokenPair(user: UserRecord): Promise<AuthTokensResponse> {
    const payload = this.buildPayload(user);
    const accessToken = this.signAccessToken(payload);
    const refreshToken = generateSecureToken();
    const hashedRefreshToken = await bcryptjs.hash(refreshToken, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        token: accessToken,
        refreshToken: hashedRefreshToken,
        refreshTokenExpiresAt: getRefreshTokenExpiry(),
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: AUTH_EXPIRY.accessToken,
    };
  }

  public async createSession(userOrId: UserRecord | string): Promise<AuthSessionResponse> {
    const user =
      typeof userOrId === 'string'
        ? await prisma.user.findUnique({ where: { id: userOrId } })
        : userOrId;

    if (!user) {
      throw new Error('User tidak ditemukan');
    }

    const tokens = await this.createTokenPair(user);
    return {
      ...tokens,
      user: this.sanitizeUser(user),
    };
  }

  public async refreshAccessToken(refreshToken: string): Promise<AuthSessionResponse> {
    const users = await prisma.user.findMany({
      where: {
        refreshToken: { not: null },
        refreshTokenExpiresAt: { gt: new Date() },
      },
    });

    let matchedUser: (typeof users)[number] | null = null;

    for (const user of users) {
      if (user.refreshToken && (await bcryptjs.compare(refreshToken, user.refreshToken))) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      throw new Error('Refresh token tidak valid atau sudah kedaluwarsa');
    }

    return this.createSession(matchedUser);
  }

  public async revokeTokens(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        token: null,
        refreshToken: null,
        refreshTokenExpiresAt: null,
      },
    });
  }

  public async sendMagicLink(input: SendMagicLinkBody): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new Error('Akun tidak ditemukan');
    }

    const magicLinkToken = generateSecureToken();
    const magicLinkExpiresAt = getMagicLinkExpiry();

    await prisma.user.update({
      where: { id: user.id },
      data: { magicLinkToken, magicLinkExpiresAt },
    });

    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
    const magicLink = `${frontendUrl}/auth/magic-link?token=${magicLinkToken}`;

    await NotificationService.send({
      recipient: user.email,
      subject: 'Magic Link Login - Mora Workstation',
      body: `Klik link berikut untuk login (berlaku ${AUTH_EXPIRY.magicLinkMinutes} menit):\n\n${magicLink}`,
    });
  }

  public async verifyMagicLink(input: VerifyMagicLinkBody): Promise<AuthSessionResponse> {
    const user = await prisma.user.findFirst({
      where: {
        magicLinkToken: input.token,
        magicLinkExpiresAt: { gt: new Date() },
      },
    });

    if (!user) {
      throw new Error('Magic link tidak valid atau sudah kedaluwarsa');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        magicLinkToken: null,
        magicLinkExpiresAt: null,
        isVerify: true,
      },
    });

    return this.createSession(user);
  }

  private async findUserByIdentifier(input: {
    email?: string;
    phone?: string;
  }) {
    if (input.email) {
      return prisma.user.findUnique({ where: { email: input.email } });
    }

    if (input.phone) {
      return prisma.user.findUnique({ where: { phone: input.phone } });
    }

    return null;
  }

  public async sendOtp(input: SendOtpBody): Promise<{ expiresInMinutes: number }> {
    if (!input.email && !input.phone) {
      throw new Error('Email atau nomor telepon wajib diisi');
    }

    const user = await this.findUserByIdentifier(input);

    if (!user) {
      throw new Error('Akun tidak ditemukan');
    }

    const otp = generateOtp();
    const expOtp = getOtpExpiry();

    await prisma.user.update({
      where: { id: user.id },
      data: { otp, expOtp },
    });

    const recipient = input.email ?? user.email;
    const channel = input.phone ? 'SMS' : 'Email';

    await NotificationService.send({
      recipient,
      subject: 'Kode OTP Login - Mora Workstation',
      body:
        channel === 'SMS'
          ? `Kode OTP Mora Workstation Anda: ${otp}. Berlaku ${AUTH_EXPIRY.otpMinutes} menit.`
          : `Kode OTP Anda: ${otp}\n\nBerlaku selama ${AUTH_EXPIRY.otpMinutes} menit. Jangan bagikan kode ini kepada siapapun.`,
    });

    return { expiresInMinutes: AUTH_EXPIRY.otpMinutes };
  }

  public async verifyOtp(input: VerifyOtpBody): Promise<AuthSessionResponse> {
    if (!input.email && !input.phone) {
      throw new Error('Email atau nomor telepon wajib diisi');
    }

    const user = await this.findUserByIdentifier({
      email: input.email,
      phone: input.phone,
    });

    if (!user) {
      throw new Error('Akun tidak ditemukan');
    }

    if (!user.otp || !user.expOtp) {
      throw new Error('OTP belum diminta atau sudah kedaluwarsa');
    }

    if (user.expOtp < new Date()) {
      throw new Error('OTP sudah kedaluwarsa');
    }

    if (user.otp !== input.otp) {
      throw new Error('Kode OTP tidak valid');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        otp: null,
        expOtp: null,
        isVerify: true,
      },
    });

    return this.createSession(user);
  }
}

export default new AuthService();
