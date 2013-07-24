var http = require('http');
var url = require('url');
var vkMethods = require('./vkMethods');

//here must be MVC or MVP?
http.createServer(function (req, res) {
  var urlParsed = url.parse(req.url, true);
  switch (urlParsed.pathname) {
    case '/vk':
      vkMethods.getWall(req, res);
      break;
    default :
      res.statusCode = 404;
      res.end("go to http://localhost:8080/vk?uid=1 for example");
      break;
  }
}).listen(8080, 'localhost');