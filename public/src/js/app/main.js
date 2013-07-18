require([
  'app',
], function (app) {
  'use strict';

  var options = {
    history: {
      pushState: true,
      root: '/dashboard'
    },
    debug: true
  };
  app.start(options);

});
