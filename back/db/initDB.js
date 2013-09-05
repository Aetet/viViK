var mongo = require('mongodb'),
  MongoClient = mongo.MongoClient,
  MongoServer = mongo.Server;

var settings = require('./settings');

var mongoClient = new MongoClient(new MongoServer(settings.host,settings.port));
var db = mongoClient.db(settings.databaseName);

/**
 * open connection to db and authenticate it
 */
mongoClient.open(function (err, mongoclient) {
  if (err) throw err;
  db.authenticate(settings.login, settings.password, function(err, result) {
    if (err) {
      throw new Error('mongoDB authentication fail');
    }
  });
});

/**
 * send mongo database object
 * @type {Db}
 */
module.exports = exports = db;