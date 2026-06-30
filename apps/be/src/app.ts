import Elysia from 'elysia';
import cors from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';
import apiRoutes from './routes/apiRoutes';
import swaggerPlugin from './swagger';

const app = new Elysia()
  .use(
    helmet({
      // Swagger UI (Scalar) butuh script/style inline.
      contentSecurityPolicy: false,
    }),
  )
  .use(cors({ origin: '*' }))
  .get('/', () => 'Hello Elysia! Bun js')
  .use(apiRoutes)
  // Swagger harus setelah semua route agar OpenAPI spec ter-generate lengkap.
  .use(swaggerPlugin);

export default app;
