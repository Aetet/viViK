define([
  'app',
  'Backbone.Marionette',
  'rivets',

  'jade!Content/../../../Templates/Navigation/NavigationTemplate'
], function(
  app,
  Marionette,
  rivets,

  NavigationTemplate
) {
  var NavigationView = Marionette.ItemView.extend({
    template: NavigationTemplate,
    
    onShow: function () {
      rivets.bind(this.el, {menuItems: this.collection});
    }
  });

  return NavigationView;
});
