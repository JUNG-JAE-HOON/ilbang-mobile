
angular.module('main-controller',["checklist-model"])

.controller('LoginCtrl', function($scope,$ionicPopup, $http,$httpParamSerializerJQLike,$localstorage,$state,$ionicHistory,$cordovaInAppBrowser,$window) {
  // 팝업

  $scope.coushot = function(){
    if(device.platform == "Android"){
      window.open("https://play.google.com/store/apps/details?id=com.coushot.bsub2.deviltempatation1&hl=ko", '_system');
    }else if(device.platform=="iOS"){
      $scope.alert("아이폰은 출시 준비중입니다.");
    }
  }
  $scope.myGoBack = function(){
    
    var s = $ionicHistory.currentStateName();
    if((s == "eeTabs.eeTab1") || (s == "eeTabs.eeTab2") || (s == "eeTabs.eeTab3") || (s == "eeTabs.eeTab4") || (s == "erTabs.erTab1") || (s == "erTabs.erTab2") || (s == "erTabs.erTab3") || (s == "erTabs.erTab4")){
      $state.go("main.home");
    }else{
      $window.history.go(-1);
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
      // 팝업
      $scope.alertIn = function(msg,id) {
        var confirmPopup = $ionicPopup.confirm({
          cssClass:'estiPop',
          title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
          template:'<div class="tc f12"><span><b>'+msg+'</b></span><br>',

          buttons: [{
            text: '인증하기',
            type: 'button-default',
            onTap: function(){
              window.open('http://il-bang.com/ilbang_pc/ionic/ionic_in.php?id='+id, '_system');
            }
          },{
            text: '나중에 하기',
            type: 'button-default'
          }]

        });

      };




  var auto = $localstorage.get["auto"];
  if(!auto){
     $scope.auto= [false];
   }
  // $scope.auto =  $localstorage.get('auto');
  // // $scope.autoCheck = $localstorage.get('auto');
  // if(!$scope.auto){
  //   $scope.auto=false;
  // }

    var getToken;
    $scope.login = function(){


      //경훈 수정
      //serve에서 작동 안해서 로그인이 안되어서 주석

        // FCMPlugin.getToken(
        //             function(token){
        //
        //               var loginData = {
        //                 type : "1",                                        //앱 실행 업로드 표시
        //                 id: $scope.id,                                     //아이디
        //                 token: encodeURI(String(token))                    //FCMToken
        //               };
        //               $http({
        //                   method: 'POST',
        //                   url: 'http://il-bang.com/ilbang_pc/ionic/http/member/login.php',
        //                   data: $httpParamSerializerJQLike(loginData),
        //                   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //               }).success(function (data, status, headers, config) {
        //                  console.log('FCM Token succese');
        //               }).error(function (data, status, headers, config) {
        //                   alert("서버 오류 입니다.");
        //               });
        //             },
        //             function(err){
        //               console.log('error retrieving token: ' + err);
        //             }
        //           );



      var loginData = {
        id: $scope.id,
        pw: $scope.pw
      };
      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/member/login.php',
          data: $httpParamSerializerJQLike(loginData),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {

         if(data.no !="no"){
           console.log($scope.auto);
           $localstorage.set('auto', $scope.auto[$scope.auto.length-1]);
           console.log($localstorage.get("auto")+"  is local");
           if($localstorage.get("auto")=="true"){
              $localstorage.set('no',data.no);
              $localstorage.set('id',data.id);
              $localstorage.set('kind',data.kind);
              $localstorage.set('valid_no',data.valid_no);
              $localstorage.set('valid',data.valid);

              // console.log($localstorage.get("id")+' is local');
              // console.log($localstorage.get("kind")+' is local');
              // console.log($localstorage.get("no")+' is local');
              // console.log($localstorage.get("valid_no")+' is local');
              // console.log($localstorage.get("valid")+' is local');

            }else{
              sessionStorage.setItem("no", data.no);
              sessionStorage.setItem("id", data.id);
              sessionStorage.setItem("kind", data.kind);
              sessionStorage.setItem("valid_no", data.valid_no);
              sessionStorage.setItem('valid',data.valid);
              // console.log(sessionStorage.getItem("id")+' is seesion');
              // console.log(sessionStorage.getItem("kind")+' is seesion');
              // console.log(sessionStorage.getItem("no")+' is seesion');
              // console.log(sessionStorage.getItem("valid_no")+' is seesion');
              // console.log(sessionStorage.getItem("valid")+' is local');

              //  domain이란 키(key) 값을 사용하여 해당 텍스트를 저장함
              // console.log(sessionStorage.getItem("domain"))
              // 키에 저장된 값을 반환. 여기서는 webisfree.com 출력됨
              // sessionStorage.removeItem("domain");
            }






            $state.go("main.home");
         }else{
          $scope.alert(data.message);
        }

      }).error(function (data, status, headers, config) {
          $scope.alert("서버 오류 입니다.")
      });
    }

    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
        var no = $localstorage.get("no");
        var kind=$localstorage.get('kind');
        var valid=$localstorage.get('valid');

    } else {
        var id = sessionStorage.getItem("id");
        var no = sessionStorage.getItem("no");
        var kind=sessionStorage.getItem('kind');
        var valid=sessionStorage.getItem('valid');
    }


    $scope.loginCheck = function(){
          if(id!=undefined){
            //console.log("로그인");
            //if(valid=='yes'){
                // if(device.Platform == 'iOS'){
                        var options = {
                            clearcache: 'yes',
                            closebuttoncaption: '종료'
                        };
                        $cordovaInAppBrowser.open("http://il-bang.com/ilbang_pc/ionic/test.php?id="+id, '_blank', options)
                            .then(function(event) {
                                  // success
                            })
                            .catch(function(event) {
                                 // error
                            });
                // }else{
                //     window.open("http://il-bang.com/ilbang_pc/ionic/test.php?id="+id, '_system');
                // }
        //  }else if(valid == null || valid ==undefined){
        //    $scope.alert('쇼핑몰을 사용하시려면 다시 로그인을 해주세요.');
        //  }
        //  else {
        //    $scope.alertIn("본인 인증이 필요합니다.",id);
        //  }
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
            //console.log("로그인 아님");
          }
      }
})

.controller('logoutCtrl', function($scope,$ionicPopup, $localstorage, $state) {
  // 팝업
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
      // 팝업

    $scope.mainLogout = function(){

      if($localstorage.get("auto") == "true") {
          $scope.uid = $localstorage.get("id");
      } else {
          $scope.uid = sessionStorage.getItem("id");
      }
      console.log($scope.uid);
      if($scope.uid == undefined || $scope.uid == null || $scope.uid == 'null'){
        $scope.alert("로그인이 되어있지 않습니다.");
      }else{
        var confirmPopup = $ionicPopup.confirm({
          cssClass:'estiPop',
          title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
          template:'<div class="tc f12"><span><b>로그아웃 하시겠습니까?</b></span><br>',

          buttons: [{
              text: '취소',
              type: 'button-ilbang'
          },{
              text: '로그아웃',
              type: 'button-ilbang',
              onTap: function(){
                  $scope.logout();
              }
          }]
        });
      }
    }
    $scope.logout = function(){
        if($localstorage.get("auto") == "true") {
            $localstorage.removeItem("no");
            $localstorage.removeItem("id");
            $localstorage.removeItem("kind");
            $localstorage.removeItem("valid_no");
            $localstorage.removeItem("valid");
            $localstorage.removeItem("auto");
            // $localstorage.removeItem("mainEndDate");

            console.log($localstorage.get("id")+' is local');
            console.log($localstorage.get("kind")+' is local');
            console.log($localstorage.get("no")+' is local');
            console.log($localstorage.get("valid_no")+' is local');
            console.log($localstorage.get("valid")+' is local');
            console.log($localstorage.get("mainEndDate")+' is local');

        } else {
            sessionStorage.removeItem("no");
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("kind");
            sessionStorage.removeItem("valid_no");
            sessionStorage.removeItem('valid');
            // sessionStorage.removeItem("mainEndDate");

            console.log(sessionStorage.getItem("id")+' is session');
            console.log(sessionStorage.getItem("kind")+' is session');
            console.log(sessionStorage.getItem("no")+' is session');
            console.log(sessionStorage.getItem("valid_no")+' is seesion');
            console.log(sessionStorage.getItem("valid")+' is session');
            console.log(sessionStorage.getItem("mainEndDate")+' is session');
        }

        $scope.alert("로그아웃 되었습니다.");
        $state.go("login");
    }
})
.controller('mainNoticeCtrl', function($scope, $http, $httpParamSerializerJQLike, $stateParams) {
    $scope.noticeNumber = 219;

    var listParam = { val: "main" }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/getNoticeList.php',
        data: $httpParamSerializerJQLike(listParam),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        // handle success things
        $scope.items = [];
        $scope.items = data.noticeList;
    });
})
.controller('CountCtrl', function($scope, $http) {
  $http({
      method: 'POST',
      url: 'http://il-bang.com/ilbang_pc/ionic/http/main/mainCount.php',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function (data, status, headers, config) {
      // handle success things
     // console.log(data.todayguinCount);
      $scope.todayguinCount= data.todayguinCount;
      $scope.totalGuinCount= data.totalGuinCount;
      $scope.totaljoinCount= data.totaljoinCount;
  })

})

.controller('mainRecentCtrl', function($scope, $http, $ionicPlatform,$ionicPopup,$httpParamSerializerJQLike,$state, $stateParams, $localstorage,$ionicSlideBoxDelegate) {

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
   var listParam = { id: $scope.uid };
   $http({
       method: 'POST',
       url: 'http://il-bang.com/ilbang_pc/ionic/http/message/messageCheck.php',
       data: $httpParamSerializerJQLike(listParam),
       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function (data, status, headers, config) {
       if($scope.uid != null) {
           if(true == data){
             $scope.msgImagePath = "img/message/new-msg.png";
           }else{
             $scope.msgImagePath = "img/message/msg-icon.png";
           }

       }
   });

   $scope.recentTitle = "";
   if ($scope.kind == "general"){
     $scope.recentTitle = "최근 본 채용공고";
     $scope.mainCountTitle1="구직자";
     $scope.mainCountTitle2="채용공고";
     $scope.mainCountTitle3="전체매칭";
   } else {
     $scope.recentTitle = "최근 본 이력서";
     $scope.mainCountTitle1="구직자";
     $scope.mainCountTitle2="채용공고";
     $scope.mainCountTitle3="전체매칭";
   }
    var listParam = {
        uid: $scope.uid,
        kind: $scope.kind,
        mainCheck: $localstorage.get("mainDate")
    }

    $scope.isGeneral = false;
    $scope.isCompany = false;

    if ($scope.kind == "general"){
      $scope.isGeneral = true;
      $scope.isCompany = false;
    }
    else {
      $scope.isGeneral = false;
      $scope.isCompany = true;
    }





  setTimeout(function() {
      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/main/mainCount.php',
          data: $httpParamSerializerJQLike(listParam),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
          var dataCount = data;

          countCtrl("gujikCount",dataCount.gujikCount,2000);
          countCtrl("guinCount",dataCount.guinCount,2000);
          countCtrl("totaljoinCount",dataCount.totaljoinCount,2000);
          // $scope.gujikCount=dataCount.gujikCount;
          // $scope.guinCount=dataCount.guinCount;
          // $scope.joinCount=dataCount.joinCount;
          // $scope.joinCountOK=dataCount.joinCountOK;
          // $scope.newCount=dataCount.newCount;
          // $scope.totaljoinCount=dataCount.totaljoinCount;
      })

  }, 1000);


      function countCtrl(id, number, sec){
        $('#'+id)
          .prop('number', 10)
          .animateNumber(
            {
              number: number
            },
            sec
          );
      }

      // $scope.Test = function(){
      //   var R=Math.floor(Math.random()*3);
      //   var a = ["gubne_main.jpg","sulbing_main.jpg","chul_main.jpg"];
      //   var confirmPopup = $ionicPopup.confirm({
      //       cssClass: 'closePop',
      //       title: '<h4 class="fw">구인구직 앱 일방</h4>',
      //       template:'<ul class="popupUl noPadding"><li class="noPadding">'
      //       +'<a class="oh">'
      //       +'<img ui-sref="admoney" class="Rand_Banner padding w100 noPadding" src="img/'+a[R]+'" alt="" width="100%">'
      //       +'</a>'
      //       +'</li></ul>'
      //       ,
      //       buttons: [{
      //         text: '취소',
      //         type: 'button-default fo'
      //       },{
      //         text: '종료',
      //         type: 'button-default fo',
      //         onTap: function() {
      //          ionic.Platform.exitApp();
      //        }
      //       }]
      //     })
      // }
      $scope.kindCheck= function(){
      // console.log($scope.kind);
      //  if($scope.kind == "company"){
          $state.go("erTabs.erTab1");

        // }else{
        //   var confirmPopup = $ionicPopup.confirm({
        //                     cssClass: 'urgentPop',
        //                     title: '<h4 class="fo">회원 알림</h4>',
        //                     template:
        //                     '<ul class="popupUl">'
        //                       +'<li>'
        //                         +'<p>구인 서비스는 기업 회원만 이용가능합니다.</p>'
        //
        //                       +'</li>'
        //                     +'</ul>',
        //                     buttons: [{
        //                       text: '확인',
        //                       type: 'button-default',
        //                       onTap: function() {
        //                          // $scope.go("/urgent/map");
        //                        // $location.path("/urgentMap");
        //                        // $scope.test();
        //                       //  $state.go('eeTabs.eeTab1');
        //                       }
        //                     }]
        //                     });
        // }

      }



      //alert(JSON.stringify(listParam));
    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/main/getRecentData.php',
        data: $httpParamSerializerJQLike(listParam),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        // handle success things
        $scope.recentList = [];
        //alert(JSON.stringify(data.listData));
        $scope.recentList = data.listData;
    })





    var nowDate = new Date();
    var mainEndDate = new Date($localstorage.get("mainEndDate"));
    var ifMainEndDate = $localstorage.get("mainEndDate");

  if(nowDate>mainEndDate || ifMainEndDate == undefined || ifMainEndDate == 'null'){

    if($scope.kind=="company"){
      var mainPopupGuin = $ionicPopup.confirm({
            cssClass: 'main-pop-kind',
            // title: '<h4 class="urgent123" style="background-color:#eb5f43; color:white"></h4>',
            // title: '<h4 class="urgent123" style="background-color:#eb5f43; color:white"><img src="img/main-pop-gujik.png" width="100%"></h4>',
            template:'<img src="img/main-pop-guin.png" width="100%">'
                    +'<p for="" class="f16 pa vm kind-week"> <input type="checkbox" id="chec" class="fl">일주일동안 보지 않기 </p>',
            buttons: [{
                text: '사람 구하기',
                type: 'button-default',
                onTap: function() {
                    $state.go("erTabs.erTab1");
                }
            },{
              type: 'button-default',
              onTap: function() {
                if($('input:checkbox[id="chec"]').is(":checked") == true){
                  var now=new Date();
                  now.setDate(now.getDate()+7);
                  $localstorage.set('mainEndDate',now);
               }
              }
            }]
          });

        }else if($scope.kind=="general"){
          var mainPopupGujik = $ionicPopup.confirm({
                cssClass: 'main-pop-kind',
                // title: '<h4 class="urgent123" style="background-color:#eb5f43; color:white"></h4>',
                // title: '<h4 class="urgent123" style="background-color:#eb5f43; color:white"><img src="img/main-pop-gujik.png" width="100%"></h4>',
                template:'<img src="img/main-pop-gujik.png" width="100%">'
                        +'<p for="" class="f16 pa vm kind-week"> <input type="checkbox" id="chec" class="fl">일주일동안 보지 않기 </p>',
                buttons: [{
                    text: '일자리 구하기',
                    type: 'button-default',
                    onTap: function() {
                     $state.go("eeTabs.eeTab1");
                    }
                },{
                  type: 'button-default',
                  onTap: function() {

                            if($('input:checkbox[id="chec"]').is(":checked") == true){
                              var now=new Date();
                              now.setDate(now.getDate()+7);
                              $localstorage.set('mainEndDate',now);
                              console.log($localstorage.get('mainEndDate'));
                           }
                  }
                }]
              });
            }

            }



})
.controller('slideListCtrl', function($scope, $http, $ionicSlideBoxDelegate) {
    $scope.slideList=[];
    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/slideList.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
      // console.log(JSON.stringify(data));
      $scope.slideList = data.listData;
      $ionicSlideBoxDelegate.update();
    })
})
