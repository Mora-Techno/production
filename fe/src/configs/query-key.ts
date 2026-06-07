import type {
  EventQuery,
  NotificationLogQuery,
  TodoQuery,
} from "@/types/api/productivity";

export const queryKey = {
  todosRoot: () => ["todos"] as const,
  todos: {
    list: (filters?: TodoQuery) =>
      ["todos", "list", filters ?? {}] as const,
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
} as const;
