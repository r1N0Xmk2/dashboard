var config = require('./config.js');
var server = require('./express.js');

require('./lib/namespaces.js').wrap(server);

server.listen(config.port, function () {
  console.log('Listening on', config.port);
});
