define([
  'app',
  'Backbone.Marionette',

  'KeyCatcher',

  'Models/CurrentElementModel',
  'Navigation/Models/NavigationItemCollection',

  'jade!Content/../../../Templates/Navigation/NavigationTemplate'
], function (
  app,
  Marionette,

  KeyCatcher,

  CurrentElementModel,
  NavigationItemCollection,

  NavigationTemplate
) {
  'use strict';

  var NavigationView =  Marionette.ItemView.extend({
    template: NavigationTemplate,
    uiClasses: {
      active: 'bNavigation__m__MenuActive'
    },
    initialize: function (options) {
      this.currentElementModel = options.currentElementModel;
      var self = this;
      self.listenTo(self, {
        'nextElement': self._nextElementHandler
      });
    },
    _nextElementHandler: function () {
      var currentElementModel
        , currentEl
        , tempNextElement;
      currentElementModel = this.currentElementModel;
      currentEl = currentElementModel.get('currentElement');

      tempNextElement = currentEl.next();
      if ((!!tempNextElement) || (tempNextElement.length !== 0)) {
        currentElementModel.set('nextElement', null);
      } else {
        currentElementModel.set('currentElement', tempNextElement);
        currentEl.removeClass(this.uiClasses.active);
        currentEl.addClass(this.uiClasses.active);
      }
    }
  });

  var NavigationController = Marionette.Controller.extend({
    initialize: function (options) {
      var navigationItemCollection
        , menuArray;
      menuArray = []
      navigationItemCollection = new NavigationItemCollection();

      navigationItemCollection.fetch({
        success: function () {
          console.log('navigationItem', navigationItemCollection);
        }
      });
      this.keyCatcher = new KeyCatcher();
      this.currentElementModel = options.currentElementModel;
      this.region = options.region;
    },

    show: function () {
      var navigationView = new NavigationView({
        currentElementModel: this.currentElementModel
      });
      this.keyCatcher.trigger('navigationViewReference', navigationView);
      this.region.show(navigationView);
    }

  });
  return NavigationController;
});
