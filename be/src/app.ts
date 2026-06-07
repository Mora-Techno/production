import Elysia from "elysia";
import cors from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { helmet } from "elysia-helmet";
import autnRoutes from "./routes/autnRoutes";
import apiRoutes from "./routes/apiRoutes";

class App {
  public app: Elysia;

  constructor() {
    this.app = new Elysia();
    this.middlewares();
    this.routes();
  }

  private routes(): void {
    this.app.get("/", () => "Hello Elysia! Bun js");
  }

  private middlewares() {
    this.app.use(helmet());
    this.app.use(
      swagger({
        documentation: {
          info: {
            title: "PWA Produktivitas API",
            version: "1.0.0",
            description:
              "REST API untuk fitur PWA Produktivitas — Todo, Notes, Kalender, Musik, Notifikasi, dan Pengaturan.",
          },
          tags: [
            {
              name: "Todos",
              description: "Manajemen tugas harian dan tenggat waktu",
            },
            {
              name: "Notes",
              description: "Pencatatan ide, jurnal, dan snippet",
            },
            {
              name: "Calendar",
              description: "Penjadwalan agenda dan event kalender",
            },
            {
              name: "Music",
              description: "Referensi URL musik dan playlist fokus",
            },
            {
              name: "Notifications",
              description: "Pengiriman email reminder via SMTP",
            },
            {
              name: "Settings",
              description: "Preferensi UI dan notifikasi pengguna",
            },
          ],
        },
        path: "/swagger",
      })
    );
    this.app.use(cors({ origin: "*" }));
    this.app.use(autnRoutes);
    this.app.use(apiRoutes);
  }
}

export default new App().app;
