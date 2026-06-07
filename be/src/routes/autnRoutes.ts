import Elysia from "elysia";
import AuthController from "@/controllers/AuthController";
import { LoginDto, RegisterDto } from "@/dto/auth.dto";

const authRoutes = new Elysia({ prefix: "/auth", tags: ["Auth"] })
  .post("/register", (c) => AuthController.register(c), {
    body: RegisterDto,
    detail: {
      summary: "Registrasi akun baru",
      description: "Mendaftarkan pengguna baru ke sistem.",
      tags: ["Auth"],
    },
  })
  .post("/login", (c) => AuthController.login(c), {
    body: LoginDto,
    detail: {
      summary: "Login pengguna",
      description: "Autentikasi dengan email dan password, mengembalikan JWT token.",
      tags: ["Auth"],
    },
  })
  .post("/logout", (c) => AuthController.logout(c), {
    detail: {
      summary: "Logout pengguna",
      description: "Membatalkan token aktif. Membutuhkan header Authorization Bearer.",
      tags: ["Auth"],
    },
  });

export default authRoutes;
