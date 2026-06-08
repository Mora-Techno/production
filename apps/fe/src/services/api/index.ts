import {
  CalendarService,
  CompanyService,
  MusicService,
  NoteService,
  NotificationService,
  SettingsService,
  SubscriptionService,
  TodoService,
  WorkstationService,
} from '@repo/services';

import { AuthApi } from './auth.api';

export const Api = {
  Auth: AuthApi,
  Todo: TodoService,
  Note: NoteService,
  Calendar: CalendarService,
  Music: MusicService,
  Notification: NotificationService,
  Settings: SettingsService,
  Company: CompanyService,
  Workstation: WorkstationService,
  Subscription: SubscriptionService,
};

export { AuthApi } from './auth.api';
export { CalendarService as CalendarApi } from '@repo/services';
export { MusicService as MusicApi } from '@repo/services';
export { NoteService as NoteApi } from '@repo/services';
export { NotificationService as NotificationApi } from '@repo/services';
export { SettingsService as SettingsApi } from '@repo/services';
export { SubscriptionService as SubscriptionApi } from '@repo/services';
export { TodoService as TodoApi } from '@repo/services';

export default Api;
