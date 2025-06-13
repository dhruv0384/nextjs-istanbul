import type { NextConfig } from 'next';
import { Configuration } from 'webpack';
import fs from 'fs';

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
  },

  webpack(config: Configuration, { isServer }) {
    if (!isServer) {
      config.plugins?.push({
        apply: (compiler) => {
          compiler.hooks.done.tap('CustomStatsPlugin', (stats) => {
            const jsonStats = stats.toJson({
              all: false,
              assets: true,
              entrypoints: true,
              chunks: true,
              chunkModules: true,
              modules: true,
              reasons: true,
              usedExports: true,
              dependentModules: true,
            });

            fs.writeFileSync('./stats.json', JSON.stringify(jsonStats, null, 2));
          });
        },
      });
    }

    return config;
  },
};

export default nextConfig;
