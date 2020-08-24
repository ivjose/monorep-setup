// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path');

const workspace = join(__dirname, '..');

module.exports = {
  poweredByHeader: false,
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'my-build-id';
  },
  webpack: (config, options) => {
    /** Allows import modules from packages in workspace. */
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [workspace],
          exclude: /node_modules/,
          use: options.defaultLoaders.babel,
        },
      ],
    };

    return config;
  },
};
