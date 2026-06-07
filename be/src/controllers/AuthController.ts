import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "@/http/response";
import {
  PickRegister,
  PickLogin,
  PickLogout,
  JwtPayload,
} from "@/types/auth.types";
import prisma from "prisma/client";

function sanitizeUser(user: {
  id: string;
  email: string;
  fullName: string;
  role: string;
  password?: string;
  token?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  const { password: _password, ...safe } = user;
  return safe;
}

class AuthController {
  public async register(c: any) {
    try {
      const auth: PickRegister = c.body;

      if (!auth.email || !auth.fullName || !auth.password) {
        return c.json(errorResponse("Semua field wajib diisi", 400), 400);
      }

      const isAlreadyRegistered = await prisma.user.findUnique({
        where: { email: auth.email },
      });

      if (isAlreadyRegistered) {
        return c.json(errorResponse("Email sudah terdaftar", 400), 400);
      }

      const hashedPassword = await bcryptjs.hash(auth.password, 10);

      const newUser = await prisma.user.create({
        data: {
          email: auth.email,
          fullName: auth.fullName,
          password: hashedPassword,
          role: auth.role || "user",
        },
      });

      return c.json(
        successResponse(
          "Akun berhasil didaftarkan",
          sanitizeUser(newUser),
          201
        ),
        201
      );
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Terjadi kesalahan server", 500), 500);
    }
  }

  public async login(c: any) {
    try {
      const auth: PickLogin = c.body;

      if (!auth.email || !auth.password) {
        return c.json(errorResponse("Semua field wajib diisi", 400), 400);
      }

      const user = await prisma.user.findUnique({
        where: { email: auth.email },
      });
      if (!user)
        return c.json(errorResponse("Akun tidak ditemukan", 404), 404);

      const validatePassword = await bcryptjs.compare(
        auth.password,
        user.password
      );
      if (!validatePassword)
        return c.json(errorResponse("Email atau password salah", 400), 400);

      const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      };
      if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      await prisma.user.update({ where: { id: user.id }, data: { token } });

      return c.json(
        successResponse("Login berhasil", { ...sanitizeUser(user), token })
      );
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Terjadi kesalahan server", 500), 500);
    }
  }

  public async logout(c: any) {
    try {
      const authHeader = c.request.headers.get("authorization");
      const token = authHeader?.split(" ")[1];

      if (!token) {
        return c.json(errorResponse("Token tidak ditemukan", 401), 401);
      }

      if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");

      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      const { id }: PickLogout = decoded;

      const user = await prisma.user.findUnique({ where: { id } });
      if (!user)
        return c.json(errorResponse("Akun tidak ditemukan", 404), 404);

      await prisma.user.update({ where: { id }, data: { token: null } });
      return c.json(successResponse("Logout berhasil", null));
    } catch (error) {
      console.error(error);
      return c.json(errorResponse("Token tidak valid", 401), 401);
    }
  }
}

export default new AuthController();
