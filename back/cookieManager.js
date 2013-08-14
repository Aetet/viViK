var userDAO = require('./db/userDAO')
  , vk = require('./vk/auth')
  , crypto = require('crypto');


/**
 * Check users session and cookies, authorize user
 * cookies contains:  key - hash of userId value
 * session contains: userId and token
 *
 * @param req
 * @param res
 * @param next
 */
exports.checkCookie = function (req, res, next) {
  if (!req.session.user) {
    var key = req.cookies.key;
    if (key) {
      userDAO.fetchByKey(key, function (err, object) {
        if (object) {
          var user = {
            userId: object.userId,
            token: object.token
          };
          req.session.user = user;
        } else {
          res.clearCookie('key');
        }
        next();
      });
    } else {
      //TODO make out this trash
      vk.auth(req, res, function (statusCode, resultObject) {
        if (200 == statusCode) {
          console.log(resultObject);
          var modifiedObject = modifyObject(resultObject);
          userDAO.save(modifiedObject, function (err, doc) {
            if (doc) {
              res.cookie('key', doc.key, {maxAge: doc.expire});
              req.session.user = {
                userId : doc.userId,
                token: doc.token
              };
            }
            res.redirect('/'+doc.userId);
          });
        } else {
          //need to handle this
          console.log('wrong auth');
          res.redirect('/');
        }
      });
    }
  } else {
    next();
  }
}

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
  dbObject.expire = object.expires_in * 1000 - 5000;// ~time of process
  dbObject.token = object.access_token;
  return dbObject;
}
