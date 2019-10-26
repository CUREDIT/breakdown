module.exports = {
  name: 'curemedya',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/curemedya',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
