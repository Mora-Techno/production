import { AuthService } from './auth.service';
import { CalendarService } from './calendar.service';
import { CompanyService } from './company.service';
import { MusicService } from './music.service';
import { NoteService } from './note.service';
import { NotificationService } from './notification.service';
import { SettingsService } from './settings.service';
import { SubscriptionService } from './subscription.service';
import { TodoService } from './todo.service';
import { WorkstationService } from './workstation.service';

export {
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
};

export * from './auth.service';
export * from './calendar.service';
export * from './company.service';
export * from './music.service';
export * from './note.service';
export * from './notification.service';
export * from './settings.service';
export * from './subscription.service';
export * from './todo.service';
export * from './workstation.service';
export * from './http';
export { toServiceResponse } from './service-response';

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

export default Api;
