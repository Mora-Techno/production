import Elysia from "elysia";
import MusicController from "@/controllers/MusicController";
import { CreatePlaylistDto, PlaylistParamsDto } from "@/dto/music.dto";

const musicRoutes = new Elysia({
  prefix: "/music/playlists",
  tags: ["Music"],
})
  .get("/", (c) => MusicController.list(c), {
    detail: {
      summary: "Daftar playlist musik",
      description:
        "Mengambil daftar URL musik atau playlist yang tersimpan di database.",
      tags: ["Music"],
    },
  })
  .post("/", (c) => MusicController.create(c), {
    body: CreatePlaylistDto,
    detail: {
      summary: "Tambah playlist",
      description: "Menambahkan URL musik baru ke dalam daftar favorit.",
      tags: ["Music"],
    },
  })
  .delete("/:id", (c) => MusicController.remove(c), {
    params: PlaylistParamsDto,
    detail: {
      summary: "Hapus playlist",
      description: "Menghapus referensi musik dari daftar berdasarkan ID.",
      tags: ["Music"],
    },
  });

export default musicRoutes;
