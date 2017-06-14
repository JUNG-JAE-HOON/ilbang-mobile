angular.module('getEuidMatchingList-controller', [])

.controller('getEuidMatchingListCtrl', function($scope,$ionicPopup,$http,$httpParamSerializerJQLike,$localstorage,$state) {

        // 중하단 배너 이미지 랜덤으로 보여주는 스크립트
$scope.alertCount = 0;
  // 팝업
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
        //  alert('로그인 하세요.');
        $scope.alert();
         return ;
       }

      $scope.page   = 0;

      $scope.items  = [];
/*
      if ($localstorage.get("id") ==  undefined ) {
        $scope.noMoreItemsAvailable = true;
        alert('로그인 하세요.');
        return ;
      } else {
        $scope.euid = $localstorage.get("id");
        $scope.kind = $localstorage.get("kind");
      };
*/
      $scope.loadMore = function() {
        $scope.page = $scope.page +1;
        var myData = {
            page: $scope.page,
            euid: $scope.euid
        }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/getEuidMatchingList.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {

            //console.log(JSON.stringify(data));
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
                  template:'<div class="tc f12"><span><b>'+"구직자의 구직신청이 아직 없습니다."+'</b></span><br>',

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
             // handle error things
        });

      };

        $scope.page = 0;
        $scope.items = [];
        $scope.loadMore();
  
});
