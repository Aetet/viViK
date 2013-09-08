var crypto = require('crypto');
/**
 * User constructor
 * @param userId
 * @param token
 * @constructor
 */
function User (userId, token){
  var id = userId + "";
  this._id = crypto.createHash('sha1').update(id).digest('hex');
  this.userId = userId;
  this.token = token;
}

module.exports = exports = User;