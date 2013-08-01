define([
  'app',
  'Backbone.Marionette',

  'Header/HeaderController',
  'Navigation/NavigationController',

  'jade!Content/../../../Templates/Main/MainTemplate'
], function (
  app,
  Marionette,

  HeaderController,
  NavigationController,

  MainTemplate
) {
  'use strict';

  var MainLayout =  Marionette.Layout.extend({
    template: MainTemplate,

    regions: {
      header: '.jsHeaderRegion',
      navigation: '.jsNavigationRegion'
    }
  });

  var MainController = Marionette.Controller.extend({
    initialize: function (options) {
      this.region = options.region;
    },

    _getLayout: function () {
      var self = this;
      var layout = new MainLayout();

      self.listenTo(layout, {
        'render': function () { self._showWidgets(layout); }
      });

      return layout ;
    },

    show: function () {
      var self = this;
      self.region.show(self._getLayout());
    },

    _showWidgets: function (layout) {
      this._showNavigation(layout.navigation);
    },
    _showNavigation: function (region) {
      var navigationController = 
        new NavigationController({
          region: region 
        });
    }
  });
  return MainController;
});
