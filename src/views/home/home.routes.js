// ROUTES HOME
'use strict';
angular.module('app').config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state({
      name: 'home',
      url: '/',
      views: {
        content: {
          templateUrl: '/views/home/home.html',
          controller: 'homeController',
          controllerAs:"home"
        }
      }
    });
}]);
