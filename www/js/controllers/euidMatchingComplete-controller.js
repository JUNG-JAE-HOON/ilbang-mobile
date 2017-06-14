angular.module('euidMatchingComplete-controller', [])

.controller('euidMatchingCompleteCtrl', function($scope,$ionicPopup,$http,$httpParamSerializerJQLike,$localstorage,$state) {
  // 팝업
  $scope.alertCount = 0;
  $scope.alert = function() {
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>로그인을 해주세요.</b></span><br>',

      buttons: [{
          text: '나중에 하기',
          type: 'button-ilbang'
      },{
        text: '로그인 하기',
        type: 'button-ilbang',
        onTap: function(){
          $state.go("login");
        }
      }]
    });

  };
      // 팝업

  if($localstorage.get("auto")=="true"){
    $scope.euid        = $localstorage.get("id");
    $scope.kind       = $localstorage.get("kind");
    $scope.member_no  = $localstorage.get("no");
    $scope.valid_no   = $localstorage.get("valid_no");
   }else{
     $scope.euid       = sessionStorage.getItem("id");
     $scope.kind       = sessionStorage.getItem("kind");
     $scope.member_no  = sessionStorage.getItem("no");
     $scope.valid_no   = sessionStorage.getItem("valid_no");
   }

   if ($scope.euid ==  undefined ) {
     $scope.noMoreItemsAvailable = true;
     $scope.alert();
     return ;
   }

  $scope.page = 0;
  //$scope.euid = ''; // 여기다 로그인한 아이디 넣음  .
  $scope.items = [];




  $scope.loadMore = function() {
    $scope.page = $scope.page +1;
    var myData = {
      page: $scope.page,
      euid: $scope.euid
    }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/getEuidMatchingCompleteList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        $scope.items = $scope.items.concat(data.listData);
        $scope.noMoreItemsAvailable = false;

        if (data.paging.page >= data.paging.allPage) {
           $scope.noMoreItemsAvailable = true;
        }
        $scope.allPost = data.paging.allPost;
        if(data.paging.allPost ==  0){
          if($scope.alertCount == 0){
            var confirmPopup = $ionicPopup.confirm({
              cssClass:'estiPop',
              title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
              template:'<div class="tc f12"><span><b>'+"내 직원 목록이 없습니다.<br>내 구인 신청 & 매칭목록을 확인해주세요."+'</b></span><br>',

              buttons: [{
                text: '확인',
                type: 'button-default'
              }]
            });
            $scope.alertCount = 1;
          }
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');

    }).error(function (data, status, headers, config) {

    });
  };

      $scope.page = 0;
      $scope.items = [];
      $scope.loadMore();
  
});
