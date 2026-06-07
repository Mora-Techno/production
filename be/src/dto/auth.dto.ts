import { t } from "elysia";

export const LoginDto = t.Object({
  email: t.String({ format: "email", description: "Email pengguna" }),
  password: t.String({ minLength: 6, description: "Password" }),
});

export const RegisterDto = t.Object({
  email: t.String({ format: "email", description: "Email pengguna" }),
  fullName: t.String({ minLength: 1, description: "Nama lengkap" }),
  password: t.String({ minLength: 6, description: "Password" }),
  role: t.Optional(t.String({ description: "Role pengguna (default: user)" })),
});
