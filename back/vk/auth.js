var http = require('http')
  , https = require('https')
  , url = require('url')
  , Deferred = require('../util/deferred');

/**
 * app details
 * TODO find out scope
 * @type {number}
 */
var client_id = 3750804
  , scope = 2067871
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
 * @returns promise
 */
function getToken(req, res) {
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
  return getTokenRequest(vkUrl);
}

/**
 * request to VK to get access_token
 * @param url
 * @returns promise
 */
function getTokenRequest(url) {
  var deferred = new Deferred();
  var rq = https.get(url, function (rs) {
    var result = '';
    rs.on('data', function (chunk) {
      result += chunk;
    });
    rs.on('end', function () {
      var obj = JSON.parse(result);
      if (200 == rs.statusCode) {
        deferred.resolve(obj);
      } else {
        deferred.reject(obj);
      }
    });
  });
  rq.on('error', function (e) {
    deferred.reject(e);
  });
  return deferred.promise;
}

/**
 * TODO handle access denied flow
 * VK auth
 * @param req
 * @param res
 */
exports.auth = function (req, res) {
  return ('/auth' === req.path && req.query.code) ?
    getToken(req, res) : redirectToAuthInVK(req, res);
};
