/*
 fake dao
 */
var db = require('./initDB')
  , collection = db.collection('data')
  , Deferred = require('../util/deferred');

/**
 * fetch by key
 * @param key
 * @returns promise
 */
exports.fetchByKey = function (key) {
  var deferred = new Deferred();
  collection.findOne({'key': key}, function (err, doc) {
    (doc) ? deferred.resolve(doc) : deferred.reject(err);
  });
  return deferred.promise;
};

/**
 * save in db or rewrite if exists
 * @param object
 * @returns promise
 */
exports.save = function (object) {
  var deferred = new Deferred();
  collection.findAndModify({'key': object.key}, {}, object, {upsert: true}, function (err, doc) {
    (doc) ? deferred.resolve(doc) : deferred.reject(err);
  });
  return deferred.promise;
};





