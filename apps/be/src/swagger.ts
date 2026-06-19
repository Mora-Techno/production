import swagger from "@elysiajs/swagger";

const swaggerPlugin = swagger({
  path: "/docs",
  documentation: {
    info: {
      title: "Produtify Workstation API",
      version: "1.0.0",
      description:
        "REST API Produtify Workstation — Company, Workstation, Productivity, dan Wellness.",
    },
    tags: [
      {
        name: "Auth",
        description: "Autentikasi pengguna — register, login, logout",
      },
      {
        name: "Companies",
        description: "Manajemen company, leader, admin, dan langganan tier",
      },
      {
        name: "Workstations",
        description:
          "Manajemen workstation dan invite karyawan (max 4 free / 8 pro)",
      },
      {
        name: "Subscriptions",
        description:
          "Langganan Free/Pro/Enterprise via Stripe (internasional) dan Xendit (Indonesia)",
      },
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
});
export default swaggerPlugin;
