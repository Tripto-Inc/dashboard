import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  productionBrowserSourceMaps: true, // 👈 enable source maps in production

  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },

  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
