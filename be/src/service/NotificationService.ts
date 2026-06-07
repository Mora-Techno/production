import nodemailer from "nodemailer";
import { NotificationStatus } from "@prisma/client";
import prisma from "prisma/client";

interface SendNotificationInput {
  recipient: string;
  subject: string;
  body: string;
}

interface ListLogsQuery {
  status?: "success" | "failed";
  limit?: number;
}

class NotificationService {
  private createTransporter() {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT
      ? Number(process.env.SMTP_PORT)
      : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === "true";

    if (!host || !user || !pass) {
      throw new Error("Konfigurasi SMTP belum lengkap");
    }

    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }

  public async send(input: SendNotificationInput) {
    let status: NotificationStatus = "success";
    let errorMessage: string | null = null;

    try {
      const transporter = this.createTransporter();
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: input.recipient,
        subject: input.subject,
        text: input.body,
        html: `<p>${input.body.replace(/\n/g, "<br>")}</p>`,
      });
    } catch (error) {
      status = "failed";
      errorMessage =
        error instanceof Error ? error.message : "Gagal mengirim email";
    }

    const log = await prisma.notificationLog.create({
      data: {
        recipient: input.recipient,
        subject: input.subject,
        body: input.body,
        status,
        error: errorMessage,
      },
    });

    if (status === "failed") {
      throw new Error(errorMessage ?? "Gagal mengirim email");
    }

    return log;
  }

  public async listLogs(query: ListLogsQuery) {
    const limit = query.limit ?? 20;

    return prisma.notificationLog.findMany({
      where: query.status ? { status: query.status } : undefined,
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }
}

export default new NotificationService();
