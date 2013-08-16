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
    
    onShow: function () {
      rivets.bind(this.el, {menuItems: this.collection});
    }
  });

  return NavigationView;
});
