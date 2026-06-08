export type NotificationLogStatus = 'success' | 'failed';

export interface SendNotificationBody {
  recipient: string;
  subject: string;
  body: string;
}

export interface NotificationLogQuery {
  status?: NotificationLogStatus;
  limit?: number;
}
