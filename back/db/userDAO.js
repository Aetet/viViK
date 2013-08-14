/*
fake dao
 */
var db = require('./initDB')
  , collection = db.collection('data');

/**
 * fetch by key
 * @param key
 * @param callback(function) - The first parameter will contain the Error object if an error occured,
 *  or null otherwise. While the second parameter will contain the results from the findOne method or null if an error occured.
 */
exports.fetchByKey = function (key, callback) {
  collection.findOne({'key': key}, function (err, doc) {
    callback(err, doc);
  });
};

/**
 * save in db
 * @param object
 * @param callback
 */
exports.save = function (object, callback) {
  collection.findAndModify({'key':object.key}, {}, object, {upsert: true}, function (err, doc) {
    callback(err, doc);
  });
};





