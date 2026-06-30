import {
  AuthService,
  CalendarService,
  CompanyService,
  MusicService,
  NoteService,
  NotificationService,
  SettingsService,
  SubscriptionService,
  TodoService,
  WorkstationService,
} from "@repo/services";

export const Api = {
  Auth: AuthService,
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
