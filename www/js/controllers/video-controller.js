angular.module('video-controller',[])
.controller('videoCtrl', function($scope,$ionicHistory) {
  $scope.test=function(){
    $ionicHistory.goBack();
  }
});
