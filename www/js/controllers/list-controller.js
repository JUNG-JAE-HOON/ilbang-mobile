

angular.module('list-controller',[])
.controller('ListCtrl', function($scope) {
    $scope.groups = [];

    for(var i=0; i<9; i++) {
        $scope.groups[i] = {
            name: i,
            items: [],
            titles: [],
            show: false
        };

        switch (i) {
          case 0:
            $scope.groups[i].titles.push('1. 일방이란 무엇인가요?');
            $scope.groups[i].items.push('- ‘일방’은 단기∙일용직 전문 구인구직 앱으로써 서로의 조건에 맞는 구인자와 구직자만을 연결하는 맞춤 연결 서비스를 기본 모토로 하고 있습니다.');
            break;
          case 1:
            $scope.groups[i].titles.push('2. 수수료는 얼마인가요?');
            $scope.groups[i].items.push('- ‘일방’의 구인∙구직 활동은 무료입니다. 단, 추가 기능 이용시 요금이 부과됩니다.');
            break;
          case 2:
            $scope.groups[i].titles.push('3. 어떻게 구인∙구직을 하는 건가요?');
            $scope.groups[i].items.push('- 구인자가 구인정보를 등록하면 일시∙장소∙급여 등의 조건에 부합하는 구직자가 매칭리스트에 노출됩니다. 구직자가 구인정보를 선택하면 구인자의 정보와 구직자의 정보가 쌍방에 공개됩니다. 이후 카카오톡을 통해 양측에서 확인하면 됩니다.');
            break;
          case 3:
            $scope.groups[i].titles.push('4. AD머니란 무엇인가요?');
            $scope.groups[i].items.push('- AD머니는 ‘일방’앱에서 사용할 수 있는 포인트로 일방 소개 동영상과 제휴 업체들의 광고배너 확인 시 적립 할 수 있습니다. 이렇게 적립한 AD머니로 스타벅스∙GS25∙롯데리아∙엔젤리너스 등 20개 업체의 모바일 쿠폰을 구매하여 자유롭게 사용할 수 있습니다. AD머니와 현금의 비율은 1:1입니다.');
            break;
          case 4:
            $scope.groups[i].titles.push('5. ‘긴급 구인’이란 무엇인가요?');
            $scope.groups[i].items.push('- ‘긴급 구인’이란 일을 가기로 한 구직자가 예기치 못한 사정으로 출근하지 못할 경우 해당 업체 주변의 구직자들에게 업무와 시간∙급여 등의 구인 정보를 즉시 발송하는 서비스입니다.');
            break;
          case 5:
            $scope.groups[i].titles.push('6. ‘내 평가보기’란 무엇인가요?');
            $scope.groups[i].items.push('- 구직자와 구인자의 연결 후 구직자는 구인자에 대한 평가를, 구인자는 구직자에 대한 평가를 할 수 있습니다. ‘내 평가보기’는 현재 자신의 평가 지수를 확인하는 것으로 평가가 높을 경우 여러가지 혜택이 있습니다.');
            break;
          case 6:
            $scope.groups[i].titles.push('7. ‘열람 서비스’란 무엇인가요?');
            $scope.groups[i].items.push('- ‘열람 서비스’란 구인자가 아직 일자리를 선택하지 않은 구직자의 정보를 확인할 수 있는 서비스로 구인정보를 등록하기 전 혹은 등록한 이후에 추가로 인원이 필요할 경우 구인자가 직접 인력을 찾을 수 있게 하는 서비스입니다.');
            break;
          case 7:
            $scope.groups[i].titles.push('8. 미성년자도 가입이 가능한가요?');
            $scope.groups[i].items.push('- 미성년자도 가입이 가능합니다. 단, 아르바이트 시에는 보호자의 동의가 있어야 가능합니다.');
            break;
          case 8:
            $scope.groups[i].titles.push('9. 업무제휴는 무엇인가요?');
            $scope.groups[i].items.push('- 업무제휴는 AD머니 적립관의 광고배너 등록과 모바일 쇼핑몰 상품등록 이렇게 크게 두가지로 나뉩니다.\n'
                                        +'광고배너 등록은 해당업체의 광고를 배너형태로 등록하는 것으로써 AD머니를 적립하기 위해 해당 광고를 시청할 수 있도록 합니다.\n'
                                        +'모바일 쇼핑몰 상품등록은 ‘일방’ 앱내의 모바일 쇼핑몰에 해당 업체 상품의 모바일 쿠폰을 등록하여 판매할 수 있도록 합니다.');
            break;
        }


    }

    $scope.toggleGroup = function(group) {
        group.show = !group.show;
    };

    $scope.isGroupShown = function(group) {
        return group.show;
    };
})
.controller('ListCtrl2', function($scope) {
    $scope.groups = [];

    for(var i=0; i<1; i++) {
        $scope.groups[i] = {
            name: i,
            // items: [],
            show: false
        };

        // for(var j=0; j<4; j++) {
            // $scope.groups[0].items.push('서울특별시');
            // $scope.groups[0].items.push('대구광역시');
            // $scope.groups[0].items.push('광주광역시');
            // $scope.groups[0].items.push('부산광역시');
        // }
    }

    $scope.si = "시";
    $scope.gu = "구";

    var noti = function(message){
      var confirmPopup = $ionicPopup.confirm({
          cssClass: 'urgentPop',
          title: '<h4 class="urgent123" style="background-color:#eb5f43; color:white">알림</h4>',
          template:'<ul class="popupUl"><li><p>'+message+'</p></li></ul>',
          buttons: [{
              text: '확인',
              type: 'button-default'
          }]
      });
    }
    $scope.toggleGroup = function(group) {
        group.show = !group.show;

        $scope.SeoulList = function(group) {
            return false;
        };

        $scope.BusanList = function(group) {
            return false;
        };
    };

    $scope.isGroupShown = function(group) {
        return group.show;
    };

    $scope.Seoul = function(group) {
        group.show = !group.show;
        $scope.si = "서울특별시";
        noti("서울특별시");

        $scope.SeoulList = function(group) {
            return true;
        };
    };

    $scope.Busan = function(group) {
        group.show = !group.show;
        $scope.si = "부산광역시";
        noti("부산광역시");

        $scope.BusanList = function(group) {
            return true;
        };
    }
})


.controller('customersCtrl', function($scope, $http, $httpParamSerializerJQLike, $ionicScrollDelegate) {
    $scope.page  = 1;


      $scope.items = [];

  $scope.loadMore = function() {

    $scope.page = $scope.page +1;
    var myData = {
      page: $scope.page
    }
    //$scope.items = [];

    $http({
        method: 'POST',
        url: 'http://il-bang.com/mobile/ajax/getScrollData.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        // handle success things
        //$scope.items = data.listData;
        //$scope.items.push(data.listData[0]);
        $scope.items = $scope.items.concat(data.listData);
        $scope.noMoreItemsAvailable = false;

        if (data.paging.page == data.paging.allPage) {
           $scope.noMoreItemsAvailable = true;
        }

        $scope.$broadcast('scroll.infiniteScrollComplete');
        //$scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }

})
