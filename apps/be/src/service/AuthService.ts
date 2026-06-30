import bcryptjs from 'bcryptjs';
import prisma from 'prisma/client';
import NotificationService from '@/service/NotificationService';
import { AUTH_EXPIRY } from '@/utils/authTokens';
import {
  generateOtp,
  generateSecureToken,
  getMagicLinkExpiry,
  getOtpExpiry,
} from '@/utils/authTokens';
import type {
  AuthSessionResponse,
  PickSendMagicLink,
  PickSendOtp,
  PickVerifyMagicLink,
  PickVerifyOtp,
  SafeAuthUser,
} from '@repo/types/auth.types';
import { createTokenPair, sanitizeUser } from '@/utils/authTokens';

class AuthService {
  constructor() {}
  public async createSession(userOrId: SafeAuthUser | string): Promise<AuthSessionResponse> {
    const user =
      typeof userOrId === 'string'
        ? await prisma.user.findUnique({ where: { id: userOrId } })
        : userOrId;

    if (!user) {
      throw new Error('User tidak ditemukan');
    }

    const tokens = await createTokenPair(user);
    return {
      ...tokens,
      user: sanitizeUser(user),
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

  public async sendMagicLink(input: PickSendMagicLink): Promise<void> {
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

  public async verifyMagicLink(input: PickVerifyMagicLink): Promise<AuthSessionResponse> {
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

  public async sendOtp(input: PickSendOtp): Promise<{ expiresInMinutes: number }> {
    if (!input.email && !input.phone) {
      throw new Error('Email atau nomor telepon wajib diisi');
    }

    const user = await this.findUserByIdentifier({
      email: input.email ?? undefined,
      phone: input.phone ?? undefined,
    });

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

  public async verifyOtp(input: PickVerifyOtp): Promise<AuthSessionResponse> {
    if (!input.email && !input.phone) {
      throw new Error('Email atau nomor telepon wajib diisi');
    }

    const user = await this.findUserByIdentifier({
      email: input.email ?? undefined,
      phone: input.phone ?? undefined,
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

  // public async paychRole(input:);
}

export default new AuthService();
