var config = require('./config.js');

var log = config.logger;

var express = require('express');
var bodyParser = require('body-parser');

var cors = require('./middlewares/cors');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

require('./routes.js')(app);

app.use(function (err, req, res, next) {
  log.error(err.stack);
  res.status(500).send(err);
});

var server = require('http').Server(app);
module.exports = server;
