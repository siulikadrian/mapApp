'use strict';

angular.module('mean.map').controller('MapsController', ['$scope', '$stateParams', '$location', '$timeout', 'Global', 'Maps',
  function($scope, $stateParams, $location, $timeout, Global, Maps) {
    $scope.global = Global;

    $scope.hasAuthorization = function(map) {
      if (!map || !map.user) return false;
      return $scope.global.isAdmin || map.user._id === $scope.global.user._id;
    };

    $scope.query = '';

    $scope.$watch('query', function(){

      $timeout(function(){
          $scope.refreshMapMarkers();  

          $scope.$broadcast('rebuild:me');
        
      },1000);

    });

    $scope.refresh = function(){

      console.log('refresh map');

    }

    $scope.refreshMapMarkers = function(){

        angular.forEach($scope.maps, function(val, key){
          console.log(val);
        });

        if($scope.maps.length === 1){

            $scope.map.center.lat = $scope.maps[0].lat;
            $scope.map.center.lan = $scope.maps[0].lan;

        }

        $scope.$apply();
    };  

    $scope.hoverFunction = function(event){

      var marker = this;

      console.log(marker);

      var markerId = marker.markerId;
 
     
      angular.forEach(angular.element('.map-list li'), function(evt){

         var listElement = $(evt)[0];
         var listElementID = listElement.attributes['marker-id'].value;

         if(markerId === listElementID){

            listElement.style.background = 'blue';

         } else {

            listElement.style.background = '';

         }
      });

    };

    $scope.resetHover = function(evt){
      angular.forEach(angular.element('.map-list li'), function(value, key){

        $(value)[0].style.background = "";

      });
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var map = new Maps({
          info: this.info,
          desc: this.desc,
          lat: this.lat,
          lan: this.lan
        });

        map.$save(function(response) {
          console.log(response);
          $location.path('map/' + response._id);
        });

        this.info = '';
        this.desc = '';
        this.lat= '';
        this.lan='';

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(map) {
      if (map) {
        console.log($scope);
        console.log('z if map',map);
        map.$remove();

        for (var i in $scope.maps) {
          if ($scope.maps[i] === map) {
            $scope.maps.splice(i, 1);
          }
        }
      } else {
        $scope.map.$remove(function(response) {
          console.log('z else',response);
          console.log($location.path);
          $location.path('/map');
        });
      }

      setTimeout(function(){

        $scope.$broadcast('rebuild:me');
        
      },100);
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var map = $scope.map;
        if (!map.updated) {
          map.updated = [];
        }
        map.updated.push(new Date().getTime());

        map.$update(function() {
          $location.path('map/' + map._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Maps.query(function(maps) {
        $scope.maps = maps;
      });
    };

    $scope.findOne = function() {
      Maps.get({
        mapId: $stateParams.mapId
      }, function(map) {
        $scope.map = map;
      });
    };

    setTimeout(function(){

      $scope.$broadcast('rebuild:me');

    },100);

  }
]);
