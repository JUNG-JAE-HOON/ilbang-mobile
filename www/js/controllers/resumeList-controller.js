angular.module('resumeList-controller', [])
.controller('resumeListCtrl', function($state, $scope,$ionicPopup, $localstorage,$ionicModal,$httpParamSerializerJQLike, $http, ionicDatePicker, $timeout ,$ionicHistory,$stateParams ) {

  if($localstorage.get("auto")=="true"){
    $scope.uid        = $localstorage.get("id");
    $scope.kind       = $localstorage.get("kind");
    $scope.member_no  = $localstorage.get("no");
    $scope.valid_no   = $localstorage.get("valid_no");
  }else{
    $scope.uid        = sessionStorage.getItem("id");
    $scope.kind       = sessionStorage.getItem("kind");
    $scope.member_no  = sessionStorage.getItem("no");
    $scope.valid_no   = sessionStorage.getItem("valid_no");
  }



  $scope.alertCount = 0;
  $scope.loginAlertCount = 0;
  $scope.page = 0;
  $scope.myGujikList = [];
  $scope.loadMore = function() {
if($scope.mode!='write'){
    $scope.page = $scope.page +1;

    var myData = {
      uid    : $scope.uid,
      page   : $scope.page
    }

   $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/getMyGujikList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

        //alert(JSON.stringify(data.listData));
        $scope.myGujikList = $scope.myGujikList.concat(data.listData);
        $scope.noMoreItemsAvailable = false;
        //alert(data.paging.page);
        // alert(data.paging.allPage);
        if (data.paging.page >= data.paging.allPage) {
           $scope.noMoreItemsAvailable = true;
        }
        $scope.allPost = data.paging.allPost;
        if($scope.uid ==undefined){
          if($scope.loginAlertCount == 0){
            $scope.logcheck();
            $scope.loginAlertCount = 1;
          }
        } else if(data.paging.allPost ==  0){
          if($scope.alertCount == 0){
            var confirmPopup = $ionicPopup.confirm({
              cssClass:'estiPop',
              title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
              template:'<div class="tc f12"><span><b>'+"이력서가 없습니다. 작성하시겠습니까?"+'</b></span><br>',

              buttons: [{
                text: '나중에 하기',
                type: 'button-default'
              },{
                text: '작성하기',
                type: 'button-default',
                onTap: function() {
                  $scope.gujikForm = {};
                  $state.go("gujik");
                }
              }]
            });
            $scope.alertCount = 1;
          }
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
         //$scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (data, status, headers, config) {
        // handle error things
    });
    }
  }

  $scope.logcheck = function(){
    if ($scope.uid ==  undefined ) {

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
      return ;
    }else{
      $scope.gujikForm = {};
      $state.go("gujik",{mode:'write'});
    }
  }

  $scope.alert = function(msg) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>'+msg+'</b></span><br>',

      buttons: [{
        text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
        type: 'button-default'
      }]

    });

  };
  $scope.deleteAlert = function(msg) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>'+msg+'</b></span><br>',

      buttons: [{
        text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
        type: 'button-default',
        onTap:function(){
          $scope.page = 0;
          $scope.myGujikList = [];
          $scope.loadMore();
        }
      }]

    });

  };
  $scope.delGujikForm = function(gujik_no) {

    var myData =  {
      no    : gujik_no
    }

    $http({
         method: 'POST',
         url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/delGujikForm.php',
         data: $httpParamSerializerJQLike(myData),
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).success(function (data, status, headers, config) {

       if (data.result == "0"){
         $scope.alert(data.msg);
         //alert(data.sql);
       } else if (data.result == "1") {
         $scope.deleteAlert(data.msg);

       }
         //$scope.$broadcast('scroll.infiniteScrollComplete');
     }).error(function (data, status, headers, config) {
         // handle error things
     });

  };

  $scope.selectDelegate = function(gujik_no) {
      var myData =  {
        no    : gujik_no,
        uid   : $scope.uid

      }


      $http({
           method: 'POST',
           url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/selectDelegate.php',
           data: $httpParamSerializerJQLike(myData),
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       }).success(function (data, status, headers, config) {

         if (data.result == "0"){
           $scope.alert(data.msg);
           //alert(data.sql);
         } else if (data.result == "1") {
           $scope.alert(data.msg);
           $scope.page = 0;
           $scope.myGujikList = [];
           $scope.loadMore();
         }
           //$scope.$broadcast('scroll.infiniteScrollComplete');
       }).error(function (data, status, headers, config) {
           // handle error things
       });
  }



    $scope.page = 0;
    $scope.myGujikList = [];
    $scope.loadMore();

})
