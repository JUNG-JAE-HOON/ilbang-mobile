angular.module('home-controller', [])
.controller('HomeCtrl', function($scope, $ionicPopover, $http, $localstorage) {
  //구직중

  




  $scope.numberCounter = function(target_frame, target_number) {
    var count = 0;
    var diff = 0;
    var target_count = parseInt(target_number);
    var timer = null;
    $scope.counter(count, diff, target_count, target_frame, timer);
  };

  $scope.counter = function(count, diff, target_count, target_frame, timer) {

      diff = target_count - count;

      if(diff > 0) {
          count += Math.ceil(diff / 5);
      }

       document.getElementById(target_frame).innerHTML  = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      if(count < target_count) {
          timer = setTimeout(function() { $scope.counter(count, diff, target_count, target_frame, timer); }, 20);
      } else {
          clearTimeout(timer);
      }
  };
  /*
  $( document ).ready(function() {
       $scope.numberCounter("guinCnt", 99999);
    $scope.numberCounter("gujikCnt", 333123213);
    $scope.numberCounter("guinComple", 3111313);
    $scope.numberCounter("gujikComple", 213213);
    $scope.numberCounter("newRecruit", 5343213);
  });
 */
})

.controller('PanelCtrl', function($scope, $localstorage, $state) {
    var kind = $localstorage.get("kind");

    $scope.estimation = function() {
        if(kind == "general") {
            $state.go("estimationEr");
        } else {
            $state.go("estimationEe");
        }
    }
})
