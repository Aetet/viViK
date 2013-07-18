/**
 *
 * Created with IntelliJ IDEA.
 * User: aetetic
 * Date: 18.07.13
 * Time: 22:48
 * To change this template use File | Settings | File Templates.
 */

define([
  'app',
  'Backbone.Marionette',

  'jade!./HeaderTemplate'
], function (
  app,
  Backbone,
  Marionette,
  HeaderTemplate
) {
  'use strict';

  var HeaderView =  Marionette.ItemView.extend({
    template: HeaderTemplate

  });

  var HeaderController = Marionette.Controller.extend({
    initialize: function (options) {
      this.region = options.region;
    },

    show: function () {
      var headerView = new HeaderView();
      this.region.show(headerView);
    }

  });
  return HeaderController;
});
