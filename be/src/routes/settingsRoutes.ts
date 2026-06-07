import Elysia from "elysia";
import SettingsController from "@/controllers/SettingsController";
import { UpdateSettingsDto } from "@/dto/settings.dto";

const settingsRoutes = new Elysia({ prefix: "/settings", tags: ["Settings"] })
  .get("/", (c) => SettingsController.get(c), {
    detail: {
      summary: "Ambil pengaturan",
      description:
        "Mengambil preferensi pengguna seperti format jam (24h/12h) dan notifikasi default.",
      tags: ["Settings"],
    },
  })
  .patch("/", (c) => SettingsController.update(c), {
    body: UpdateSettingsDto,
    detail: {
      summary: "Perbarui pengaturan",
      description: "Memperbarui preferensi UI dan notifikasi pengguna.",
      tags: ["Settings"],
    },
  });

export default settingsRoutes;
