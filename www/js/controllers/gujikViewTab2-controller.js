angular.module('gujikViewTab2-controller', [])
.controller('gujikViewTab2Ctrl', function($scope, $location, $http, $httpParamSerializerJQLike, $state,$stateParams) {
  $scope.items = [];

  var myData = {
    no:  $stateParams.no
  }
  //a lert($stateParams.no)  ;

  $http({
      method: 'POST',
      url: 'http://il-bang.com/ilbang_pc/ionic/http/viewGujikInfo.php',
      data: $httpParamSerializerJQLike(myData),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function (data, status, headers, config) {
      $scope.items = data.listData;
      //alert(JSON.stringify($scope.items));
      //alert($scope.items[0].title);
  }).error(function (data, status, headers, config) {

  });
});
