define([
  'app',
  'Backbone.Marionette',
  'mousetrap',
  'KeyCatcher',
  'jade!../../../Templates/Navigation/NavigationTemplate'
], function (
  app,
  Marionette,
  mousetrap,
  KeyCatcher,
  NavigationTemplate
) {
  'use strict';

  var NavigationView =  Marionette.ItemView.extend({
    template: NavigationTemplate,
    uiClasses: {
      active: 'bNavigation__m__MenuActive'
    },
    initialize: function () {
      var self = this;
      self.listenTo(self, {
        'nextElement': self._nextElementHandler
      });
    },
    _nextElementHandler: function () {
      console.log('Is this a right way?')
      var currentEl = this.currentActiveElement;
      if ( !currentEl || currentEl.length === 0) {
        this.currentActiveElement = $('.jsFirstTraverseDiv');
        currentEl = this.currentActiveElement;
      }
      currentEl.removeClass(this.uiClasses.active);
      currentEl = currentEl.next();
      if (!currentEl || currentEl.length === 0) {
        this.currentActiveElement = $('.jsFirstTraverseDiv');
        currentEl = this.currentActiveElement;
      }
      currentEl.addClass(this.uiClasses.active);
    }
  });

  var NavigationController = Marionette.Controller.extend({
    initialize: function (options) {
      this.keyCatcher = new KeyCatcher();
      this.region = options.region;
    },

    show: function () {
      var navigationView = new NavigationView();
      this.keyCatcher.trigger('navigationViewReference', navigationView);
      this.region.show(navigationView);
    }

  });
  return NavigationController;
});
