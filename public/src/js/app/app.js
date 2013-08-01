define([
  'underscore',
  'Backbone.Marionette',
  'KeyCatcher',
  'util/rivets-config'

], function (_, Marionette, KeyCatcher) {
  'use strict';

  var app = new Marionette.Application();

  app.addInitializer(function () {

    this.keyCatcher = new KeyCatcher();
    Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
      return templateId;
    };

    Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
      return rawTemplate;
    };
  });


  return app;
});
