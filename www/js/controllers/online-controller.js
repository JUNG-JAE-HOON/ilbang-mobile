angular.module('online-controller', [])
.controller('onlineCtrl', function($scope, $ionicPopup, $location, $http, $httpParamSerializerJQLike, $state, $stateParams, $localstorage) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    $scope.page = 0;
    $scope.showArea1 = false;
    $scope.showArea2 = false;
    $scope.area1Name = "시";
    $scope.area2Name = "구";
    $scope.area1 = "";
    $scope.area2 = "";

    $scope.getOnlineList = function(area1, area2) {
        $scope.page = 1;

        if($stateParams.no == 1) {
            $scope.title = "물류/유통";
        } else if($stateParams.no == 2) {
            $scope.title = "생산";
        } else if($stateParams.no == 3) {
            $scope.title = "항공 지상직";
        } else if($stateParams.no == 4) {
            $scope.title = "건설";
            $(".gear-ban").removeClass('dn');
        } else {
            $scope.title = "서비스";
        }

        

        var listParam = { page: $scope.page, val: $scope.title, area1: area1, area2: area2 }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/online/getOnlineList.php',
            data: $httpParamSerializerJQLike(listParam),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data) {
            $scope.items = null;
            $scope.items = data.onlineList;

            if(data.paging.onePage < data.paging.allPost) {
                $scope.noMoreItemsAvailable = false;

                if (data.paging.page >= data.paging.allPage ) {
                   $scope.noMoreItemsAvailable = true;
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        });
    }

    $scope.getOnlineList($scope.area1, $scope.area2);

    $scope.area1Button = function() {
        $scope.showArea1 = !$scope.showArea1;
        $scope.showArea2 = false;
    }

    $scope.area2Button = function() {
        $scope.showArea1 = false;
        $scope.showArea2 = !$scope.showArea2;
    }

    $scope.area1Select = function(no, name) {
        $scope.showArea1 = false;
        $scope.area1 = no;

        var myData = { area1: no }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/online/getCategory.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            if(no == "10000") {
                $scope.area2List = [];
                $scope.area1Name = "전국";
                $scope.area2Name = "전체";
            } else {
                $scope.area1Name = name;
                $scope.area2Name = "전체";

                $scope.area2List = [{ no: no, name: "전체" }];
                $scope.area2List = $scope.area2List.concat(data.area1List);
            }
        });

        $scope.getOnlineList(no);
    }

    $scope.area2Select = function(no, name) {
        $scope.showArea2 = false;
        $scope.area2 = no;
        $scope.area2Name = name;
        $scope.getOnlineList($scope.area1, no);
    }

    $scope.loadMore = function(area1, area2) {
        $scope.page = $scope.page +1;

        var myData = {
            page: $scope.page,
            val: $scope.title,
            area1: area1,
            area2: area2
        }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/online/getOnlineList.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            if(data.paging.onePage < data.paging.allPost) {
                $scope.items = $scope.items.concat(data.onlineList);
                $scope.noMoreItemsAvailable = false;

                if (data.paging.page >= data.paging.allPage) {
                    $scope.noMoreItemsAvailable = true;
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');
            } else {
                $scope.noMoreItemsAvailable = true;
            }
        });
    };

    $scope.area1List = [
        { no: '10000', name: '전국' },
        { no: '1', name: '서울특별시' },
        { no: '907', name: '인천광역시' },
        { no: '1164', name: '광주광역시' },
        { no: '1420', name: '대전광역시' },
        { no: '1631', name: '대구광역시' },
        { no: '1923', name: '부산광역시' },
        { no: '2314', name: '울산광역시' },
        { no: '2422', name: '경기도' },
        { no: '3312', name: '강원도' },
        { no: '3641', name: '충청남도' },
        { no: '3950', name: '충청북도' },
        { no: '4219', name: '전라남도' },
        { no: '4687', name: '전라북도' },
        { no: '5128', name: '경상남도' },
        { no: '5709', name: '경상북도' },
        { no: '7700', name: '세종특별자치시' },
        { no: '6296', name: '제주특별자치도' },
        { no: '7335', name: '해외' }
    ];
});
