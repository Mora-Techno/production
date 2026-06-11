import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES } from "@/configs/app.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://mora.my.id";

  return PUBLIC_ROUTES.filter(
    (route) => route !== "/login" && route !== "/register",
  ).map((route) => ({
    url: `${baseUrl}${route === "/" ? "/home" : route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/home" || route === "/" ? 1 : 0.8,
  }));
}
