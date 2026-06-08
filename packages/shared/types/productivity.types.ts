export type TodoStatus = 'pending' | 'completed';

export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TodoQuery {
  status?: TodoStatus;
  date?: 'today';
}

export type PickCreateTodo = {
  text: string;
  dueDate?: string;
};

export type PickUpdateTodo = {
  text?: string;
  status?: TodoStatus;
  dueDate?: string | null;
};

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type PickCreateNote = {
  title: string;
  content: string;
};

export type PickUpdateNote = {
  title: string;
  content: string;
};

export interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EventQuery {
  month?: string;
  year?: string;
}

export type PickCreateEvent = {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
};

export type PickUpdateEvent = {
  title?: string;
  description?: string | null;
  startDate?: string;
  endDate?: string | null;
};

export interface MusicPlaylist {
  id: string;
  title: string;
  url: string;
  createdAt: string;
}

export type PickCreatePlaylist = {
  title: string;
  url: string;
};

export type NotificationStatus = 'success' | 'failed';

export interface NotificationLog {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  status: NotificationStatus;
  error: string | null;
  createdAt: string;
}

export interface NotificationLogQuery {
  status?: NotificationStatus;
  limit?: number;
}

export type PickSendNotification = {
  recipient: string;
  subject: string;
  body: string;
};

export type TimeFormat = '24h' | '12h';
export type ThemePreference = 'light' | 'dark' | 'system';

export interface Settings {
  id: string;
  timeFormat: TimeFormat;
  defaultNotifications: boolean;
  theme: ThemePreference;
  createdAt: string;
  updatedAt: string;
}

export type PickUpdateSettings = {
  timeFormat?: TimeFormat;
  defaultNotifications?: boolean;
  theme?: ThemePreference;
};
