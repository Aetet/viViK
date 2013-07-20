var url = require('url');
var fs = require('fs');

module.exports = function (req, res) {
  var urlParsed = url.parse(req.url, true);
  //console.log('content was writable');
  if (urlParsed === '/') {
  var stream = fs.createReadStream('../public/build/index.html');

  stream.on('readable', function (){
    console.log('content was writable');
    var content = stream.read();
    res.write(content);
  })
    .on('end', function (){
      console.log('response was ended');
      res.end();
    })
    .on('error', function (e){
      console.log('That was mistake',e);
      res.statusCode = 404;
      res.end("Not found");
    });
  } else {
    res.end();
  }
  return;
};
