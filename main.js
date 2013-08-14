var express = require('express'),
  http = require('http'),
  path = require('path'),
  cookieManager = require('./back/cookieManager'),
  vkMethods = require('./back/vk/vkMethods');

var app = express();

//favicon.ico path
//app.use(express.favicon(__dirname +'/favicon.ico'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({secret: 'greatSecret'}));

//check users cookie and session, authorize
app.use(cookieManager.checkCookie);
//path to static content
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

//routing
app.get('/:id', function (req, res) {
  console.log(req.session.user);
  console.log(req.cookies.key);
  var id = req.params.id;
  console.log(id);
  vkMethods.getWall(id, function (result) {
    console.log( '%j' ,result);
    res.send(result);
  });
});

//Page not found functionality
app.use(function (req, res, next) {
  res.send('404', "Page not found");
});

//Total error handling
app.use(function (err, req, res, next) {
  res.send('app error');
});

http.createServer(app).listen('8080');