require([
  'app',
  'Main/MainController'
], function (app, MainController) {
  'use strict';
  console.log('historical time');
  app.addRegions({
    mainRegion: '.jsMainRegion'
  });

  app.on('initialize:after', function () {
    var mainController = new MainController({region: app.mainRegion});
    mainController.show();
  });
  app.start();

});
