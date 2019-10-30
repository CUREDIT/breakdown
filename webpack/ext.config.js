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
        // Rename sourcemaps, js and css files -> skip chunks -> move them to extension root
        'echo "Moving Options App Contents..."',
        'for f in ./dist/apps/curedit/*.js.map; do mv "$f"  "${f%.js.map}.curedit.js.map"; done ',
        'for f in ./dist/apps/curedit/*.js; do mv "$f"  "${f%.js}.curedit.js"; done ',
        'mv ./dist/apps/curedit/styles.css ./dist/apps/curedit/styles.curedit.css',
        'for f in ./dist/apps/curedit/[0-9].curedit.js; do mv "$f" "${f%.curedit.js}.js"; done ',
        'mv -v ./dist/apps/curedit/* ./dist/apps/'
      ],
      safe: true
    })
  ]
};
