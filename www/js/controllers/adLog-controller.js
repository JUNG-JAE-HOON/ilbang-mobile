angular.module('adLog-controller', [])
.controller('adReserveCtrl', function($scope, $http, $localstorage, $httpParamSerializerJQLike, $ionicScrollDelegate) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    $scope.page = 1;

    var listParam = { page: $scope.page, id: id }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/getAdLogList.php',
        data: $httpParamSerializerJQLike(listParam),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        // handle success things
        $scope.items = [];
        $scope.items = data.adLogList;

        $scope.noMoreItemsAvailable = false;

        if (data.paging.page >= data.paging.allPage ) {
           $scope.noMoreItemsAvailable = true;
        }

        $scope.$broadcast('scroll.infiniteScrollComplete');
    })

    $scope.loadMore = function() {
        $scope.page = $scope.page + 1;

        var myData = { page: $scope.page, id: id }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/getAdLogList.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.items = $scope.items.concat(data.adLogList);
            $scope.noMoreItemsAvailable = false;

            if (data.paging.page >= data.paging.allPage) {
               $scope.noMoreItemsAvailable = true;
            }

            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };
})

.controller('adUseCtrl', function($scope, $http, $localstorage, $httpParamSerializerJQLike, $ionicScrollDelegate) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    $scope.page = 1;

    var listParam = { page: $scope.page, id: id }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/getADUseList.php',
        data: $httpParamSerializerJQLike(listParam),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        // handle success things
        $scope.items = [];
        $scope.items = data.adUseList;

        if(data.adUseList != null) {
            $scope.noMoreItemsAvailable = false;

            if (data.paging.page > data.paging.allPage ) {
               $scope.noMoreItemsAvailable = true;
            }

            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })

    $scope.loadMore = function() {
        $scope.page = $scope.page + 1;

        var myData = { page: $scope.page, id: id }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/getADUseList.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.items = $scope.items.concat(data.adUseList);
            $scope.noMoreItemsAvailable = false;

            if (data.paging.page > data.paging.allPage) {
               $scope.noMoreItemsAvailable = true;
            }

            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };
})
