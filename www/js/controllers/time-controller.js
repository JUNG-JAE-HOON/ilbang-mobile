angular.module('time-controller', [])

.controller('TimeCtrl', function($scope) {

  $scope.timeList = [
    { text: "오전", checked: false },
    { text: "오후", checked: false },
    { text: "저녁", checked: false },
    { text: "새벽", checked: false },
    { text: "오전~오후", checked: false },
    { text: "오후~저녁", checked: false },
    { text: "저녁~새벽", checked: false },
    { text: "새벽~오전", checked: false },
    { text: "풀타임", checked: false }
  ];

  // 
  // $scope.pushNotification = { checked: true };
  // $scope.emailNotification = 'Subscribed';

  $scope.updateSelection = function(position, itens, title) {
      angular.forEach(itens, function(subscription, index) {
          if (position != index)
              subscription.checked = false;
              $scope.selected = title;
          }
      );
  }
});
