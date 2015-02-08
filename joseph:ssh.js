// Write your package code here!
var SSHClient = Npm.require('ssh2').Client;

SSH = {};

SSH.exec = function(cmd, creds) {
  if (!(typeof cmd == 'string' || cmd instanceof String))
    return Meteor.log.error('SSH::exec - Unable to execute: Command is not a string.');

  if (typeof creds === 'undefined')
    return Meteor.log.error('SSH::exec - Unable to execute: No credentials specified');

  // Create client instance
  var conn = new SSHClient();

  conn.on('ready', function() {
    Meteor.log.info('SSH::exec - Connection opened to ' + creds.host);

    // Execute command
    conn.exec(cmd, function(err, stream) {
      if (err) return Meteor.log.error(err);

      Meteor.log.debug('SSH::exec - Attempting to execute: ' + cmd);

      stream.on('close', function(code, signal) {
        Meteor.log.info('SSH: Connection to ' + creds.host + ' closed.');
      }).on('data', function(data) {
        Meteor.log.debug('SSH::exec - STDOUT: ' + data);
      }).stderr.on('data', function(data) {
          Meteor.log.warning('SSH::exec - STDOUT: ' + data);
        });
    })

  }).connect(creds);
};
