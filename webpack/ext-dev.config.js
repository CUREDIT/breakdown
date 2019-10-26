const ExtensionReloader = require('webpack-extension-reloader');
const config = require('./ext.config');

module.exports = {
  ...config,
  mode: 'development',
  plugins: [
    new ExtensionReloader({
      reloadPage: true,
      entries: {
        background: 'background'
      }
    })
  ]
};
