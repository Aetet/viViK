define([
  'app',
  'Backbone.Marionette',
  'Main/MainController'
], function (app, Marionette, MainController) {
  var AppInitSandbox = Marionette.Controller.extend({
    initialize: function () {
      app.addRegions({
        mainRegion: '.jsMainRegion'
      });
      var mainController = new MainController({region: app.mainRegion});
      mainController.show();

    }
  });

  return AppInitSandbox;

});
