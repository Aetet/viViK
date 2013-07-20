define([
  'app',
  'Backbone.Marionette',

  'Header/HeaderController',

  'jade!./MainTemplate'
], function (
  app,
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
//      var headerController = new HeaderController({region: layout.header});
//      headerController.show();
    }
  });
  return MainController;
});
