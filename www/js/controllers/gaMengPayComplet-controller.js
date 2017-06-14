angular.module('gaMengPayComplet-controller', [])
.controller('gaMengPayCompletCtrl', function($scope, $stateParams, $http,  $httpParamSerializerJQLike, $localstorage, $ionicPopup, $state) {

    var myData = {
        log_no  : $stateParams.log_no
    }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/viewPayLog.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

        $scope.minusPoint     = data.minusPoint;
        $scope.remainderPoint = data.balancePoint;
        $scope.payAmt         = data.payAmt;

    }).error(function (data, status, headers, config) {
         // handle error things
    });
});
