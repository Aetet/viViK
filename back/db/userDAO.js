var db = require('./initDB')
  , collection = db.collection('data')
  , Deferred = require('../util/deferred');

var userDAO = {};
/**
 * fetch by key
 * @param key
 * @returns promise
 */
userDAO.fetchById = function (key) {
  var deferred = new Deferred();
  collection.findOne({'_id': key}, function (err, doc) {
    (doc) ? deferred.resolve(doc) : deferred.reject(err);
  });
  return deferred.promise;
};

/**
 * save in db or rewrite if exists
 * @param object
 * @returns promise
 */
userDAO.save = function (object) {
  var deferred = new Deferred();
  collection.findAndModify({'_id': object._id}, {}, object, {upsert: true}, function (err, doc) {
    (doc) ? deferred.resolve(doc) : deferred.reject(err);
  });
  return deferred.promise;
};

module.exports = exports = userDAO;



