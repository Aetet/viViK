/**
 * Created with IntelliJ IDEA.
 * User: aetetic
 * Date: 18.07.13
 * Time: 21:49
 * To change this template use File | Settings | File Templates.
 */

define([
  'app',
  'Backbone.Marionette',

  'Header/HeaderController',

  'jade!./MainTemplate'
], function (
  app,
  Backbone,
  Marionette,
  HeaderController,
  MainTemplate
) {
  'use strict';

  var MainLayout =  Marionette.Layout.extend({
    template: MainTemplate,

    regions: {
      header: '.jsHeaderRegion'
    }
  });

  var MainController = Marionette.Controller.extend({
    initialize: function (options) {
      this.region = options.region;
    },

    _getLayout: function () {
      var self = this;
      var layout = new MainLayout();

      self.listenTo(MainLayout, {
        'render': function () { self._showWidgets(layout); }
      });

      return MainLayout;
    },

    start: function () {
      this.region.show(this._getLayout());
    },

    _showWidgets: function (layout) {
      var headerController = new HeaderController({region: layout.header});
      headerController.show();
    }
  });

  app.addInitializer(function () {
    var Router = Marionette.AppRouter.extend({
      appRoutes: {
        'manager_dashboard': 'start'
      }
    });

    var controller = new MainController({
      region: app.mainRegion
    });

    new Router({
      controller: controller
    });
  });
});
