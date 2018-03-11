// HOME CONTROLLER
'use strict';
angular.module('app').controller('homeController', ['$timeout', '$scope', function($timeout, $scope) {

  let init = (() => {
      this.title = 'It works !';
      this.loadText = 'loading';
  })();

  // fired once the view is loaded, after the DOM is rendered. The ‘$scope’ of the view emits the event.
  $scope.$on('$viewContentLoaded', (event) => {
    this.loadText = 'finish';
  });

}]);
