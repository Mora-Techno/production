export type TimeFormat = '24h' | '12h';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface UpdateSettingsBody {
  timeFormat?: TimeFormat;
  defaultNotifications?: boolean;
  theme?: ThemeMode;
}
