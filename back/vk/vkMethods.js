var http = require('http');
var url = require('url');
var VK = require('./vk');

var GET_WALL = 'wall.get?';

//Should be in util module
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

vkMethods = {};

/**
 *
 * @param req
 * @param res
 * @param callback parameter contains result
 */
vkMethods.getWall = function (id, callback) {

  //predefined params, more info http://vk.com/dev/wall.get
  var params = {
    offset: 0,
    count: 10,
    filter: 'all',
    extended: 1
  };
  if (isNumber(id)) {
    params.owner_id = id;
  } else {
    params.domain = id;
  }
  var vk = new VK();
  vk.request(GET_WALL, params);

  vk.on(GET_WALL, function (result) {
    callback(result);
  });
};

exports = module.exports = vkMethods;