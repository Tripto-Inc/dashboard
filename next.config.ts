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

  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              dimensions: false,
            },
          },
        ],
        as: '*.js',
      },
    },
  },

  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
