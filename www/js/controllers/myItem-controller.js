angular.module('myItem-controller',[])
.controller('itemListCtrl', function($scope, $http, $httpParamSerializerJQLike,$state,$stateParams,$localstorage) {


    if($localstorage.get("auto")=="true"){
        $scope.uid        = $localstorage.get("id");
     }else{
       $scope.uid        = sessionStorage.getItem("id");
     }

  var myData = {
    id:  $scope.uid,
    device: device.platform
  }
  $scope.items = [];
  $http({
      method: 'POST',
      url: 'http://il-bang.com/ilbang_pc/ionic/http/myItemList.php',
      data: $httpParamSerializerJQLike(myData),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function (data, status, headers, config) {
      console.log(JSON.stringify(data));
      $scope.items = data;
      $scope.noMoreItemsAvailable = false;

  }).error(function (data, status, headers, config) {

  });
})
