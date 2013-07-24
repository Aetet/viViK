var http = require('http');
var url = require('url');
var VK = require('./vk');

var GET_WALL = 'wall.get?';

//Should be in util module
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

exports.getWall = function (req, res) {

  //predefined params, more info http://vk.com/dev/wall.get
  var params = {
    offset: 0,
    count: 10,
    filter: 'all',
    extended: 1
  }

  var urlParsed = url.parse(req.url, true);
  var uid = urlParsed.query.uid;
  if (urlParsed.query.uid) {
    if (isNumber(uid)) {
      params.owner_id = uid;
    } else {
      params.domain = uid;
    }
    var vk = new VK();
    vk.request(GET_WALL, params);

    vk.on(GET_WALL, function(result){
      console.log(result);
      res.end("result: \n"+ result + "\n see console\\debug for full info");
    })
  } else {
    res.end("enter uid in query string");
  }
};