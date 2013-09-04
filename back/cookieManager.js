var userDAO = require('./db/userDAO')
  , vk = require('./vk/auth')
  , crypto = require('crypto');

var ONE_YEAR_IN_MILLISECONDS = 31536000000;

/**
 * Check users session and cookies, authorize user
 * cookies contains:  key - hash of userId value
 * session contains: userId and token
 * flow: check user cookies for key value,
 *  if key exists ->
 *    check users session values, updates them
 *  if key doesn't exists ->
 *    send user to authorize in VK, set session and key in cookies
 * @param req
 * @param res
 * @param next
 */
exports.checkCookie = function (req, res, next) {
  var key = req.cookies.key;
  if (key) {
    if (!req.session.user) {
      userDAO.fetchByKey(key).then(
          successSessionRecovery(req, res), errorSessionRecovery(req, res)).then(
          nextWrap(next));
    } else {
      next();
    }
  } else {
    authorizeUserInVK(req, res);
  }
};

function nextWrap(next) {
  return function () {
    next();
  };
};

function errorSessionRecovery(req, res) {
  return function (error) {
    res.clearCookie('key');
  };
};

function successSessionRecovery(req, res) {
  return function (object) {
    setKeyCookie(res, object);
    setSessionCookie(req, object);
  };
};

function authorizeUserInVK(req, res){
  var promise = vk.auth(req, res);
  if (promise) {
    promise.then(saveUserInDB()).then(
      successAuthorizationFlow(res, req), errorAuthorizationFlow(res, req));
  }
}

function successAuthorizationFlow(res, req) {
  return function (object) {
    setKeyCookie(res, object);
    setSessionCookie(req, object);
    res.redirect('/' + object.userId);
  };
};

//TODO redirect to sorry page or smthng
function errorAuthorizationFlow(res, req) {
  return function (error) {
    res.redirect('http://www.google.com');
  }
};


/**
 * save user info in database
 * @returns {Function}
 */
function saveUserInDB() {
  return function (object) {
    var modifiedObject = modifyObject(object);
    return userDAO.save(modifiedObject);
  };
}

function setKeyCookie(res, object) {
  res.cookie('key', object.key, {maxAge: ONE_YEAR_IN_MILLISECONDS});
};

function setSessionCookie(req, object) {
  req.session.user = {
    userId: object.userId,
    token: object.token
  };
};


/**
 * modify object before save in db
 * @param object
 * @returns {{}}
 */
function modifyObject(object) {
  var dbObject = {};
  var id = object.user_id + "";
  dbObject.key = crypto.createHash('sha1').update(id).digest('hex');
  dbObject.userId = object.user_id;
  dbObject.token = object.access_token;
  return dbObject;
}
