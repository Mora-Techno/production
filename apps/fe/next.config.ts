import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo'],
  redirects: async () => {
    return [
      {
        source: '/',
        destination: process.env.NEXT_PUBLIC_BASEPATH || '/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
