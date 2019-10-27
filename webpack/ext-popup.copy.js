const fs = require('fs-extra');

const src = './dist/apps/curemedit/*';
const dest = './dist/apps/';

fs.move(src, dest, err => {
  if (err) {
    return console.error('Popup move error: ', err);
  }
  console.log('Popup moved to ' + dest);
});
