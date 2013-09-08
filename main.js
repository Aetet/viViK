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
app.use(express.cookieParser());
app.use(express.cookieSession({secret: 'greatSecret'}));
//check users cookie and session, authorize
app.use(cookieManager.checkCookie);
//path to static content
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public', 'build')));

//routing
app.get('/:id', function (req, res) {
//  console.log('user', req.session.user);
//  console.log('key', req.cookies.key);
  var id = req.params.id;
  console.log('id', id);
  vkMethods.getWall(id).then(function (result) {
    console.log('%j', result);
    res.send(result);
  }, function (error) {
    res.send(error);
  });
});

//Page not found functionality
app.use(function (req, res, next) {
  res.send('404', "Page not found");
});

//Total error handling
app.use(function (err, req, res, next) {
  res.send(err);
});

http.createServer(app).listen('8080');
