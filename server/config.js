var env = process.env.NODE_ENV || 'deployment';

var bunyan = require('bunyan');

var config = {
  deployment: {
    port: 8000,
    logger: bunyan.createLogger({
      name: 'dashboard',
      src: true,
      level: process.env.NODE_LOG_LEVEL || 'info'
    }),
    redis: {
      host: process.env.DASHBOARD_REDIS_PORT_6379_TCP_ADDR || 'localhost',
      port: 6379
    },
  },
  production: {
    port: 8000,
    logger: bunyan.createLogger({
      name: 'dashboard',
      src: true,
      level: process.env.NODE_LOG_LEVEL || 'info'
    }),
    redis: {
      host: process.env.DASHBOARD_REDIS_PORT_6379_TCP_ADDR || 'localhost',
      port: 6379
    },
  }
};

module.exports = config[env];
