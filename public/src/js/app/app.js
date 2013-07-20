define([
  'underscore',
  'backbone',
  'Backbone.Marionette'

], function (_, Backbone, Marionette) {
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
