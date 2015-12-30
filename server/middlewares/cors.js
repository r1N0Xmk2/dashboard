module.exports = function () {
  return cors;
};

var cors = function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // OPTIONS
  //res.header("Access-Control-Allow-Headers", "Session-Id, content-type, ts-session-id"); // content-type come from angular resource

  // allow all 'OPTIONS' request
  if (req.method == 'OPTIONS') {
    return res.status(200).send();
  } else {
    return next();
  }
};
