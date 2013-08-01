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
        'NavigationController::navigationViewReference': function (navigationView) {
          self._navigationViewListener(navigationView);
        }
      });
    },
    _navigationViewListener: function (navigationView) {
      var self = this;


      self.listenTo(navigationView, {
        'render': function () {
          console.log('keymap for next', KeyMap.Navigation.nextElement);
          Mousetrap.bind(KeyMap.Navigation.nextElement, function () {
            console.log('Is this a next Elem?');
            var activeElement
              , navigationItemCollection
              , nextActiveElement
              , indexOfActiveElement;
            console.log('before change', navigationView);
            navigationItemCollection = navigationView.collection;
            activeElement = navigationItemCollection.findWhere({activeElement: true});
            indexOfActiveElement = navigationItemCollection.indexOf(activeElement);
            console.log('indexActive',indexOfActiveElement);
            if (navigationItemCollection.length - 1 > indexOfActiveElement) {
              activeElement.set('activeElement', false);
              nextActiveElement = navigationItemCollection.at(indexOfActiveElement + 1);
              nextActiveElement.set('activeElement', true);
              navigationItemCollection.set(activeElement, {merge: true, remove: false});

              navigationItemCollection.set(nextActiveElement, {merge: true, remove: false});
            }
            console.log('after change', navigationView);
            
            navigationView.trigger('nextElement');
          });



          Mousetrap.bind(KeyMap.Navigation.previousElement, function () {
            console.log('Is this a next Elem?');
            var activeElement
              , navigationItemCollection
              , nextActiveElement
              , indexOfActiveElement;
            console.log('before change', navigationView);
            navigationItemCollection = navigationView.collection;
            activeElement = navigationItemCollection.findWhere({activeElement: true});
            indexOfActiveElement = navigationItemCollection.indexOf(activeElement);
            console.log('indexActive',indexOfActiveElement);
            if (!!indexOfActiveElement) {
              activeElement.set('activeElement', false);
              nextActiveElement = navigationItemCollection.at(indexOfActiveElement - 1);
              nextActiveElement.set('activeElement', true);
              navigationItemCollection.set(activeElement, {merge: true, remove: false});

              navigationItemCollection.set(nextActiveElement, {merge: true, remove: false});
            }
            console.log('after change', navigationView);
            
            navigationView.trigger('nextElement');
          });
        }
      });
    }
  });

  return KeyCatcher;
});
