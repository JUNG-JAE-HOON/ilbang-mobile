// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


angular.module('ilbang', ['ionic', 'ilbang.controllers', 'ilbang.services','ionic-datepicker','ngCordova'])       //gps를 가져오기 위해 ngCordova가 필수 입니다.

.run(function($ionicPlatform,$httpParamSerializerJQLike,$http,$ionicPopup,$state,$cordovaToast,$location,$ionicHistory,$cordovaGeolocation,$localstorage,$window) {




  var backbutton=0;
  $ionicPlatform.ready(function() {

        if($localstorage.get("auto") == "true") {
            var uid = $localstorage.get("id");
        } else {
            var uid = sessionStorage.getItem("id");
        }

        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat  = position.coords.latitude; //위도 값을 가져옵니다.
          var long = position.coords.longitude; //경도 값을 가져옵니다.
          $localstorage.set("lat",lat);
          $localstorage.set("lng",long);

          var locateParam = {
            latitude: lat,            //위도
            longitude: long,          //경도
            id: uid
          };
          $http({
              method: 'POST',
              url: 'http://il-bang.com/ilbang_pc/ionic/http/locate_data.php',
              data: $httpParamSerializerJQLike(locateParam),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (data, status, headers, config) {
          }).error(function (data, status, headers, config) {
          });
        });


      var update = function(data,platform){
        var confirmPopup = $ionicPopup.confirm({
              cssClass: "urgentPop",
              title: "<h4 class='urgent123' style='background-color:#eb5f43; color:white'>업데이트 알림</h4>",
              template:"<ul class='popupUl'><li><p>업데이트가 있습니다.<br>"+platform+" store에서 업데이트를 확인해 주세요.</p></li></ul>",
              buttons: [{
                text: '업데이트',
                type: 'button-default',
                onTap: function(){
                  window.open(data, '_system');
                }
              },{
                text: '나중에 하기',
                type: 'button-default'
              }]
        });
      }


      var deviceCheck = device.platform;

    var version={
      version: 14.9,
      iosVersion: 14.9,
      uid: uid,
      device: deviceCheck
    };
    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/appVersionCheck.php',
        data: $httpParamSerializerJQLike(version),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {


      /////작업하면서 주석 하시면 git에 올리지 말아주세요
      /////자동 업데이트 회장님이 중요하게 생각하시는 기능입니다.
      if(deviceCheck == "Android"){
        if (data == "x") {

        } else {
          if(data>version.version){
            update("https://play.google.com/store/apps/details?id=net.saltfactory.il_bang&hl=ko","google play");
          }
        }
      }else{
        if (data == "x") {

        } else {
          if(data>version.iosVersion){
            update("https://itunes.apple.com/us/app/%EC%9D%BC%EB%B0%A9/id1136479101?l=ko&ls=1&mt=8","App");
          }
        }
      }

    }).error(function (data, status, headers, config) {
        // handle error things
    });





    FCMPlugin.getToken(
                function(token){
                    var point={
                        device  : deviceCheck,
                        uid     : uid,
                        token   : token
                    };
                    $http({
                        method: 'POST',
                        url: 'http://ilbbang.com/appExecutePlusPoint.php',
                        data: $httpParamSerializerJQLike(point),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function (data, status, headers, config) {
                    }).error(function (data, status, headers, config) {
                    });
                },
                function(err){

                }
              );



// 종료 광고 팝업
    $ionicPlatform.registerBackButtonAction(function() {
    if ($location.path() === "/main/home" || $location.path() === "main/home") {



      // var R=Math.floor(Math.random()*3);
      //  var a = ["twosome-top.jpg","hosigi-top.jpg","ghouse-top.jpg"];
      var confirmPopup = $ionicPopup.confirm({
          cssClass: 'closePop eventPop',
          title: '<h4 class="fw">구인구직 앱 일방</h4>',
          template:'<ul class="popupUl noPadding"><li class="noPadding">'
          +'<a class="oh">'
          +'<img class="Rand_Banner padding w100 noPadding" src="img/ilbangEvent1.png" alt="">'
          +'</a>'
          +'</li></ul>'
          ,
          buttons: [{
            type: 'button-default fo',
            onTap: function() {
             $state.go("inform-ilbang")
           }
          },{
            text: '취소',
            type: 'button-default fo'
          },{
            text: '종료',
            type: 'button-default fo',
            onTap: function() {
             ionic.Platform.exitApp();
           }
          }]
        });
    } else if( $location.path()!="/main/home" && ($location.path() == "/employee/all" || $location.path() == "/employee/matching" ||$location.path() == "/employee/list" || $location.path() == "/employee/finish" ||
    $location.path()=="/employer/all" || $location.path()=="/employer/matching" || $location.path()=="/employer/list" || $location.path()=="/employer/finish")){
        $state.go("main.home");
    } else {
      if(backbutton == 0){
      $window.history.go(-1);
      setTimeout(function(){backbutton=0;}, 1000);
    }
      //navigator.app.goBack();
    }
  }, 100);
  var emNotiAlert = function(data){
    var confirmPopup = $ionicPopup.confirm({
        cssClass: 'urgentPop',
        title: '<h4 class="urgent123" style="background-color:#eb5f43; color:white">'+data.title+'</h4>',
        template:'<ul class="popupUl"><li><p>'+data.message1+'</p></li>'+
                              '<li>'+
                                  '<p class="di popupTitle">이름 :</p>'+
                                  '<p class="di"><span class="assertive bold">'+data.name+'</span></p>'+
                              '</li>'+
                              '<li>'+
                                  '<p class="di popupTitle">급여 :</p>'+
                                  '<p class="di"><span class="assertive bold">'+data.pay+'</span></p>'+
                              '</li>'+
                          '</ul>',
        buttons: [{
            text: '나중에 확인',
            type: 'button-default'
        },{
            text: '리스트 확인',
            type: 'button-default',
            onTap: function() {
                $state.go(data.go,{no:data.no});
            }
        }]
    });
  }


var notiAlert = function(data){
  var confirmPopup = $ionicPopup.confirm({
        cssClass: 'urgentPop',
        title: '<h4 class="urgent123" style="background-color:#eb5f43; color:white">'+data.title+'</h4>',
        template:'<ul class="popupUl tc"><li class="notiWidth"><p>'+data.message1+'<br>'+data.message2+'</p></li></ul>',
        buttons: [{
            text: '나중에 확인',
            type: 'button-default'
        },{
            text: '리스트 확인',
            type: 'button-default',
            onTap: function() {
                $state.go(data.go);
            }
        }]
    });
}

var insertNotiAlert = function(data){
  var confirmPopup = $ionicPopup.confirm({
        cssClass: 'urgentPop',
        title: '<h4 class="urgent123" style="background-color:#eb5f43; color:white">'+data.title+'</h4>',
        template:'<ul class="popupUl tc"><li class="notiWidth"><p>'+data.message1+'<br>'+data.message2+'</p></li></ul>',
        buttons: [{
            text: '나중에 확인',
            type: 'button-default'
        },{
            text: '내용 확인',
            type: 'button-default',
            onTap: function() {
                $state.go(data.go,{no:data.no});
            }
        }]
    });
}



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
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

      //serve에서 안먹혀서 주석
      // //FCM 토큰 가져오기
                if(uid !== ""){

                  FCMPlugin.getToken(
                              function(token){

                                var loginData = {
                                  type : "1",                                        //앱 실행 업로드 표시
                                  id: uid,
                                  token: encodeURI(String(token))
                                };
                                $http({
                                    method: 'POST',
                                    url: 'http://il-bang.com/ilbang_pc/ionic/http/member/login.php',
                                    data: $httpParamSerializerJQLike(loginData),
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                }).success(function (data, status, headers, config) {
                                  // console.log('FCM Token succese');
                                }).error(function (data, status, headers, config) {
                                    noti("서버 오류 입니다.");
                                });
                              },
                              function(err){
                                //console.log('error retrieving token: ' + err);
                              }
                            );

                          }
      //Notification받았을때 부분
      FCMPlugin.onNotification(
                    function(data){
                      if(data.wasTapped){           // 눌러서 실행인지
                          if(data.type=="big"){

                          }else if(data.type == "em"){
                            emNotiAlert(data);
                            //console.log("1");
                          }else if(data.type == "push"){
                            insertNotiAlert(data);
                          }else if(data.type == "executePoint"){

                          }else{
                            notiAlert(data);
                            //console.log("2");
                          }
                      }else{
                          if(data.type=="big"){

                          }else if(data.type == "em"){
                            emNotiAlert(data);
                            //console.log("3");
                          }else if(data.type == "push"){
                            insertNotiAlert(data);
                          }else if(data.type == "executePoint"){

                          }else{
                            notiAlert(data);
                            //console.log("4");
                          }
                      }
                    },
                    function(msg){
                      console.log('onNotification callback successfully registered: ' + msg);
                    },
                    function(err){
                      console.log('Error registering onNotification callback: ' + err);
                    }
                  );

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
$ionicConfigProvider.backButton.text('')
$ionicConfigProvider.views.swipeBackEnabled(false);

  $stateProvider
  .state('notice', {
      url: '/notice',
      templateUrl: 'templates/notice/notice.html'
  })

  .state('noticeView', {
      url: '/noticeView:no',
      templateUrl: 'templates/notice/noticeView.html'
  })

  .state('videoQuiz', {
      url: '/videoQuiz',
      templateUrl: 'templates/admoney/popover/video-popover.html'
  })



   // 탭메뉴 되는
      .state('tab', {
       url: '/mye',
      //  abstract: true,
       templateUrl: 'templates/emoney/myeTabs.html'

     })

     // Each tab has its own nav history stack:

     .state('tab.tab1', {
       url: '/tab1',
       views: {
         'tab1': {
           templateUrl: 'templates/emoney/myemoney1.html'
           // controller: '`'
         }
       }
     })

     .state('tab.tab2', {
         url: '/tab2',
         views: {
           'tab2': {
             templateUrl: 'templates/emoney/myemoney2.html'
             // controller: 'ChatsCtrl'
           }
         }
       })

   // 12일 정재훈 추가
   .state('login', {
       url: '/login',
       templateUrl: 'templates/Index.html'
     })

   // 아이디찾기
     .state('findId', {
       url: '/findId',
       templateUrl: 'templates/member/find-id.html'
     })
     .state('findPwd', {
       url: '/findPwd',
       templateUrl: 'templates/member/find-pwd.html'
     })




   // 구인자정보
   .state('infoEmployee', {
       url: '/info:no',
       params: {
        no : {
          value: 'defaultValue',
          squash: false
        }
       },
       templateUrl: 'templates/gujik/view/info-employee.html'
     })

     .state('guinViewTab1', {
         url: '/guin/view/tab1:no',
         templateUrl: 'templates/guin/view/tab1.html'
      })
      .state('guinViewTab2', {
          url: '/guin/view/tab2:no',
          templateUrl: 'templates/guin/view/tab2.html',
          controller: 'guinViewTab2Ctrl'
       })
       .state('guinViewTab3', {
           url: '/guin/view/tab3:no?:work_date?:work_join_list_no?:company_apply?:employ_apply',
           templateUrl: 'templates/guin/view/tab3.html'
        })
        .state('guinViewTab4', {
            url: '/guin/view/tab4:no?:work_date?:work_join_list_no',
            templateUrl: 'templates/guin/view/tab4.html'
        })
        .state('gujikViewTab1', {
            url: '/gujik/view/tab1:no',
            templateUrl: 'templates/gujik/view/tab1.html'
        })
        // 구인 상세정보 - '지도로 보기''의 지도화면
        .state('viewCompMap', {
          url: '/viewCompMap:page',
          params: {
            value:'defaultValue',
            squash: false
          },
          templateUrl: 'templates/gujik/view/view-map.html'
        })
        .state('gujikViewTab2', {
            url: '/gujik/view/tab2:no',
            cache: false,
            templateUrl: 'templates/gujik/view/tab2.html'
        })
        .state('gujikViewTab3', {
            url: '/gujik/view/tab3:no?:work_date?:work_join_list_no',
            templateUrl: 'templates/gujik/view/tab3.html'
        })
        .state('gujikViewTab4', {
            url: '/gujik/view/tab4:no?:work_date?:work_join_list_no',
            templateUrl: 'templates/gujik/view/tab4.html'
        })


   // 구직자정보
   .state('infoEmployer', {
       url: '/employer/info:no',
       templateUrl: 'templates/guin/view/info-employer.html'
     })

   // 구인자평가보기
   .state('estimationEe', {
       url: '/employee/estimation:work_join_list_no',
       templateUrl: 'templates/gujik/list/estimation-ee.html'
     })

    .state('resumeReview', {
         cache: false,
         url: '/resumeReview:work_join_list_no',
         templateUrl: 'templates/guin/list/resumeReview.html'
     })

     .state('employReview', {
          cache: false,
          url: '/employReview:work_join_list_no',
          templateUrl: 'templates/gujik/list/employReview.html'
      })


     .state('viewEmployReview', {

          url: '/viewEmployReview:employ_no',
          templateUrl: 'templates/gujik/view/viewEmployReview.html'
      })

      .state('viewResumeReview', {
           url: '/viewResumeReview:resume_no',
           templateUrl: 'templates/guin/view/viewResumeReview.html'
       })

     .state('estimationEr',  {
       url: '/employer/estimation:work_join_list_no',
       templateUrl: 'templates/guin/list/estimation-er.html'
     })
   // 고객센터
   .state('csCenter', {
       url: '/csCenter',
       templateUrl: 'templates/qna/qna-list.html'
     })
   // ad머
   .state('admoney', {
       url: '/admoney',
       templateUrl: 'templates/emoney/admoney.html'
     })
   .state('itemshop', {
       url: '/item',
       templateUrl: 'templates/item/itemshop.html'
     })
     .state('itemRead', {
        url: '/item/read',
        cache: false,
        templateUrl: 'templates/item/item-read.html'
     })
     .state('itemUrgent', {
        url: '/item/urgent',
        cache: false,
        templateUrl: 'templates/item/item-urgent.html'
     })
     .state('itemReview', {
       url:'/item/item-review',
       cache: false,
       templateUrl: 'templates/item/item-review.html'
     })

   // 이용 및 요금안내
   .state('costInfo', {
       url: '/costInfo',
       templateUrl: 'templates/etc/costInfo.html'
     })
   // 긴급구인 선택
   .state('urgentSlct', {
       url: '/urgent/select',
       cache: false,
       templateUrl: 'templates/urgent/urgentSelect.html'
     })
   // 긴급구인 리스트
   .state('urgentList', {
       url: '/urgent/list',
       templateUrl: 'templates/urgent/urgentList.html'
     })
   // 긴급구인 매칭
   .state('urgentM', {
       url: '/urgent/matching',
       templateUrl: 'templates/urgent/matching.html'
     })
     .state('urgentLoad', {
         url: '/urgent/load',
         templateUrl: 'templates/urgent/urgentLoad.html'
       })
// 긴급구인푸시 - 지도 화면
     .state('urgentMap', {
         url: '/urgent/map',
         templateUrl: 'templates/urgent/urgent-map.html'
       })


 // 이머니 충전
   .state('emoneyCharge', {
       url: '/emoney/charge',
       templateUrl: 'templates/emoney/emoney-charge.html'
     })
   // 이머니 결제
   .state('emoneyPay', {
       url: '/emoney/payment',
       templateUrl: 'templates/emoney/emoney-payment.html'
     })
   // 이머니 내역

   .state('logTab', {
       url: '/logTab',
       abstract: true,
           templateUrl: 'templates/emoney/log-tabs.html'
     })
     .state('logTab.logTab1', {
       url: '/logTab1',
       views: {
         'logTab1': {
           templateUrl: 'templates/emoney/log-tabs1.html'

         }
       }
     })
     .state('logTab.logTab2', {
       url: '/logTab2',
         views: {
           'logTab2': {
           templateUrl: 'templates/emoney/log-tabs2.html'

           }
         }
       })

     .state('logTab.logTab3', {
       url: '/logTab3',
       views: {
         'logTab3': {
           templateUrl: 'templates/emoney/log-tabs3.html'

         }
       }
     })
     // 이머니 내역 끝

     .state('main', {
         url: '/main',
         abstract: true,
           templateUrl: 'templates/panel/side-panel.html'
     })

     .state('main.home', {
       url: '/home',
       cache: false,
       views: {
         'menuContent' :{
           templateUrl: 'templates/main/home/side-home.html'
         }
       }
     })
     .state('main.homeRenew', {
       url: '/home-renew',
       cache: false,
       views: {
         'menuContent' :{
           templateUrl: 'templates/main/home/side-home-renew.html'
         }
       }
     })
     .state('main.test', {
       url: '/test',
       cache: false,
       views: {
         'menuContent' :{
           templateUrl: 'templates/main/home/main-test.html'
         }
       }
     })
     .state('sotong-test', {
         url: '/sotong-test',
         cache: false,
         templateUrl: 'templates/sotong-test.html'
       })
   // 이머니 내역
   .state('recomm', {
       url: '/emoney/recomm',
       cache: false,
       templateUrl: 'templates/emoney/recommender.html'
     })
// 내 신청서
     .state('myInfo', {
         url: '/myInfo',
         templateUrl: 'templates/member/my-info.html'
       })

      // .state('signUpChoice1', {
      //        url: '/member/choice1',
      //        templateUrl: 'templates/member/new-member/choice1.html'
      //    })
      .state('signUpChoice2', {
             url: '/member/choice2',
             templateUrl: 'templates/member/new-member/choice2.html'
         })
         // 본인 인증 - 일반
         .state('validPageComp', {
             url: '/validPageComp',
             cache: false,
             templateUrl: 'templates/member/new-member/valid-page-comp.html'
         })
         // 본인 인증 - 기업
         .state('validPageGeneral', {
             url: '/validPageGeneral',
             cache: false,
             templateUrl: 'templates/member/new-member/valid-page-general.html'
         })
         .state('generalFull', {
             url: '/member/generalFull',
             cache: false,
             templateUrl: 'templates/member/new-member/join-general-full.html'
         })

         .state('companyFull', {
             url: '/member/companyFull',
             cache: false,
             templateUrl: 'templates/member/new-member/join-company-full.html'
         })
        //  인증 마친 후 모달 뜨는 페이지 (일반)
         .state('validFinGeneral', {
             url: '/general/validFinish',
             cache: false,
             templateUrl: 'templates/member/new-member/valid-finish-gen.html'
         })
         //  인증 마친 후 모달 뜨는 페이지(기업)
          .state('validFinComp', {
              url: '/company/validFinish',
              cache: false,
              templateUrl: 'templates/member/new-member/valid-finish-comp.html'
          })

         .state('infoModify', {
             url: 'modify/:uid',
             params: {
              uid: {
                value:'defaultValue',
                squash: false
              }
             },
             templateUrl: 'templates/member/info-modify.html'

         })

   //       // 구인자 신청서 쓰기
   //       .state('guinStep1', {
   //           url: '/guinStep1',
   //           templateUrl: 'templates/form/guinWriteStep1.html'
   //       })

   // .state('guinStep2', {
   //     url: '/guinStep2',
   //     templateUrl: 'templates/form/guinWriteStep2.html'
   //  })

   //   .state('guinStep3', {
   //       url: '/guinStep3',
   //       templateUrl: 'templates/form/guinWriteStep3.html'
   // })


   .state('FAQList', {
   url: '/FAQList',
   templateUrl: 'templates/faq/FAQList.html'
     })
   .state('QNAWrite', {
   url: '/QNAWrite:no',
   templateUrl: 'templates/qna/qnaWrite.html'
  })
  .state('QNAView', {
     url: '/QNAView:no',
     templateUrl: 'templates/qna/qnaView.html'
       })


// 구인자 관련 리스트 탭
   .state('eeTabs', {
     cache: false,
      url: '/employee',
      abstract: true,
      templateUrl: 'templates/gujik/list/ee-tabs.html'
      })

.state('eeTabs.eeTab1', {
  cache: false,
    url: '/all:no',
    params: {
      value:'defaultValue',
      squash: false

    },
    views: {
      'ee1': {
      templateUrl: 'templates/gujik/list/new-ee-all.html'

      }
    }


  })

  .state('eeTabs.eeTab2', {
    cache: false,
    url: '/list',
      views: {
        'ee2': {
        templateUrl: 'templates/gujik/list/ee-list.html'
        }
      }
    })

  .state('eeTabs.eeTab3', {
    cache: false,
    url: '/matching',
    views: {
      'ee3': {
        templateUrl: 'templates/gujik/list/ee-matching.html'

      }
    }
  })
  // 구직자 매칭목록 - '지도로보기'의 지도화면
  .state('matchingListgMap', {
    url: '/matchingListgMap:type',
    cache: false,
    params: {
     page: {
       value:'defaultValue',
       squash: false
     }
    },
    templateUrl: 'templates/gujik/list/matching-map-view.html'
  })
  .state('eeTabs.eeTab4', {
    url: '/finish',
    cache: false,
    views: {
      'ee4': {
        templateUrl: 'templates/gujik/list/ee-fin.html'
      }
    }
  })


  // 구인자 관련 리스트 탭
     .state('erTabs', {
       cache: false,
        url: '/employer',
        abstract: true,
        templateUrl: 'templates/guin/list/er-tabs.html'
        })

  .state('erTabs.erTab1', {
    cache: false,
      url: '/all',
      views: {
        'er1': {
        templateUrl: 'templates/guin/list/new-er-all.html'

        }
      }

    })

    .state('erTabs.erTab2', {
      cache: false,
      url: '/list',
        views: {
          'er2': {
          templateUrl: 'templates/guin/list/er-list.html'
          }
        }
      })

    .state('erTabs.erTab3', {
      cache: false,
      url: '/matching',
      views: {
        'er3': {
          templateUrl: 'templates/guin/list/er-matching.html'

        }
      }
    })

    .state('erTabs.erTab4', {
      cache: false,
      url: '/finish',
      views: {
        'er4': {
          templateUrl: 'templates/guin/list/er-fin.html'

        }
      }
    })

// ad머니 탭

    .state('adTabs', {
      url: '/ad',
      // abstract: true,
      templateUrl: 'templates/admoney/ad-tabs.html',
      controller: 'AdLogCtrl'
    })

    .state('adTabs.video', {
      cache: false,
      url: '/video',
      views: {
        'video': {
          templateUrl: 'templates/admoney/video.html'
        }
      }
    })

    .state('adTabs.banner', {
      cache: false,
      url: '/banner:no',
      views: {
        'banner': {
          templateUrl: 'templates/admoney/banner.html'

        }
      }
    })
  .state('adApply', {
  url: '/ad/apply',
  templateUrl: 'templates/admoney/ad-apply.html'
    })


// 광고신청
    .state('applyFormTabs', {
      url: '/apply',
      abstract: true,
      templateUrl: 'templates/admoney/apply/apply-form.html'

    })

    .state('applyFormTabs.video', {
      url: '/video:no',
      views: {
        'video': {
          templateUrl: 'templates/admoney/apply-form/video-apply.html'

        }
      }
    })

    .state('applyFormTabs.banner', {
      url: '/banner:no',
      views: {
        'banner': {
          templateUrl: 'templates/admoney/apply-form/banner-apply.html'

        }
      }
    })
// 신청내역
    .state('applyLogTabs', {
      url: '/log',
      // abstract: true,
      templateUrl: 'templates/admoney/apply/apply-log.html'

    })

    .state('applyLogTabs.video', {
      url: '/video',
      cache: false,
      views: {
        'video': {
          templateUrl: 'templates/admoney/apply-log/video-log.html'

        }
      }
    })

    .state('applyLogTabs.banner', {
      url: '/banner',
      cache: false,
      views: {
        'banner': {
          templateUrl: 'templates/admoney/apply-log/banner-log.html'

        }
      }
    })



// ad로그
.state('adLogTabs', {
  url: '/adLog',
  // abstract: true,
  templateUrl: 'templates/admoney/ad-log-tabs.html',
  controller:'AdLogCtrl'
})

.state('adLogTabs.adLog1', {
  url: '/log1',
  cache: false,
  views: {
    'adLog1': {
      templateUrl: 'templates/admoney/ad-log1.html'

    }
  }
})

.state('adLogTabs.adLog2', {
  url: '/log2',
  cache: false,
  views: {
    'adLog2': {
      templateUrl: 'templates/admoney/ad-log2.html'

    }
  }
})
.state('adChange', {
url: '/ad/change',
templateUrl: 'templates/admoney/ad-change.html'
  })





// 달력테스트
.state('date', {
  url: '/date',
  templateUrl: 'templates/date.html'
})


     .state('inMain', {
        url: '/inMain',
        templateUrl: 'templates/in/inMain.html',
        controller: 'InCtrl'

     })


//gps 가져오는 화면
.state('locate', {
  url: '/locate/locate',
  templateUrl: 'templates/locate/locate.html',
  controller: 'GeoCtrl'
})
//inapp 결제 화면
.state('androidInapp', {
  url: '/inapp/android/android-inapp',
  templateUrl: 'templates/inapp/android/android-inapp.html'
})
.state('guinModify', {
  cache:false,
  url: '/guinModify:no',
  templateUrl: 'templates/guin/form/modify.html',
  controller: 'guinModifyCtrl'
})
.state('gujikModify', {
  cache:false,
  url: '/gujikModify:no',
  templateUrl: 'templates/gujik/form/modify.html'
})
.state('pointMall', {
  url: '/pointMall',
  templateUrl: 'templates/pointShop/point-mall.html'
})

.state('myItem', {
  url: '/myItem',
  cache: false,
  templateUrl: 'templates/item/show-my-item.html'
})
.state('cooperate', {
url: '/cooperate',
templateUrl: 'templates/cooperate/cooperate.html'
  })
.state('introIlbang', {
    url: '/intro',
    templateUrl: 'templates/intro-ilbang.html'
})

.state('service', {
    url: '/service',
    cache: false,
    templateUrl: 'templates/intro-service.html'
})
// 업무제휴
.state('ptn', {
    url: '/ptn',
    templateUrl: 'templates/admoney/ptn.html'
})
.state('hana', {
    url: '/hana',
    templateUrl: 'templates/hanacard.html'
})
.state('guin', {
    url: '/guin',
    cache: false,
    templateUrl: 'templates/guin/form/guin.html'
})
.state('gujik', {
    url: '/gujik',
    cache: false,
    templateUrl: 'templates/gujik/form/gujik.html'
})
.state('emergency', {
    url: '/emergency',
    templateUrl: 'templates/guin/form/emergency.html'
})
.state('onlineRc', {
    url: '/online',
    templateUrl: 'templates/online/online-rc.html'
})
.state('onlineSub', {
    url: '/onlineSub:no',
    templateUrl: 'templates/online/online-sub.html'
})
.state('inform-ilbang', {
    url: '/inform-ilbang',
    templateUrl: 'templates/inform-ilbang.html'
})
.state('air', {
    url: '/air.html',
    templateUrl: 'templates/online/air.html'
})
.state('estimate', {
    url: '/my-estimate',
    cache: false,
    templateUrl: 'templates/my-estimate.html'
})
.state('giga', {
    url: '/giga',
    templateUrl: 'templates/giga-page.html'
})
.state('add-info', {
    url: '/add-info',
    cache: false,
    templateUrl: 'templates/guin/form/add-info.html'
})
.state('em-add-info', {
    url: '/em-add-info',
    cache: false,
    templateUrl: 'templates/guin/form/em-add-info.html'
})
.state('gear-detail', {
    url: '/gearman',
    cache: false,
    templateUrl: 'templates/online/gearman.html'
})
// 가맹몰 페이지들
.state('gameng', {
    cache:false,
    url: '/gameng',
    templateUrl: 'templates/pointShop/gameng.html'
})
.state('gameng-admin', {
    cache:false,
    url: '/gameng-admin:affiliate_no',
    templateUrl: 'templates/pointShop/admin/pay-admin1.html'
})
.state('gameng-pay-fin', {
    cache:false,
    url: '/gameng-pay-fin:log_no',
    templateUrl: 'templates/pointShop/admin/pay-fin.html'
})
.state('gamengMap', {
  url: '/gameng-map:type',
  cache: false,
  params: {
   page: {
     value:'defaultValue',
     squash: false
   }
  },
  templateUrl: 'templates/pointShop/gameng-map.html'
})
.state('gameng-usage-detail', {
    cache: false,
    url: '/gameng-usage',
    templateUrl: 'templates/pointShop/usage-detail.html'
})
.state('gameng-pay', {
    cache:false,
    url: '/gameng-pay:affiliate_no',
    templateUrl: 'templates/pointShop/gameng-pay.html'
})
// 소통방
.state('sotong', {
    url: '/sotong',
    cache:false,
    templateUrl: 'templates/sotong.html'
})
.state('sotong-detail', {
    url: '/sotongDetail-:type?:no',
    cache: false,
    templateUrl: 'templates/sotong/view/sotong-detail.html'
})
.state('sotong-detailTest', {
    url: '/sotongDetailTest-:type?:no',
    cache: false,
    templateUrl: 'templates/sotong/view/sotong-detail-test.html'
})
.state('sotong-boardView', {
    url: '/sotongBoardView-:type?:no',
    cache: false,
    templateUrl: 'templates/sotong/view/sotongBoardView.html'
})
.state('sotong-boardList', {
    url: '/sotongBoardList:no',
    cache: false,
    templateUrl: 'templates/sotong/view/sotongBoardList.html'
})
.state('sotong-detailShowAll', {
    url: '/sotongDetailShowAll:no',
    cache: false,
    templateUrl: 'templates/sotong/view/sotong-detail-ShowAll.html'
})
.state('sotong-write', {
    url: '/sotongWrite-:type?:no',
    cache: false,
    templateUrl: 'templates/sotong/form/write-board.html'
})
.state('yoyang', {
    url: '/yoyang',
    cache:false,
    templateUrl: 'templates/yoyang-page.html'
})
.state('sotong-giga', {
    url: '/sotong-giga',
    cache:false,
    templateUrl: 'templates/sotong-giga.html'
})
.state('sotong-artist', {
    url: '/sotong-artist',
    cache:false,
    templateUrl: 'templates/sotong/view/sotong-artist.html'
})
.state('sotong-', {
    url: '/sotong-:type',
    cache:false,
    templateUrl: 'templates/sotong/view/sotong-list.html'
})
.state('sotong-yoyang', {
    url: '/sotong-yoyang',
    cache:false,
    templateUrl: 'templates/sotong/view/sotong-yoyang.html'
})
.state('sotong-ad', {
    url: '/sotong-ad',
    cache:false,
    templateUrl: 'templates/sotong/view/sotong-ad.html'
})
// .state('artist-apply', {
//     url: '/artist-apply:no',
//     cache:false,
//     templateUrl: 'templates/sotong/form/artist-apply.html'
// })
.state('apply-', {
    url: '/apply-:type?:memKind',
    cache:false,
    templateUrl: 'templates/sotong/form/artist-apply.html'
})
.state('sotong-apply', {
    url: '/sotong-apply',
    cache:false,
    templateUrl: 'templates/sotong/form/sotong-apply.html'
})

.state('wando', {
    url: '/wando',
    cache:false,
    templateUrl: 'templates/sotong/view/wando.html'
})
.state('message', {
    url: '/message',
    cache:false,
    templateUrl: 'templates/message.html'
})
.state('message-detail', {
    url: '/message-detail',
    // cache:false,
    templateUrl: 'templates/message-detail.html'
})
.state('raw', {
    url: '/raw',
    // cache:false,
    templateUrl: 'templates/raw.html'
})
.state('startup', {
    url: '/startup',
    // cache:false,
    templateUrl: 'templates/startup.html'
})
.state('su-apply', {
    url: '/su-apply',
    // cache:false,
    templateUrl: 'templates/startup-apply.html'
})
.state('slideCoffee', {
    url: '/slide-coffee',
    // cache:false,
    templateUrl: 'templates/slide-pages/slide-coffee.html'
})
.state('slidePoint', {
    url: '/slide-point',
    // cache:false,
    templateUrl: 'templates/slide-pages/slide-point.html'
})
.state('kind-select', {
    url: '/kind-select-:type',
    // cache:false,
    templateUrl: 'templates/sotong/form/kind-select.html'
})
.state('video', {
    url: '/video',
    // cache:false,
    templateUrl: 'templates/main/home/video.html'
})
.state('video-detail', {
    url: '/video-detail',
    // cache:false,
    templateUrl: 'templates/main/home/video-detail.html'
})
.state('kweek', {
    url: '/kweek',
    // cache:false,
    templateUrl: 'templates/main/kweek.html'
})
.state('consulting', {
    url: '/consulting',
    // cache:false,
    templateUrl: 'templates/main/consulting.html'
})
//  $urlRouterProvider.otherwise('main/home');
 $urlRouterProvider.otherwise('main/home');
});
