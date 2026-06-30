export type NotificationStatus = "success" | "failed";

/** Mirror Prisma model `NotificationLog` */
export interface INotificationLog {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  status: NotificationStatus;
  error: string | null;
  createdAt: Date;
}

export type NotificationLog = Pick<
  INotificationLog,
  "id" | "recipient" | "subject" | "body" | "status" | "error"
> & {
  createdAt: string;
};

export type NotificationLogQuery = {
  status?: NotificationStatus;
  limit?: number;
};

export type PickSendNotification = Pick<
  INotificationLog,
  "recipient" | "subject" | "body"
>;
