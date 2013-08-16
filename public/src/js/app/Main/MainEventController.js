define([
  'Backbone.Marionette'
], function (Marionette) {
  return Marionette.Controller.extend({
    initialize: function () {
      this.trigger('eventSandboxInit');
    }
  });
});
