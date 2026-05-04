import type { NextConfig } from 'next';



const nextConfig: NextConfig = {
  output: 'standalone',

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
