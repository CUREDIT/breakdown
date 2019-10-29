const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  plugins: [
    new WebpackShellPlugin({
      onBuildExit: [
        'echo "Moving Popup App Contents..."',
        'pushd ./dist/apps/curemedit/',
        'for f in *; do mv "$f" "curemedit-$f"; done',
        'popd',
        'mv -v ./dist/apps/curemedit/* ./dist/apps/'
      ],
      safe: true
    })
  ]
};
