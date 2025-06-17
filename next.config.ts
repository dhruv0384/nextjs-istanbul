import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [
      [
        'swc-plugin-coverage-instrument',
        {
          coverageVariable: '__coverage__',
          compact: false,
          reportLogic: true,
        },
      ],
    ],
  }
};

export default nextConfig;
