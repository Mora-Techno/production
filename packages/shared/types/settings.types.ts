/**
 * Belum ada model Prisma — kontrak API untuk fitur settings UI.
 * Pisahkan di file ini agar tidak tercampur dengan domain productivity Prisma.
 */
export type TimeFormat = '24h' | '12h';
export type ThemePreference = 'light' | 'dark' | 'system';

export interface ISettings {
  id: string;
  timeFormat: TimeFormat;
  defaultNotifications: boolean;
  theme: ThemePreference;
  createdAt: Date;
  updatedAt: Date;
}

export type Settings = Pick<ISettings, 'id' | 'timeFormat' | 'defaultNotifications' | 'theme'> & {
  createdAt: string;
  updatedAt: string;
};

export type PickUpdateSettings = Partial<
  Pick<ISettings, 'timeFormat' | 'defaultNotifications' | 'theme'>
>;
