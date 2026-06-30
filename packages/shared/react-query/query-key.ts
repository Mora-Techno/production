import type { EventQuery } from "../types/calendar.types";
import type { NotificationLogQuery } from "../types/notification.types";
import type { TodoQuery } from "../types/todo.types";

export const queryKey = {
  todosRoot: () => ["todos"] as const,
  todos: {
    list: (filters?: TodoQuery) => ["todos", "list", filters ?? {}] as const,
  },

  notesRoot: () => ["notes"] as const,
  notes: {
    list: () => ["notes", "list"] as const,
    detail: (id: string) => ["notes", "detail", id] as const,
  },

  calendarRoot: () => ["calendar", "events"] as const,
  calendar: {
    list: (query?: EventQuery) =>
      ["calendar", "events", "list", query ?? {}] as const,
  },

  musicRoot: () => ["music", "playlists"] as const,
  music: {
    list: () => ["music", "playlists", "list"] as const,
  },

  notificationsRoot: () => ["notifications"] as const,
  notifications: {
    logs: (query?: NotificationLogQuery) =>
      ["notifications", "logs", query ?? {}] as const,
  },

  settingsRoot: () => ["settings"] as const,
  settings: {
    detail: () => ["settings", "detail"] as const,
  },

  subscriptionsRoot: () => ["subscriptions"] as const,
  subscriptions: {
    plans: () => ["subscriptions", "plans"] as const,
    me: () => ["subscriptions", "me"] as const,
  },
} as const;
