'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.map').factory('Maps', ['$resource',
  function($resource) {
    return $resource('map/:mapId', {
      mapId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
