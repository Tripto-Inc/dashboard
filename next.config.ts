import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development' ? true : false,
  },
};

export default nextConfig;
