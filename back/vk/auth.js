var http = require('http')
  , https = require('https')
  , url = require('url');

/**
 * app details
 * @type {number}
 */
var client_id = 3750804
  , scope = 3
  , client_secret = '33gSPoq4u0I3awttClRl';

var redirectBackURL = (function () {
  var UrlParams = {
    protocol: 'http',
    hostname: 'localhost',
    port: '8080',
    pathname: '/auth'
  };
  return url.format(UrlParams);
})();

/**
 * Redirect to authorize user in vk
 * @param req
 * @param res
 */
function redirectToAuthInVK(req, res) {
  var queryParams = {
    client_id: client_id,
    scope: scope,
    redirect_uri: redirectBackURL,
    response_type: 'code'
  };
  var urlObject = {
    protocol: 'https:',
    hostname: 'oauth.vk.com',
    pathname: '/authorize',
    query: queryParams
  };
  console.log(url.format(urlObject));
  res.redirect(url.format(urlObject));
};

/**
 * method for get access_token for given user
 * @param req
 * @param res
 */
function getToken(req, res, callback) {
  var queryParams = {
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirectBackURL,
    code: req.query.code
  };
  var urlObject = {
    protocol: 'https:',
    hostname: 'oauth.vk.com',
    pathname: '/access_token',
    query: queryParams
  };
  var vkUrl = url.format(urlObject);
  getTokenRequest(vkUrl, function (status, result) {
    callback(status, result);
  });
}

/**
 * request to VK to get access_token
 * @param url
 * @param callback The first parameter will contain the http status code of get request (200 if success),
 *  second parameter - request result (json object)
 */
function getTokenRequest(url, callback) {

  var rq = https.get(url, function (rs) {
    var result = '';
    rs.on('data', function (chunk) {
      result += chunk;
    });
    rs.on('end', function () {
      var obj = JSON.parse(result);
      callback(rs.statusCode, obj);
    });
  });
  rq.on('error', function (e) {
    console.log(e.message);
    throw e;
  });
}

/**
 * VK auth
 * @param req
 * @param res
 * @param callback
 */
exports.auth = function (req, res, callback) {
  if ('/auth' === req.path && req.query.code) {
    console.log('getToken');
    getToken(req, res , callback);
  } else {
    console.log('redirect');
    redirectToAuthInVK(req, res);
  }
};
