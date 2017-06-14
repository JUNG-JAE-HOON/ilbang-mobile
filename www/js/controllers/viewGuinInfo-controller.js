angular.module('viewGuinInfo-controller',[])
.controller('viewGuinInfoCtrl', function($scope, $location, $http, $httpParamSerializerJQLike, $state,$stateParams) {

    $scope.items = [];

    var myData = {
      no:  $stateParams.no
    }
    //alert($stateParams.no) ;

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/viewGuinInfo.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        $scope.items = data.listData;
        //alert(JSON.stri  ngify($scope.items));
        //alert($scope.items[0].title);
    }).error(function (data, status, headers, config) {

    });

})
