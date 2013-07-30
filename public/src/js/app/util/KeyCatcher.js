define([
  'underscore',
  'Backbone.Marionette',
  'Mousetrap'
], function (
  _, 
  Marionette,
  Mousetrap
) {
  var KeyMap = {
    Navigation: {
      nextElement: 'j',
      previousElement: 'k',
      toContentField: 'l'
    }
  };
  var KeyCatcher = Marionette.Controller.extend({
    initialize: function () {
      var self = this;
      _.bindAll(this);
      self.listenTo(this, {
        'navigationViewReference': function (navigationView) {
            self._navigationViewListener(navigationView);
          }
        });
    },
    bindAction: function () {
    },
    _navigationViewListener: function (navigationView) {
      var self = this;

      console.log('keymap for next', KeyMap.Navigation.nextElement);
      Mousetrap.bind(KeyMap.Navigation.nextElement, function () {
        console.log('its a next Elem?');
        navigationView.trigger('nextElement');
      });


      self.listenTo(navigationView, {
        'render': function () {
          console.log('I hear you navigationView');
        }
      });
    }
  });

  return KeyCatcher;
});
