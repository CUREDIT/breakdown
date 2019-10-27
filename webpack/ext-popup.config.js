const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: [
        'echo "Files at end of compilation: "',
        'ls ./dist/apps/curemedit/'
      ],
      onBuildExit: [
        'echo "Copying Popup App..."',
        'ls ./dist/apps/curemedit/',
        'cp -rvf ./dist/apps/curemedit/* ./dist/apps/'
      ],
      safe: true
    })
  ]
};
