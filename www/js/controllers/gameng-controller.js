angular.module('gameng-controller', [])
.controller('gamengCtrl', function($state, $localstorage, $scope, $http,$ionicPopover, $httpParamSerializerJQLike, $ionicPopup, $ionicModal, $stateParams, $ionicHistory) {
    $scope.alert = function(msg) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass: 'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
            template: '<div class="tc f12"><span><b>' + msg + '</b></span><br>',
            buttons: [{
                text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                type: 'button-default'
            }]
        });
    };

    if($localstorage.get("auto") == "true") {
        $scope.uid = $localstorage.get("id");
        $scope.kind = $localstorage.get("kind");
        $scope.member_no = $localstorage.get("no");
        $scope.valid_no = $localstorage.get("valid_no");
    } else {
        $scope.uid = sessionStorage.getItem("id");
        $scope.kind = sessionStorage.getItem("kind");
        $scope.member_no = sessionStorage.getItem("no");
        $scope.valid_no = sessionStorage.getItem("valid_no");
    }

    $scope.area_1st = "";
    $scope.area_2nd = "";
    $scope.items = [];
    $scope.page = 0;
    $scope.siName = "시";
    $scope.guName = "구";
    $scope.categoryName = "카테고리";

    $scope.gamengSiList = [
        { number: '10000', value: '전국' },
        { number: '1', value: '서울특별시' },
        { number: '907', value: '인천광역시' },
        { number: '1164', value: '광주광역시' },
        { number: '1420', value: '대전광역시' },
        { number: '1631', value: '대구광역시' },
        { number: '1923', value: '부산광역시' },
        { number: '2314', value: '울산광역시' },
        { number: '2422', value: '경기도' },
        { number: '3312', value: '강원도' },
        { number: '3641', value: '충청남도' },
        { number: '3950', value: '충청북도' },
        { number: '4219', value: '전라남도' },
        { number: '4687', value: '전라북도' },
        { number: '5128', value: '경상남도' },
        { number: '5709', value: '경상북도' },
        { number: '6296', value: '제주특별자치도' },
        { number: '7335', value: '해외' },
        { number: '7700', value: '세종특별자치시' }
    ];

    $scope.gamengGuList = [];
    $scope.categoryList = [
        { value: "전체", name: "전체" },
        { value: "음식", name: "음식" },
        { value: "카페/디저트", name: "카페/디저트" },
        { value: "패션", name: "패션" },
        { value: "헬스/레저", name: "헬스/레저" },
        { value: "교육", name: "교육" },
        { value: "주유/차량", name: "주유/차량" },
        { value: "뷰티/마사지", name: "뷰티/마사지" },
        { value: "마트/생활", name: "마트/생활" },
        { value: "숙박", name: "숙박" },
    ];

    $scope.siSelect = function(area_1st, area_1st_nm) {
        if($scope.categoryName == "카테고리") {
            $scope.categoryValue = "";
        } else {
            $scope.categoryValue = $scope.categoryName;
        }

        $scope.siName = area_1st_nm;
        $scope.guName = "구";
        $scope.area_1st = area_1st;
        $scope.area_2nd = "";
        $scope.page = 0;
        $scope.items = [];
        $scope.loadMore();
        $scope.closePopover('si');

        var myData = { siNo: $scope.area_1st, type: $scope.categoryValue };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/getGuList.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            if($scope.area_1st == "10000") {
                $scope.gamengGuList = [];
                $scope.guName = "구";
            } else {
                $scope.gamengGuList = [{ guNo: $scope.area_1st, guName: "전체" }];
                $scope.gamengGuList = $scope.gamengGuList.concat(data.listData);
            }
        });
    }

    $scope.guSelect = function(area_2nd, area_2nd_nm) {
        $scope.guName = area_2nd_nm;

        if($scope.guName == "전체") {
            $scope.area_1st = area_2nd;
            $scope.area_2nd = "";
        } else {
            $scope.area_2nd = area_2nd;
        }

        $scope.page = 0;
        $scope.items = [];
        $scope.loadMore();
        $scope.closePopover('gu');
    }

    $scope.categorySelect = function(category) {
        $scope.categoryName = category;
        $scope.page = 0;
        $scope.items = [];
        $scope.loadMore();
        $scope.closePopover('category');
    }

    $scope.loadMore = function() {
        $scope.page += 1;

        if($scope.categoryName == "카테고리" || $scope.categoryName == "전체") {
            $scope.categoryValue = "";
        } else {
            $scope.categoryValue = $scope.categoryName;
        }

        var myData = {
            page: $scope.page,
            lat: $localstorage.get('lat'),
            lng: $localstorage.get('lng'),
            area_1st: $scope.area_1st,
            area_2nd: $scope.area_2nd,
            type: $scope.categoryValue,
            uid: $scope.uid
        }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/getAffiliateList.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.items = $scope.items.concat(data.listData);
            $scope.noMoreItemsAvailable = false;

            if (data.paging.page >= data.paging.allPage) {
                $scope.noMoreItemsAvailable = true;
            }

            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    $scope.showGu = function(e) {
        if($scope.area_1st == "10000") {
            $scope.alert("'전국'은 '구'를 선택할 수 없습니다.");
        } else if($scope.gamengGuList.length == 0) {
            $scope.alert("'시'를 선택하세요.");
        } else {
            $scope.popoverGu.show(e);
        }
    }

    // 팝오버~~
    //시 템플릿
    $ionicPopover.fromTemplateUrl('templates/pointShop/gameng-local.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popoverSi = popover;
    });

    //구 템플릿
    $ionicPopover.fromTemplateUrl('templates/pointShop/gameng-local2.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popoverGu = popover;
    });

    //카테고리 템플릿
    $ionicPopover.fromTemplateUrl('templates/pointShop/gameng-category.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popoverCategory = popover;
    });

    $scope.openPopover = function() {
        $scope.popover.show();
    };

    $scope.closePopover = function(param) {
        if(param == "si") {
            $scope.popoverSi.hide();
        } else if(param == "gu") {
            $scope.popoverGu.hide();
        } else if(param == "category") {
            $scope.popoverCategory.hide();
        }
    };

    $scope.adminPoint = [{
        point1: "15,000",
        point2: "10,000",
        point3: "3,000",
        point4: "-2,500",
        point5: "7,500",
        point6: "12,500"
    }];

    $scope.code = "p0o9i8u7";
    $scope.phoneno = "010-8739-7594";
})
.controller('gamengSrchCtrl', function($state, $localstorage, $scope, $ionicModal, $http, $httpParamSerializerJQLike, $ionicHistory) {
    $scope.goMain = function() {
        $state.go("main.home");
    }

    $scope.goBack = function() {
        $ionicHistory.back();
    }

    $ionicModal.fromTemplateUrl('templates/pointShop/gameng-search.html', {
        scope: $scope,
        animation: 'slide-in-up',
        cache: false
    }).then(function(modal1) {
        $scope.gamengSrch = modal1;
    });

    $ionicModal.fromTemplateUrl('templates/pointShop/gameng-detail.html', {
        scope: $scope,
        animation: 'slide-in-up',
        cache: false
    }).then(function(modal) {
        $scope.gamengDetail = modal;
    });

    $scope.viewGameng = function(affiliate_no) {
        $scope.viewGameng1 = [];

        var myData = {
            no: affiliate_no,
            lat: $localstorage.get('lat'),
            lng: $localstorage.get('lng')
        }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/viewAffiliate.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.viewGameng1 = $scope.viewGameng1.concat(data.listData);
            $scope.view_affiliate_no = data.listData[0].no;
            $scope.lat=data.listData[0].lat;
            $scope.lng=data.listData[0].lng;
            $scope.type = data.listData[0].type;
        });

        $scope.gamengDetail.show();
    };

    $scope.viewSrch = function() {
        $scope.gamengSrch.show();
    };

    $scope.hideSrch = function() {
        $scope.gamengSrch.hide();
    };

    $scope.hideDetail = function() {
        $scope.gamengDetail.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.gamengDetail.remove();
    });

    $scope.loadRecmmndAffListPage = 0;
    $scope.recommndAffList = [];

    $scope.loadRecmmndAffList = function() {
        $scope.loadRecmmndAffListPage += 1;

        var myData = {
            page: $scope.loadRecmmndAffListPage,
            lat: $localstorage.get('lat'),
            lng: $localstorage.get('lng')
        }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/getRecmmndAffList.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.recommndAffList = $scope.recommndAffList.concat(data.listData);
            $scope.loadRecmmndAffListAv = false;

            if (data.paging.page >= data.paging.allPage) {
                $scope.loadRecmmndAffListAv = true;
            }

            $scope.$broadcast('scroll.infiniteScrollComplete1');
        });
    }

    $scope.currentLoc = "";

    $scope.goUserPay = function() {
        $scope.hideDetail();
        $state.go("gameng-admin",{ affiliate_no: $scope.view_affiliate_no });
    }

    $scope.goAdminPay = function() {
        $scope.hideDetail();
        $state.go("gameng-pay",{ affiliate_no:$scope.view_affiliate_no });
    }
});
