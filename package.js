Package.describe({
  name: 'joseph:ssh',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'SSH client for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/josephnle/meteor-ssh.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.addFiles('joseph:ssh.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('joseph:ssh');
  api.addFiles('joseph:ssh-tests.js');
});
