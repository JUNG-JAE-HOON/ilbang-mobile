
angular.module('side-controller',["checklist-model"])


.controller('AttendeesCtrl', function($scope) {

  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, ');
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };

})

.controller('BannerCtrl', function($scope,$localstorage, $ionicPopup, $http,$httpParamSerializerJQLike, $ionicPopup,$ionicModal, $sce, $state,$stateParams) {


  var logins =  $scope.adLoginCheck();
  var correctBanner;
  var exampleBanner;
  var ad_no;
  // 팝업
  //경고 메세지  (baneer)
  $scope.warningAlert = function(msg) {
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
  //성공 메세지 모달 닫기  (banner)
  $scope.successAlert = function(msg) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>'+msg+'</b></span><br>',

      buttons: [{
        text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
        type: 'button-default',
        onTap: function() {
          // $scope.go("/urgent/map");
          // $location.path("/urgentMap");
          // $scope.test();
          console.log("확인");
          $scope.closeModal2();
          $scope.items = [];
          $scope.page =0;
          $scope.adBannerList();
        }
      }]
    });
  };


      // 팝업
  $scope.items = [];
  $scope.page =0;

  $scope.adBannerList = function(){
      $scope.page = $scope.page +1;
  var adListParam={
    uid: $scope.uid,
    page:$scope.page,
    type: 1
  }
    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/adList.php',
        data: $httpParamSerializerJQLike(adListParam),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

          $scope.items = $scope.items.concat(data.listData);
          //$scope.items.push(data.listData[0]);
          //$scope.items = data.listData;
          $scope.noMoreItemsAvailable = false;
          if (data.paging.page >= data.paging.allPage ) {
             $scope.noMoreItemsAvailable = true;
          }

        $scope.$broadcast('scroll.infiniteScrollComplete');
        //$scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }

  $scope.playBanner = function(num) {

    if(logins){
    var adListParam={
      no: num
    }
      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/adData.php',
          data: $httpParamSerializerJQLike(adListParam),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
        var banner = data.oneData;

        //
        ad_no=banner.no;
        $scope.url = $sce.trustAsResourceUrl("http://il-bang.com/mobile/ad/img/"+banner.ad_link);
        $scope.quiz=banner.quiz;
        $scope.title=banner.title;
        $scope.content=banner.content;

        // $scope.content='zz\n ddd\n zz';
        var example = banner.example.split(',');
        correctBanner=banner.correct;
        $scope.example1=example[0];
        $scope.example2=example[1];
        $scope.example3=example[2];
        $scope.example4=example[3];

      }).error(function (data, status, headers, config) {
          // handle error things
      });
        $scope.showModal2('templates/admoney/popover/banner-popover.html');
  }else{
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
  }
}


  $scope.showModal2 = function(templateUrl) {
  		$ionicModal.fromTemplateUrl(templateUrl, {
  			scope: $scope,
  			animation: 'slide-in-up'
  		}).then(function(modal) {
  			$scope.bannerModal = modal;
  			$scope.bannerModal.show();
  		});
  	}

    // Close the modal
    $scope.closeModal2 = function() {
      $scope.bannerModal.hide();
    };

  //문제선택
  $scope.choisBanner = function(number){
     exampleBanner=number;
  }
  //적립
  $scope.addPointBanner = function(){
     if(exampleBanner==correctBanner){

       var adListParam={
         uid: $scope.uid,
         ad_no: ad_no
       }
         $http({
             method: 'POST',
             url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/addPoint.php',
             data: $httpParamSerializerJQLike(adListParam),
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).success(function (data, status, headers, config) {

          // $scope.closeModal2();
          //banner
          $scope.successAlert(data);

         }).error(function (data, status, headers, config) {
              $scope.warningAlert(data);
         });

     }else{
       $scope.warningAlert("정답이 아닙니다.");
     }
  }


  var paramsNo = $stateParams.no;

  if(paramsNo!=0){
    $scope.playBanner(paramsNo);
  }





})


.controller('VideoCtrl', function($scope,$localstorage, $http,$httpParamSerializerJQLike, $ionicPopup,$ionicModal, $sce,$ionicPopup,$state) {
  //경고 메세지
  $scope.warningAlert = function(msg) {
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
  //성공 메세지 모달 닫기
  $scope.successAlert = function(msg) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>'+msg+'</b></span><br>',

      buttons: [{
        text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
        type: 'button-default',
        onTap: function() {
           // $scope.go("/urgent/map");
         // $location.path("/urgentMap");
         // $scope.test();
          console.log("확인");

          $scope.items = [];
          $scope.page =0;
          $scope.adVideoList();
          $scope.closeModal();
        }
      }]
    });
  };



var logins =  $scope.adLoginCheck();
  // 팝업
  var correct;
  var example;
  var ad_no;
  $scope.items = [];
  $scope.page =0;

  $scope.adVideoList = function(){
      $scope.page = $scope.page +1;
  var adListParam={
    uid: $scope.uid,
    page:$scope.page,
    type: 0
  }
  console.log(adListParam);
    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/adList.php',
        data: $httpParamSerializerJQLike(adListParam),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

          $scope.items = $scope.items.concat(data.listData);
          //$scope.items.push(data.listData[0]);
          //$scope.items = data.listData;
          $scope.noMoreItemsAvailable = false;
          if (data.paging.page >= data.paging.allPage ) {
             $scope.noMoreItemsAvailable = true;
          }

        $scope.$broadcast('scroll.infiniteScrollComplete');
        //$scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }






// 비디오 뷰 추가

$scope.showModal = function(templateUrl) {
		$ionicModal.fromTemplateUrl(templateUrl, {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.videoModal = modal;
			$scope.videoModal.show();
		});
	}

  // Close the modal
  $scope.closeModal = function() {
    $scope.videoModal.hide();
    setTimeout(function() {
      $scope.url = $sce.trustAsResourceUrl("#");
    }, 100);
  };

    $scope.playVideo = function(num) {

      console.log(logins);
      if(logins){
      var adListParam={
        no: num
      }
        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/adData.php',
            data: $httpParamSerializerJQLike(adListParam),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
          var video = data.oneData;

          //
          ad_no=video.no;
          $scope.url = $sce.trustAsResourceUrl(video.ad_link);
          $scope.quiz=video.quiz;
          $scope.title=video.title;
          var example = video.example.split(',');
          correct=video.correct;
          $scope.example1=example[0];
          $scope.example2=example[1];
          $scope.example3=example[2];
          $scope.example4=example[3];

        }).error(function (data, status, headers, config) {
            // handle error things
        });
          $scope.showModal('templates/admoney/popover/video-popover.html');

    }else{
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
    }
  }


    //문제선택
    $scope.chois = function(number){
       example=number;
    }
    //적립
    $scope.addPoint = function(){
       if(example==correct){

         var adListParam={
           uid: $scope.uid,
           ad_no: ad_no
         }
           $http({
               method: 'POST',
               url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/addPoint.php',
               data: $httpParamSerializerJQLike(adListParam),
               headers: {'Content-Type': 'application/x-www-form-urlencoded'}
           }).success(function (data, status, headers, config) {

             $scope.successAlert(data);

           }).error(function (data, status, headers, config) {
            //  $scope.closeModal();
              $scope.warningAlert(data);
           });

       }else{
         $scope.warningAlert("정답이 아닙니다.");
       }
    }



})

.controller('admoneyCtrl', function($scope, $localstorage, $http, $httpParamSerializerJQLike, $state) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
        var no = $localstorage.get("no");
    } else {
        var id = sessionStorage.getItem("id");
        var no = sessionStorage.getItem("no");
    }

    if(id == null) {
        $scope.showInfo = false;
    } else {
        $scope.showInfo = true;
        $scope.id = id;
    }

    var adParam = { uid : id, no: no };

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/admoney.php',
        data: $httpParamSerializerJQLike(adParam),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        var adMoney = data.adMoney;

        $scope.adMoney = adMoney.adPoint;
        $scope.costPoint = adMoney.costPoint;
    });
})
.controller('pointShopCtrl', function($scope, $localstorage, $http, $sce) {


    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
        var no = $localstorage.get("no");

    } else {
        var id = sessionStorage.getItem("id");
        var no = sessionStorage.getItem("no");
    }
//pointMall


    if(id!=undefined){
    var url="http://il-bang.com/ilbang_pc/ionic/test.php?id="+id;
    // alert(url);
    $scope.url = $sce.trustAsResourceUrl(url);
  }else{
  //  $scope.warningAlert("로그인이 필요합니다.");
  }


})
.controller('mainAdMoneyCtrl', function($scope, $localstorage, $http, $httpParamSerializerJQLike, $state) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
        var no = $localstorage.get("no");
    } else {
        var id = sessionStorage.getItem("id");
        var no = sessionStorage.getItem("no");
    }

    if(id == null) {
        $scope.showInfo = false;
    } else {
        $scope.showInfo = true;
        $scope.id = id;
    }

    setTimeout(function(){
      var adParam = { uid : id, no: no };

      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/admoney.php',
          data: $httpParamSerializerJQLike(adParam),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
          var adMoney = data.adMoney;

          $scope.adMoney = adMoney.adPoint;

      });
    }, 2000);
})
