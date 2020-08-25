module.exports = {
  root: true,
  extends: '../../config/eslint.config.js',
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
