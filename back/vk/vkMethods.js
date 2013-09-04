var http = require('http');
var url = require('url');
var vkCore = require('./vkMethodsCore');

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
  return vkCore.request(GET_WALL, params);
};

module.exports = exports = vkMethods;