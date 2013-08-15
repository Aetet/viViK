define([
  'app',
  'backbone'
], function (app, Backbone){
  var CurrentElementModel = Backbone.Model.extend({
    defaults: {
      currentElement: $('.jsFirstTraverseDiv'),
      nextElement: null,
      previousElement: null,
      previousContext: null,
      nextContext: null
    }
  });

  return CurrentElementModel;

});
