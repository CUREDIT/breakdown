#!/bin/sh

sed -i 's/.js/.curedit.js/g' ./dist/apps/curedit/index.html
sed -i 's/styles.css/styles.curedit.css/g' ./dist/apps/curedit/index.html
sed -i 's/.js/.curemedit.js/g' ./dist/apps/curemedit/index.html
sed -i 's/styles.css/styles.curemedit.css/g' ./dist/apps/curemedit/index.html
