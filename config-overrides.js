const { injectBabelPlugin } = require('react-app-rewired');

const rootImportConfig = [
  'module-resolver',
  {
    root: ['./'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@assets': './assets',
      '@screens': './src/screens',
      '@components': './src/components',
      '@helpers': './src/helpers',
      '@hooks': './src/hooks',
      '@routes': './src/routes',
      '@services': './src/services',
      '@styles': './src/styles',
      '@utils': './src/utils',
    },
  },
];

module.exports = config => injectBabelPlugin(rootImportConfig, config);
