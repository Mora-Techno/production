import { t } from 'elysia';

export const UpdateSettingsDto = t.Object({
  timeFormat: t.Optional(
    t.Union([t.Literal('24h'), t.Literal('12h')], {
      description: 'Format tampilan jam',
    }),
  ),
  defaultNotifications: t.Optional(t.Boolean({ description: 'Preferensi notifikasi default' })),
  theme: t.Optional(
    t.Union([t.Literal('light'), t.Literal('dark'), t.Literal('system')], {
      description: 'Tema tampilan UI',
    }),
  ),
});
