angular.module('gaMengUserLog-controller', [])
.controller('gaMengUserLogCtrl', function($scope, $stateParams, $http,  $httpParamSerializerJQLike, $localstorage, $ionicPopup, $state) {

  $scope.page = 0;
  $scope.items = [];

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


   // test
   //$scope.uid = 'p20513';


  $scope.loadMore = function() {

    if($scope.uid == "" || $scope.uid == null) $scope.alert("로그인 하세요.");
    $scope.page = $scope.page +1;
    var myData = {
      page  : $scope.page,
      uid   : $scope.uid,
      lat   : $localstorage.get('lat'),
      lng   : $localstorage.get('lng')
    }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/getUserLogList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        // handle success things
        $scope.items = $scope.items.concat(data.listData);
        $scope.noMoreItemsAvailable = false;

        if (data.paging.page >= data.paging.allPage) {
           $scope.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');

    }).error(function (data, status, headers, config) {
        // handle error things
    });
  };
});
