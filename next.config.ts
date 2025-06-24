import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [
      [
        'swc-plugin-coverage-instrument',
        {
          coverageVariable: '__coverage__',
          unstableExclude: ["**/node_modules/**"]
        },
      ],
    ],
  },
};

export default nextConfig;
