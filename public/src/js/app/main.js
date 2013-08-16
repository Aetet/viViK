require([
  'app',
  'AppInitSandbox'
], function (app, AppInitSandbox) {
  'use strict';
  console.log('historical time');

  app.on('initialize:after', function () {
    var appInitSandbox = new AppInitSandbox();
    console.log(appInitSandbox);
  });
  app.start();

});
