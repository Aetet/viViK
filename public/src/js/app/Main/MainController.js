define([
  'app',
  'Backbone.Marionette',

  'Header/HeaderController',
  'Navigation/NavigationController',

  'Models/CurrentElementModel',

  'jade!../../../Templates/Main/MainTemplate'
], function (
  app,
  Marionette,

  HeaderController,
  NavigationController,

  CurrentElementModel,

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
      this.currentElementModel = new CurrentElementModel();
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
      var navigationController = 
        new NavigationController({
          region: layout.navigation, 
          currentElementModel: this.currentElementModel
        });
      navigationController.show();
//      var headerController = new HeaderController({region: layout.header});
//      headerController.show();
    }
  });
  return MainController;
});
