define([
  'app',
  'backbone'
], function (app, Backbone) {

  var NavigationItemModel = Backbone.Model.extend({
    defaults: {
      id: null,
      name: null,
      activeElement: false
    }
  });
  var NavigationItemCollection = 
    Backbone.Collection.extend({
      model: NavigationItemModel,
      url: '/Locales/Navigation/NavigationContentJSON.json'
    });

  return NavigationItemCollection;
});
