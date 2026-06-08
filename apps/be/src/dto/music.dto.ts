import { t } from 'elysia';

export const CreatePlaylistDto = t.Object({
  title: t.String({ minLength: 1, description: 'Nama playlist' }),
  url: t.String({ format: 'uri', description: 'URL musik atau playlist' }),
});

export const PlaylistParamsDto = t.Object({
  id: t.String({ format: 'uuid', description: 'ID playlist' }),
});
