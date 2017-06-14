angular.module('kakao-controller', [])

.controller('shareCtrl', function($scope,$localstorage,$ionicPopup,$state) {
      $scope.uid="";

      $scope.kakao = function() {
        if($localstorage.get("auto")=="true"){
          $scope.uid        = $localstorage.get("id");
           }else{
           $scope.uid        = sessionStorage.getItem("id");
          }
         if($scope.uid ==undefined || $scope.uid=="" || $scope.uid == null){
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
      }else{
        KakaoTalk.share({
          text : '▶ 일일 일자리 구인구직 자동매칭 \n▶ 광고보고 쇼핑하고 \n▶ 구직신청하고 돈벌고 \n▶ 일방앱 설치하고 언제든 필요할때 구인구직 신청하자',
          image : {
          src : 'http://il-bang.com/mobile/img/send_logo2.png',
          width : 300,
          height : 200,
        },
        weblink :{
          url : 'http://il-bang.com/mobile/intro-ilbang.php?uid='+$scope.uid,
          text : '회원가입으로 이동'
        }
      },
      function (success) {
        console.log('kakao share success');
      },
      function (error) {
        console.log('kakao share error'+error);
      });
      }
    }

    
})


.controller('reuidCtrl', function($scope,$http,$httpParamSerializerJQLike,$localstorage) {

      if($localstorage.get("auto") == "true") {
          var id = $localstorage.get("id");
          var no = $localstorage.get("no");

      } else {
          var id = sessionStorage.getItem("id");
          var no = sessionStorage.getItem("no");
      }

      var userid = {
        id: id
      };
      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/reuidList.php',
          data: $httpParamSerializerJQLike(userid),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
        console.log(JSON.stringify(data));
          $scope.totalCount=data.count;
        if(data.count==""){
          $scope.totalCount=0;
        }

        $scope.reuidList=data.list;

      }).error(function (data, status, headers, config) {

      });


})
