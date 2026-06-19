import prisma from "prisma/client";
import type { PickUpdateSettings } from "@repo/types/productivity.types";

const DEFAULT_SETTINGS_ID = "default";

class SettingsService {
  private async ensureDefault() {
    const existing = await prisma.settings.findFirst({
      orderBy: { createdAt: "asc" },
    });

    if (existing) return existing;

    return prisma.settings.create({
      data: {
        id: DEFAULT_SETTINGS_ID,
        timeFormat: "24h",
        defaultNotifications: true,
        theme: "system",
      },
    });
  }

  public async get() {
    return this.ensureDefault();
  }

  public async update(input: PickUpdateSettings) {
    const current = await this.ensureDefault();

    return prisma.settings.update({
      where: { id: current.id },
      data: {
        ...(input.timeFormat !== undefined && { timeFormat: input.timeFormat }),
        ...(input.defaultNotifications !== undefined && {
          defaultNotifications: input.defaultNotifications,
        }),
        ...(input.theme !== undefined && { theme: input.theme }),
      },
    });
  }
}

export default new SettingsService();
