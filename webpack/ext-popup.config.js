const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  plugins: [
    new WebpackShellPlugin({
      onBuildExit: [
        'echo "Moving Popup App Contents..."',
        'mv -v ./dist/apps/curemedit/* ./dist/apps/'
      ],
      safe: true
    })
  ]
};
