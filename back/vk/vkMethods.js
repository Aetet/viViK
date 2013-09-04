var http = require('http');
var url = require('url');
var vk = require('./vk');

var GET_WALL = 'wall.get?';

//Should be in util module
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

vkMethods = {};

/**
 * @param req
 * @param res
 * @returns promise
 */
vkMethods.getWall = function (id) {
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
  return vk.request(GET_WALL, params);
};

module.exports = exports = vkMethods;