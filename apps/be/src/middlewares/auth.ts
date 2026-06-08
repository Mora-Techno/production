import Elysia from 'elysia';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from '@/types/auth.types';

export const verifyToken = () =>
  new Elysia({ name: 'verify-token' }).derive({ as: 'scoped' }, ({ headers, set }) => {
    try {
      const authHeader = headers.authorization;
      const token = authHeader?.split(' ')[1];

      if (!token) {
        set.status = 401;
        throw new Error('Access denied. No token provided.');
      }

      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined in environment variables');
        set.status = 500;
        throw new Error('Server configuration error.');
      }

      const user = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

      return { user };
    } catch (error: unknown) {
      if (error instanceof jwt.TokenExpiredError) {
        set.status = 401;
        throw new Error('Token has expired.');
      }

      if (error instanceof jwt.JsonWebTokenError) {
        set.status = 403;
        throw new Error('Invalid token.');
      }

      if (error instanceof Error) {
        throw error;
      }

      console.error('JWT verification error:', error);
      set.status = 500;
      throw new Error('Token verification failed.');
    }
  });

export const requireCompanyRole = (roles: string[]) =>
  new Elysia({ name: 'require-company-role' }).onBeforeHandle((context: any) => {
    const { user, set } = context;

    if (!user || !roles.includes(user.companyRole)) {
      set.status = 403;
      return 'Akses ditolak. Role tidak sesuai.';
    }
  });
