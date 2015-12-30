var redis = require('../lib/redis.js');
var namespaces = require('../lib/namespaces.js');

exports.get = function (req, res, next) {
  redis.eval("local keys = redis.call('keys', ARGV[1]); if table.getn(keys) == 0 then return {} else return redis.call('mget', unpack(keys)) end", 0, req.query.key, function (err, result) {
    if (err) return next(err);

    var since = Number(req.query.since);
    if (since < 0) {
      since = Date.now() + since;
    }

    var data = result.map(JSON.parse).filter(function (d) {
      return d.Timestamp > since;
    }).sort(function (d1, d2) {
      return d1.Timestamp - d2.Timestamp;
    });

    data = fill(data, since, Number(req.query.duration));

    namespaces.prepare(req.query.key, function () {
      res.status(200).send(data);
    });
  });
};

function fill (data, since, duration) {
  if (data.length === 0) {
    data.push({
      Timestamp: Date.now(),
      AvgResponseTime: 0,
      Avaliable: 0,
    });
  }

  while (data[0].Timestamp > (since + duration)) {
    data.unshift({
      Timestamp: data[0].Timestamp - duration,
      AvgResponseTime: 0,
      Avaliable: 0,
    });
  }

  var now = Date.now();
  while (data[data.length - 1].Timestamp < (now - duration)) {
    data.push({
      Timestamp: data[data.length - 1].Timestamp + duration,
      AvgResponseTime: 0,
      Avaliable: 0,
    });
  }
  return data;
}

//function compact(data, duration, since) {
  //var compactedData = [];
  //var responseTimeCount = 0;
  //var responseTimeSum = 0;
  //var index = 0;
  //var start = data[0].Timestamp;
  //var end = data[data.length-1].Timestamp;
  //for (t = start + duration; t <= end; t += duration) {
    //while (data[index].Timestamp < t) {
      //responseTimeSum += data[index].ResponseTime;
      //responseTimeCount++;
      //index++;
    //}
    //compactedData.push({Timestamp: t, ResponseTime: responseTimeSum/responseTimeCount});
    //responseTimeCount = 0;
    //responseTimeSum = 0;
  //}
  //return compactedData;
//}
