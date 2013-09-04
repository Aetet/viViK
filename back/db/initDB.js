var mongo = require('mongodb'),
  MongoClient = mongo.MongoClient,
  MongoServer = mongo.Server;

var mongoClient = new MongoClient(new MongoServer('ds037368.mongolab.com',37368));
var db = mongoClient.db('vivik');

/**
 * open connection to db and authenticate it
 */
mongoClient.open(function (err, mongoclient) {
  if (err) throw err;
  db.authenticate('vivik', 'vivik', function(err, result) {
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