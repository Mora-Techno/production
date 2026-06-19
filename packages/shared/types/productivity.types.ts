export type TodoStatus = "pending" | "completed";

export interface ITodo {
  id: string;
  text: string;
  status: TodoStatus;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type Todo = Pick<ITodo, "id" | "text" | "status"> & {
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface TodoQuery {
  status?: TodoStatus;
  date?: "today";
}

export type PickCreateTodo = Pick<ITodo, "text"> & {
  dueDate?: string;
};

export type PickUpdateTodo = Partial<Pick<ITodo, "text" | "status">> & {
  dueDate?: string | null;
};

export type TodoParams = Pick<ITodo, "id">;

export interface INote {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Note = Pick<INote, "id" | "title" | "content"> & {
  createdAt: string;
  updatedAt: string;
};

export type PickCreateNote = Pick<INote, "title" | "content">;
export type PickUpdateNote = Pick<INote, "title" | "content">;
export type NoteParams = Pick<INote, "id">;

export interface ICalendarEvent {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CalendarEvent = Pick<
  ICalendarEvent,
  "id" | "title" | "description"
> & {
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface EventQuery {
  month?: string;
  year?: string;
}

export type PickCreateEvent = Pick<ICalendarEvent, "title" | "description"> & {
  startDate: string;
  endDate?: string;
};

export type PickUpdateEvent = Partial<
  Pick<ICalendarEvent, "title" | "description" | "startDate" | "endDate">
> & {
  startDate?: string;
  endDate?: string | null;
};

export type EventParams = Pick<ICalendarEvent, "id">;

export interface IMusicPlaylist {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
}

export type MusicPlaylist = Pick<IMusicPlaylist, "id" | "title" | "url"> & {
  createdAt: string;
};

export type PickCreatePlaylist = Pick<IMusicPlaylist, "title" | "url">;
export type PlaylistParams = Pick<IMusicPlaylist, "id">;

export type NotificationStatus = "success" | "failed";

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

export interface NotificationLogQuery {
  status?: NotificationStatus;
  limit?: number;
}

export type PickSendNotification = Pick<
  INotificationLog,
  "recipient" | "subject" | "body"
>;

export type TimeFormat = "24h" | "12h";
export type ThemePreference = "light" | "dark" | "system";

export interface ISettings {
  id: string;
  timeFormat: TimeFormat;
  defaultNotifications: boolean;
  theme: ThemePreference;
  createdAt: Date;
  updatedAt: Date;
}

export type Settings = Pick<
  ISettings,
  "id" | "timeFormat" | "defaultNotifications" | "theme"
> & {
  createdAt: string;
  updatedAt: string;
};

export type PickUpdateSettings = Partial<
  Pick<ISettings, "timeFormat" | "defaultNotifications" | "theme">
>;
