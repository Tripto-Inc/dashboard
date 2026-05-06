import type { NextConfig } from 'next';
import { version } from './package.json';

const nextConfig: NextConfig = {
  output: 'standalone',

  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  env: {
    version,
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
