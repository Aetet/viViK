/*
 this code was taken from dojo and redesigned
 -------------------------------------------
 can be replaced by another libs or frameworks
 -------------------------------------------
 Deferred.prototype.resolve(object);
 Deferred.prototype.reject(object);
 Promise.prototype.then(function(objectFromResolve), function(objectFromReject));
 functions *then* can be chained
 */
var RESOLVED = 0
  , REJECTED = 1;

var signalWaiting = function (waiting, type, result) {
  for (var i = 0; i < waiting.length; i++) {
    signalListener(waiting[i], type, result);
  }
};

var signalListener = function (listener, type, result) {
  var func = listener[type];
  var deferred = listener.deferred;
  if (func) {
    var newResult = func(result);
    if (newResult && typeof newResult.then === "function") {
      newResult.then(
        makeDeferredSignaler(deferred, RESOLVED),
        makeDeferredSignaler(deferred, REJECTED));
      return;
    }
    signalDeferred(deferred, RESOLVED, newResult);
  } else {
    signalDeferred(deferred, type, result);
  }
};

var makeDeferredSignaler = function (deferred, type) {
  return function (value) {
    signalDeferred(deferred, type, value);
  };
};

var signalDeferred = function (deferred, type, result) {
  switch (type) {
    case RESOLVED:
      deferred.resolve(result);
      break;
    case REJECTED:
      deferred.reject(result);
      break;
  }
};

var Deferred = function () {
  var promise = this.promise = new Promise();
  var fulfilled, result;
  var waiting = [];
  this.isResolved = promise.isResolved = function () {
    return fulfilled === RESOLVED;
  };

  this.isRejected = promise.isRejected = function () {
    return fulfilled === REJECTED;
  };

  this.resolve = function (value) {
    if (!fulfilled) {
      signalWaiting(waiting, fulfilled = RESOLVED, result = value);
      waiting = null;
    }
    return promise;
  };

  this.reject = function (error) {
    if (!fulfilled) {
      signalWaiting(waiting, fulfilled = REJECTED, result = error);
      waiting = null;
    }
    return promise;
  };

  this.then = promise.then = function (callback, errback) {
    var listener = [callback, errback];
    listener.deferred = new Deferred();
    if (fulfilled && !waiting) {
      signalListener(listener, fulfilled, result);
    } else {
      waiting.push(listener);
    }
    return listener.deferred.promise;
  };

};

module.exports = exports = Deferred;

function Promise() {
};