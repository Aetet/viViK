var http = require('http')
  , qs = require('querystring')
  , Deferred = require('../util/deferred');


exports.request = function (method, params){

  var queryString = qs.stringify(params);
  var options = {
    host: 'api.vk.com',
    path: '/method/' + method + queryString
  };
  var deferred = new Deferred();
  var req = http.get(options, function (res) {
    var result = '';
    res.on('data', function (chunk) {
      result += chunk;
    });
    res.on('end', function () {
      var jsonResponse = JSON.parse(result);
      deferred.resolve(jsonResponse);
    });
  });
  req.on('error', function (e) {
    deferred.reject(e);
  });
  return deferred.promise;
};


