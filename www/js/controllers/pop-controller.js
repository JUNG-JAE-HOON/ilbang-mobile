angular.module('pop-controller',[])

.controller('PopCtrl',function($scope, $ionicPopup, $timeout, $http, $state, $localstorage, $httpParamSerializerJQLike) {

// Triggered on a button click, or some other target
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

$scope.showPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      }
    ]
  });



  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });

  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
 };
// 탈퇴사유 확인 팝업
$scope.withdrawalInner = function() {
  $scope.data = {};
  $scope.withdrawals = [
      { reason: "사용법이 어렵고 복잡합니다." },
      { reason: "다른 종류의 어플을 사용합니다." },
      { reason: "사용할 일이 없어서" },
      { reason: "개인정보 도용" }
  ];

  $scope.withdrawalSel = $scope.withdrawals[0];

  // An elaborate, custom popup

  var myPopup = $ionicPopup.show({
    cssClass:'withdrawalPop',
    title: '<h4><font color="#eb5f43">회원 탈퇴</font>하기</h4>',
    template: '<input type="text" ng-model="data.id" placeholder="아이디를 입력하세요." />'
              +'<input class="mt20" type="password" ng-model="data.pwd" placeholder="비밀번호를 입력하세요." />'
              +'<p class="tc mt30"><b class="f16">탈퇴사유 또는 불편사항을 선택해주세요.</b></p>'
              +'<select ng-model="withdrawalSel" ng-options="withdrawal.reason for withdrawal in withdrawals">'
              +'<option ng-repeat="withdrawal in withdrawals" ng-value="withdrawalSel.reason">{{ withdrawalSel.reason }}</option>'
              +'</select>',
    scope: $scope,
    buttons: [{
        text: '취소',
        type: 'button-default'
    }, {
        text: '확인',
        type: 'button-default',
        onTap: function(e) {
            if($localstorage.get("auto") == "true") {
                var uid = $localstorage.get("id");
            } else {
                var uid = sessionStorage.getItem("id");
            }

            var inputUid = $scope.data.id;
            var pwd = $scope.data.pwd;
            var reason = $scope.withdrawalSel.reason;

            if(uid == inputUid) {
                var listParam = { uid: uid, pwd: pwd, reason: reason }

                $http({
                    method: 'POST',
                    url: 'http://il-bang.com/ilbang_pc/ionic/http/delMemberInfo.php',
                    data: $httpParamSerializerJQLike(listParam),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data, status, headers, config) {
                    var confirmPopup = $ionicPopup.show({
                        cssClass: 'withdrawalPop',
                        title: '<h4 class="fo">회원 탈퇴</h4>',
                        template: '<div class="tc" style="padding: 30px 0;">' + data.msg + '</div>',
                        buttons: [{
                            text: '<b class="fw">확인</b>',
                            type: 'button-ilbang',
                            onTap: function(e) {
                                if(data.result == 0) {
                                    $scope.withdrawalInner();
                                } else if(data.result == 1) {
                                    $state.go("login");
                                }
                            }
                        }]
                    });
                });
            } else {
                var confirmPopup = $ionicPopup.show({
                    cssClass: 'withdrawalPop',
                    title: '<h4 class="fo">회원 탈퇴</h4>',
                    template: '<div class="tc" style="padding: 30px 0;">아이디가 일치하지 않습니다.</div>',
                    buttons: [{
                        text: '<b class="fw">확인</b>',
                        type: 'button-ilbang',
                        onTap: function(e) {
                            $scope.withdrawalInner();
                        }
                    }]
                });
            }
        }
      }
    ]
  });

 $scope.noIdPwd = function() {
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc"><span><b>아이디와 패스워드를 입력하세요.</b></span><br>',

      buttons: [{
        text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
        type: 'button-default',
        onTap:function(){
          console.log("hahahahhahah");
        }
      }]

    });
  };

  // 탈퇴확인메세지
  $scope.withFin = function(id, pwd) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>정상적으로 탈퇴되었습니다.</b></span><br>',

      buttons: [{
        text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
        type: 'button-default',
        onTap:function(){
            // var listParam = { uid: uid, pwd: pwd,  }
        }
      }]

    });
  };
 };

 // A confirm dialog

 $scope.showEstimate = function() {
   var confirmPopup = $ionicPopup.confirm({
     cssClass:'estiPop',
     template: '<div class="tc f12"><img src="img/cloud.png" width="20%"></div>'
              +'<div class="tc f12"><span><b>평점, 평가가 없습니다.</b></span><br>'
              +'<span class="f12"><b>평가는 구인, 구직 후 작성이 가능합니다.</b></span></div>',
     buttons: [{
       text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
       type: 'button-default'
     }]

   });

 };
 $scope.withdrawal = function() {
   var confirmPopup = $ionicPopup.confirm({
     cssClass: 'withdrawalPop',
     title: '<h4 class="fo">정말 탈퇴 하시겠습니까?</h4>',
     template: '<div class="popStyle f14">회원 탈퇴 하시면 고객님의 앱 이용 내역이<br />'
                    + '모두 삭제되며 일방 서비스를 더이상 이용하실<br />'
                    + '수 없습니다.<br />'
                    + '(탈퇴한 계정은 6개월 뒤에 이용할 수 있습니다.)<br />'
                    + '정말 탈퇴 하시겠습니까?</div>',
     buttons: [{
       text: '확인',
       type: 'button-default',
       onTap: function(e) {
          $scope.withdrawalInner();
       }
     },{
       text: '취소',
       type: 'button-default'
     }]

   });
   };
 $scope.deleteAlert = function() {
   var confirmPopup = $ionicPopup.confirm({
     cssClass:'estiPop',
     title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
     template:'<div class="tc f12"><span><b>[악평지우기] 아이템 구입 후</b></span><br>'
              +'<span class="f12"><b>삭제하실 수 있습니다</b></span></div>',
     buttons: [{
       text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
       type: 'button-default'
     }]

   });

   // confirmPopup.then(function(res) {
   //   if(res) {
   //     console.log('You are sure');
   //   } else {
   //     console.log('You are not sure');
   //   }
   // });
 };

// 결제완료 메시지
 $scope.chargeAlert = function() {
   var confirmPopup = $ionicPopup.confirm({
     cssClass:'estiPop',
     title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
     template:'<div class="tc f12"><span><b>결제가 완료되었습니다</b></span><br>',

     buttons: [{
       text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
       type: 'button-default'
     }]

   });

 };


 $scope.urgentAlert = function() {
   var confirmPopup = $ionicPopup.confirm({
     cssClass: 'urgentPop',
     title: '<h4 class="fo">긴급구인정보</h4>',
     template:
     '<ul class="popupUl">'
       +'<li>'
         +'<p class="di popupTitle">회사</p>'
         +'<p class="di">엠엠씨피플</p>'
       +'</li>'
       +'<li>'
         +'<p class="di popupTitle">지역</p>'
         +'<p class="di">경상북도>포항시북구</p>'
       +'</li>'
       +'<li>'
         +'<p class="di popupTitle">특성별</p>'
         +'<p class="di">건설일방</p>'
       +'</li>'
       +'<li>'
         +'<p class="di popupTitle">금액</p>'
         +'<p class="di"><span class="assertive bold">50,000</span></p>'
       +'</li>'
     +'</ul>',
     buttons: [{
       text: '취소',
       type: 'button-default'
     },{
       text: '바로보기',
       type: 'button-default',
       onTap: function() {
          // $scope.go("/urgent/map");
        // $location.path("/urgentMap");
        // $scope.test();
        $state.go('emoneyCharge');
       }
     }]

   });
   };


   //서비스 준비중입니다. 팝업
   $scope.ready = function() {
     $scope.data = {};

     // An elaborate, custom popup
     var myPopup = $ionicPopup.show({
    //    cssClass:'withdrawalPop',
       title: '<img src="img/cloud.png" width="15%">',
       template: '<div class="tc f18">서비스 준비중입니다.</div>',
       scope: $scope,
       buttons: [{
           text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
           type: 'button-ilbang'
         }
       ]
     });
 };

 // An alert dialog
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Don\'t eat that!',
     template: 'It might taste good'
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
})
