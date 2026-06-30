import app from './app';
import { connectWithRetry } from './config/databases';
import { verifyMailTransport } from './utils/main.utils';

const port = process.env.PORT ? Number(process.env.PORT) : 5000;
app.listen(port);
console.log(` Elysia running at in port:${port}`);

// Jangan blok server start hanya karena DB/SMTP belum siap.
// Ini penting supaya Swagger (`/docs`) dan health check tetap bisa diakses saat troubleshooting.
void (async () => {
  try {
    await connectWithRetry();
  } catch (err) {
    console.error(' Could not connect to database after retries:', err);
  }

  try {
    await verifyMailTransport();
    console.log(' SMTP connected successfully!');
  } catch (error) {
    console.warn(
      ' SMTP verification failed. Magic link email will not work until SMTP credentials are fixed.',
    );
    console.warn(error instanceof Error ? error.message : 'Unknown SMTP error');
  }
})();
