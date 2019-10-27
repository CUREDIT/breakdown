const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/chrome/background.ts'
  },
  plugins: [
    new CopyPlugin([
      {
        from: './src/chrome/manifest.json',
        to: '../manifest.json'
      }
    ])
  ]
};
