const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: 'apps/curedit/src/chrome/background.ts'
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'apps/curedit/src/chrome/manifest.json',
        to: 'manifest.json'
      }
    ])
  ]
};
