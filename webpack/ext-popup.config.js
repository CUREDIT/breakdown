const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  plugins: [
    new WebpackShellPlugin({
      onBuildExit: [
        'echo "Moving Popup App Contents..."',
        'for f in ./dist/apps/curemedit/*.js.map; do mv "$f"  "${f%.js.map}.curemedit.js.map"; done ',
        'for f in ./dist/apps/curemedit/*.js; do mv "$f"  "${f%.js}.curemedit.js"; done ',
        'mv ./dist/apps/curemedit/styles.css ./dist/apps/curemedit/styles.curemedit.css',
        'mv -v ./dist/apps/curemedit/* ./dist/apps/'
      ],
      safe: true
    })
  ]
};
