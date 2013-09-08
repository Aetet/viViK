var userDAO = require('./db/userDAO')
  , vk = require('./vk/auth')
  , User = require('./model/user');

var ONE_YEAR_IN_MILLISECONDS = 31536000000;
var NAME_OF_KEY_COOKIE = 'key';

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
      userDAO.fetchById(key).then(
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
    res.clearCookie(NAME_OF_KEY_COOKIE);
  };
};

function successSessionRecovery(req, res) {
  return function (user) {
    setKeyCookie(res, user);
    setSessionCookie(req, user);
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
  return function (user) {
    setKeyCookie(res, user);
    setSessionCookie(req, user);
    res.redirect('/' + user.userId);
  };
};

//TODO redirect to sorry page or smthng
function errorAuthorizationFlow(res, req) {
  return function (error) {
    console.log(error);
    res.redirect('http://www.google.com');
  }
};


/**
 * save user info in database
 * @returns {Function}
 */
function saveUserInDB() {
  return function (object) {
    var user = new User(object.user_id, object.access_token);
    return userDAO.save(user);
  };
}

/**
 * add in cookie user's unique key
 * @param res
 * @param user
 */
function setKeyCookie(res, user) {
  res.cookie(NAME_OF_KEY_COOKIE, user._id, {maxAge: ONE_YEAR_IN_MILLISECONDS});
};

function setSessionCookie(req, user) {
  req.session.user = user;
};