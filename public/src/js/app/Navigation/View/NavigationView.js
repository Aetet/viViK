define([
  'app',
  'Backbone.Marionette',
  'rivets'
], function(
  app,
  Marionette,
  rivets
) {
  var NavigationView = Marionette.ItemView.extend({
    template: '#navigationTemplate',
    initialize: function (options) {
      var self = this;
      self.mainEventSandbox = options.mainEventSandbox;

      self.process();
    },
    process: function () {
      var self = this;
      self.listenTo(self.mainEventSandbox, {
        'NavigationController::showNavigationView': function (region) {
          self.show(region);
        }
      });

    },
    
    show: function (region) {
      var renderRegion = region || this.region;
      renderRegion.show(this);
    },
    
    onShow: function () {
      rivets.bind(this.el, {menuItems: this.collection});
    }
  });

  return NavigationView;
});
