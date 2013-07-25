define([
  'app',
  'Backbone.Marionette',
  'Header/HeaderController',
  'Navigation/NavigationController',

  'jade!../../../Templates/Main/MainTemplate'
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
      console.log('init Main Controller', options.region);
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
      console.log('show must go on', this.region);
      this.region.show(this._getLayout());
    },

    _showWidgets: function (layout) {
      var navigationController = 
        new NavigationController({region: layout.navigation});
      navigationController.show();
//      var headerController = new HeaderController({region: layout.header});
//      headerController.show();
    }
  });
  return MainController;
});
