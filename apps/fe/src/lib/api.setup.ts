import { setBaseURLProvider, setTokenProvider } from '@repo/utils/api';
import { getCookie } from 'cookies-next';

import { env } from '@/configs';
import { APP_SESSION_COOKIE_KEY } from '@/configs/cookies.config';

setBaseURLProvider(() => env.NEXT_PUBLIC_BACKEND_URL);
setTokenProvider(() => {
  const token = getCookie(APP_SESSION_COOKIE_KEY);
  return typeof token === 'string' && token ? token : undefined;
});
