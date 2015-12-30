var config = require('../config');

var log = config.logger;

var redis = require('redis');
var redisClient = require('./redis.js');
//var io = require('./io.js');

var CHANNEL_PREFIX = '__keyspace@0__:';

var namespaces = {
  //key: {
  //  clientCount: 0,
  //  namespace: ,
  //}
};

var io;

exports.wrap = function (server) {
  io = require('socket.io')(server);
};

exports.prepare = function (key, callback) {
  if (namespaces[key]) return callback();

  var subscriber = redis.createClient(config.redis);

  subscriber.on('error', function (err) {
    log.error(err, 'subscriber on error');
  });

  var pattern = CHANNEL_PREFIX + key;

  var namespace = io
    .of('/pingtest/' + key)
    .on('connection', function (socket) {
      log.debug('connect');
      namespaces[key].clientCount ++;

      socket.on('disconnect', function () {
        log.debug('disconnect');
        namespaces[key].clientCount --;
        if (namespaces[key].clientCount === 0) {
          subscriber.punsubscribe(pattern);
          delete namespaces[key];
          delete io.nsps['/pingtest/' + key];
        }
      });

    });

  namespaces[key] = {
    clientCount: 0,
    namespace: namespace,
  };

  log.debug(namespaces, 'namespaces');

  subscriber.on('pmessage', function (ptn, channel, message) {
    if (message != 'set') return;

    var key = channel.replace(CHANNEL_PREFIX, '');
    var ptnKey = ptn.replace(CHANNEL_PREFIX, '');

    if (!namespaces[ptnKey]) return;

    redisClient.get(key, function (err, result) {
      if (err) {
        log.error(err);
        return;
      }

      var data = JSON.parse(result);

      namespaces[ptnKey].namespace.emit('tick', data);
    });
  });

  subscriber.on('psubscribe', callback);

  subscriber.psubscribe(pattern);
};
