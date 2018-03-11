// GLOBAL ROUTES
angular.module('app').config(['$urlRouterProvider', '$locationProvider', function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
}]);
