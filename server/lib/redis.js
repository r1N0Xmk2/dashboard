var config = require('../config');

var log = config.logger;

var redis = require('redis');
var client = redis.createClient(config.redis);

client.on("error", function (err) {
  log.error(err, "redis on error");
});

module.exports = client;
