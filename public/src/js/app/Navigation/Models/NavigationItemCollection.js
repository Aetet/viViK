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
    Backbone.Collection.extend(NavigationContentJSON, {
      model: NavigationItemModel
    });

  return NavigationItemCollection;
});
