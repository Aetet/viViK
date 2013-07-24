var http = require('http');
var events = require('events');
var qs = require('querystring');
var util = require('util');

function VK(){

  var self = this;

  self.request = function (method, params){
    var queryString = qs.stringify(params);
    var jsonResponse={};
    var options = {
      host: 'api.vk.com',
      path: '/method/'+method+queryString
    };
    var req = http.get(options, function (res) {
      var result = '';
      res.on('data', function (chunk) {
        result += chunk;
      });
      res.on('end', function () {
        jsonResponse = JSON.parse(result);
        self.emit(method, jsonResponse);
      });
    });
    req.on('error', function (e) {
      console.log(e.message);
      jsonResponse = {error: 'vk api error'};
      self.emit(method, jsonResponse);
    });
  }
}

util.inherits(VK, events.EventEmitter);
module.exports = VK;



