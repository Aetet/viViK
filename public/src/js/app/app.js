define([
  'underscore',
  'Backbone.Marionette',
  'util/rivets-config'

], function (_, Marionette) {
  'use strict';

  var app = new Marionette.Application();

  app.addInitializer(function () {
    Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
      return templateId;
    };

    Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
      return rawTemplate;
    };
  });


  return app;
});
