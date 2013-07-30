// Set the require.js configuration for your application.
console.log('I was required');
requirejs.config({
  paths: {
    'requireLib': '../vendor/requirejs/require',
    'jade': '../vendor/require-jade/jade',

    'underscore': '../vendor/underscore/underscore',
    'jquery': '../vendor/jquery/jquery',
    'Mousetrap': '../vendor/mousetrap/mousetrap',
    'backbone': '../vendor/backbone/backbone',
    'Backbone.ModelBinder': '../vendor/Backbone.ModelBinder',
    'backbone.wreqr': '../vendor/backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.babysitter': '../vendor/backbone.babysitter/lib/amd/backbone.babysitter',
    'Backbone.Marionette': '../vendor/backbone.marionette/lib/core/amd/backbone.marionette',

    'rivets': '../vendor/rivets/dist/rivets',
    'KeyCatcher': 'util/KeyCatcher'

  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'Mousetrap': {
      exports: 'Mousetrap'
    },

    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});
