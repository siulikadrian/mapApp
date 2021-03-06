'use strict';

//Setting up route
angular.module('mean.map').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all map', {
        url: '/map',
        templateUrl: 'map/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create map', {
        url: '/map/create',
        templateUrl: 'map/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit map', {
        url: '/map/:mapId/edit',
        templateUrl: 'map/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('map by id', {
        url: '/map/:mapId',
        templateUrl: 'map/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
