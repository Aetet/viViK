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
      self.mainEventSandbox = options.mainEventSandbox;
      self.navigationItemCollection = new NavigationItemCollection();

      self.region = options.region;
      self.process();

    },
    process: function () {
      var self = this
        , mainEventSandbox = self.mainEventSandbox;
      
      self.listenTo(mainEventSandbox, {
        'NavigationController::fetchNavigationItems': function () {
          self.navigationItemCollection.fetch({
            success: function () {
              self.show();
            }
          });
        }  
      });
      
      mainEventSandbox.trigger('NavigationController::fetchNavigationItems');
    },

    show: function () {
      var self = this
        , navigationView
        , mainEventSandbox= self.mainEventSandbox; 

      navigationView = new NavigationView({
        mainEventSandbox: mainEventSandbox,
        collection: self.navigationItemCollection 
      });
      app.keyCatcher.trigger('NavigationController::navigationViewReference', navigationView);
      mainEventSandbox.trigger('NavigationController::showNavigationView', self.region);
//      self.region.show(navigationView);
    }

  });
  return NavigationController;
});
