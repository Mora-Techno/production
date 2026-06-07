import { TodoApi } from "./todo.api";
import { NoteApi } from "./note.api";
import { CalendarApi } from "./calendar.api";
import { MusicApi } from "./music.api";
import { NotificationApi } from "./notification.api";
import { SettingsApi } from "./settings.api";

export const Api = {
  Todo: TodoApi,
  Note: NoteApi,
  Calendar: CalendarApi,
  Music: MusicApi,
  Notification: NotificationApi,
  Settings: SettingsApi,
};

export default Api;
