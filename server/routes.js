var pingtest = require('./controllers/pingtest.js');

module.exports = function (app) {
  app.get('/pingtest', pingtest.get);
};
