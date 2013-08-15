define([
  'app',
  'Backbone.Marionette',

  'Navigation/Models/NavigationItemCollection',
  'Navigation/View/NavigationView'

], function (
  app,
  Marionette,

  NavigationItemCollection,
  NavigationView
) {
  'use strict';

  var NavigationController = Marionette.Controller.extend({
    initialize: function (options) { 
      var self = this;
      self.navigationItemCollection = new NavigationItemCollection();

      self.navigationItemCollection.fetch({
        success: function () {
          self.show();
        }
      });
      self.region = options.region;
    },

    show: function () {
      var self = this
        , navigationView; 

      navigationView = new NavigationView({
        collection: self.navigationItemCollection 
      });
      app.keyCatcher.trigger('NavigationController::navigationViewReference', navigationView);
      self.region.show(navigationView);
    }

  });
  return NavigationController;
});
