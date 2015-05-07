'use strict';

angular.module('otsurvey')
.controller('NavbarCtrl', ['$scope','$document','$rootScope', function ($scope, $document, $rootScope) {
  $scope.date = new Date();

  console.log('get element by id: navbar:');
  console.log($document[0].getElementById('navbar'));
  var navbar = $document[0].getElementById('navbar');
  navbar = angular.element(navbar);
  console.log('i am navbar :');
  console.log(navbar.prop('offsetHeight'));
  $rootScope.navbarHeight = navbar.prop('offsetHeight');
  console.log('navbarHeight:');
  console.log($rootScope);


}]);
    // .controller('NavbarCtrl', function($scope, $document) {
    //         $scope.date = new Date();

    //         console.log('get element by id: navbar:');
    //         console.log($document[0].getElementbyId('navbar');
    //         });
