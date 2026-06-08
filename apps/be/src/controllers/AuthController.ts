import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { CompanyRole } from '@/types/company.types';
import { errorResponse, successResponse } from '@/http/response';
import type {
  PickRegister,
  PickLogin,
  PickLogout,
  JwtPayload,
  RefreshTokenBody,
  SendMagicLinkBody,
  VerifyMagicLinkBody,
  SendOtpBody,
  VerifyOtpBody,
} from '@/types/auth.types';
import AuthService from '@/service/AuthService';
import prisma from 'prisma/client';

function sanitizeUser(user: {
  id: string;
  email: string;
  phone?: string | null;
  fullName: string;
  companyRole: CompanyRole;
  companyId?: string | null;
  isVerify?: boolean | null;
  password?: string;
  token?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  const { password: _password, token: _token, ...safe } = user;
  return safe;
}

class AuthController {
  public async register(c: any) {
    try {
      const auth: PickRegister = c.body;

      if (!auth.email || !auth.fullName || !auth.password) {
        return c.json(errorResponse('Semua field wajib diisi', 400), 400);
      }

      const isAlreadyRegistered = await prisma.user.findUnique({
        where: { email: auth.email },
      });

      if (isAlreadyRegistered) {
        return c.json(errorResponse('Email sudah terdaftar', 400), 400);
      }

      if (auth.phone) {
        const phoneTaken = await prisma.user.findUnique({
          where: { phone: auth.phone },
        });
        if (phoneTaken) {
          return c.json(errorResponse('Nomor telepon sudah terdaftar', 400), 400);
        }
      }

      const hashedPassword = await bcryptjs.hash(auth.password, 10);

      const newUser = await prisma.user.create({
        data: {
          email: auth.email,
          fullName: auth.fullName,
          password: hashedPassword,
          phone: auth.phone ?? null,
          companyRole: (auth.companyRole ?? 'employee') as CompanyRole,
        },
      });

      return c.json(successResponse('Akun berhasil didaftarkan', sanitizeUser(newUser), 201), 201);
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Terjadi kesalahan server', 500), 500);
    }
  }

  public async login(c: any) {
    try {
      const auth: PickLogin = c.body;

      if (!auth.email || !auth.password) {
        return c.json(errorResponse('Semua field wajib diisi', 400), 400);
      }

      const user = await prisma.user.findUnique({
        where: { email: auth.email },
      });
      if (!user) return c.json(errorResponse('Akun tidak ditemukan', 404), 404);

      const validatePassword = await bcryptjs.compare(auth.password, user.password);
      if (!validatePassword) return c.json(errorResponse('Email atau password salah', 400), 400);

      const session = await AuthService.createSession(user);

      return c.json(successResponse('Login berhasil', session));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Terjadi kesalahan server', 500), 500);
    }
  }

  public async refresh(c: any) {
    try {
      const { refreshToken } = c.body as RefreshTokenBody;

      if (!refreshToken) {
        return c.json(errorResponse('Refresh token wajib diisi', 400), 400);
      }

      const session = await AuthService.refreshAccessToken(refreshToken);
      return c.json(successResponse('Token berhasil diperbarui', session));
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Gagal memperbarui token';
      return c.json(errorResponse(message, 401), 401);
    }
  }

  public async sendMagicLink(c: any) {
    try {
      const body = c.body as SendMagicLinkBody;

      if (!body.email) {
        return c.json(errorResponse('Email wajib diisi', 400), 400);
      }

      await AuthService.sendMagicLink(body);
      return c.json(
        successResponse('Magic link berhasil dikirim ke email', {
          email: body.email,
        }),
      );
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Gagal mengirim magic link';
      return c.json(errorResponse(message, 400), 400);
    }
  }

  public async verifyMagicLink(c: any) {
    try {
      const body = c.body as VerifyMagicLinkBody;

      if (!body.token) {
        return c.json(errorResponse('Token wajib diisi', 400), 400);
      }

      const session = await AuthService.verifyMagicLink(body);
      return c.json(successResponse('Magic link berhasil diverifikasi', session));
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Magic link tidak valid';
      return c.json(errorResponse(message, 401), 401);
    }
  }

  public async sendOtp(c: any) {
    try {
      const body = c.body as SendOtpBody;

      if (!body.email && !body.phone) {
        return c.json(errorResponse('Email atau nomor telepon wajib diisi', 400), 400);
      }

      const result = await AuthService.sendOtp(body);
      return c.json(
        successResponse('OTP berhasil dikirim', {
          ...result,
          sentTo: body.phone ? 'phone' : 'email',
        }),
      );
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Gagal mengirim OTP';
      return c.json(errorResponse(message, 400), 400);
    }
  }

  public async verifyOtp(c: any) {
    try {
      const body = c.body as VerifyOtpBody;

      if (!body.email && !body.phone) {
        return c.json(errorResponse('Email atau nomor telepon wajib diisi', 400), 400);
      }

      if (!body.otp) {
        return c.json(errorResponse('OTP wajib diisi', 400), 400);
      }

      const session = await AuthService.verifyOtp(body);
      return c.json(successResponse('OTP berhasil diverifikasi', session));
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'OTP tidak valid';
      return c.json(errorResponse(message, 401), 401);
    }
  }

  public async logout(c: any) {
    try {
      const authHeader = c.request.headers.get('authorization');
      const token = authHeader?.split(' ')[1];

      if (!token) {
        return c.json(errorResponse('Token tidak ditemukan', 401), 401);
      }

      if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      const { id }: PickLogout = decoded;

      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) return c.json(errorResponse('Akun tidak ditemukan', 404), 404);

      await AuthService.revokeTokens(id);
      return c.json(successResponse('Logout berhasil', null));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse('Token tidak valid', 401), 401);
    }
  }
}

export default new AuthController();
