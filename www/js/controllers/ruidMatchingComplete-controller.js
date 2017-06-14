angular.module('ruidMatchingComplete-controller', [])

.controller('ruidMatchingCompleteCtrl', function($scope,$ionicPopup, $http,$localstorage, $httpParamSerializerJQLike,$state) {
  // 내 회사 목록

  $scope.alertCount = 0;
  $scope.alert = function(){
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


  if($localstorage.get("auto")=="true"){
    $scope.ruid        = $localstorage.get("id");
    $scope.kind       = $localstorage.get("kind");
    $scope.member_no  = $localstorage.get("no");
    $scope.valid_no   = $localstorage.get("valid_no");

   }else{
     $scope.ruid        = sessionStorage.getItem("id");
     $scope.kind       = sessionStorage.getItem("kind");
     $scope.member_no  = sessionStorage.getItem("no");
     $scope.valid_no   = sessionStorage.getItem("valid_no");
   }
   if ($scope.ruid ==  undefined ) {
     $scope.noMoreItemsAvailable = true;
     $scope.alert();
     return ;
   }



/*
  if ($localstorage.get("id") ==  undefined ) {
    $scope.noMoreItemsAvailable = true;
    alert('로그인 하세요.');
    return ;
  } else {
    $scope.ruid = $localstorage.get("id"); // 여기다 로그인한 아이디 넣음.
    $scope.kind = $localstorage.get("kind");
  };
*/
  $scope.page = 0;

  $scope.items = [];

  $scope.loadMore = function() {
    $scope.page = $scope.page +1;
    var myData = {
      page: $scope.page,
      ruid: $scope.ruid
    }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/getRuidMatchingCompleteList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        //alert(JSON.stringify(data.listData));
        $scope.items = $scope.items.concat(data.listData);
        $scope.noMoreItemsAvailable = false;
        $scope.allPostCount = data.paging.allPost;
        if (data.paging.page >= data.paging.allPage) {
           $scope.noMoreItemsAvailable = true;
        }
        if(data.paging.allPost ==  0){
          if($scope.alertCount == 0){
            var confirmPopup = $ionicPopup.confirm({
              cssClass:'estiPop',
              title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
              template:'<div class="tc f12"><span><b>'+"구직신청이 아직 수락 전 이거나, 구직신청이 없습니다.<br>구직신청을 확인해 주세요."+'</b></span><br>',

              buttons: [{
                text: '나중에 하기',
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
