const CopyPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

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
    ]),
    new WebpackShellPlugin({
      onBuildExit: [
        'echo "Moving Options App Contents..."',
        'pushd ./dist/apps/curedit/',
        'for f in *; do mv "$f" "curedit-$f"; done',
        'popd',
        'mv -v ./dist/apps/curedit/* ./dist/apps/'
      ],
      safe: true
    })
  ]
};
