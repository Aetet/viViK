// Set the require.js configuration for your application.
requirejs.config({
    paths: {
        'requireLib': '../vendor/requirejs/require',
        'jade': '../vendor/require-jade/jade',

        'underscore': '../vendor//underscore/underscore',
        'jquery': '../vendor/jquery/jquery',
        'backbone': '../vendor/bower/backbone/backbone',

        'backbone.wreqr': '../vendor/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../vendor/bower/backbone.babysitter/lib/amd/backbone.babysitter',
        'Backbone.Marionette': '../vendor/bower/marionette/lib/core/amd/backbone.marionette',
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
    }
});

