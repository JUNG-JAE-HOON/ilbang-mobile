angular.module('snsSharing-controller',[])
.controller('snsSharingCtrl',function($scope,$state,$cordovaInAppBrowser, $cordovaSocialSharing,$ionicPopup){


  $scope.facebook = function(no){
        var falseCount = 0;
        // var image = 'http://il-bang.com/mobile/img/logo.jpg';
        var image = '';
        var url = 'http://il-bang.com/mobile/new_page.php?no='+no;
        var message = '';
        $cordovaSocialSharing
              .shareViaFacebook(message, image, url)
              .then(function(result) {
                  // $scope.defaultAlert("페이스북 공유 완료!");
              }, function(err) {

                  if((err=='false')||(err==false)){

                      if(falseCount == 0){
                            $scope.alert('페이스북이 설치되어 있지 않거나, 공유를 취소하였습니다.\n웹으로 공유하시겠습니까?','https://www.facebook.com/sharer/sharer.php?u='+url);
                            falseCount=1;
                      }
                  }
                  console.log('facebook:'+err);
              });
  }


  $scope.kakaoShareInfo = function(title,company_name,area,no){
        KakaoTalk.share({
              text : '▶ 채용 공고\n-'+title+'\n\n▶ 회사\n-'+company_name+'\n\n▶ 지역\n-'+area,
              image : {
                  src : 'http://il-bang.com/mobile/img/send_logo2.png',
                  width : 300,
                  height : 200,
              },
              weblink :{
                  url : 'http://il-bang.com/mobile/new_page.php?no='+no,
                  text : '채용정보 상세보기'
              }
          },
          function (success) {
              $scope.defaultAlert("카카오톡 공유 완료!");
          },
          function (error) {
              console.log('kakao share error:\n'+error+"\n:\n");
              if(error == "Exception error : java.lang.RuntimeException: Can't create handler inside thread that has not called Looper.prepare()"){
                  $scope.defaultAlert("kakao Talk이 설치되어 있지 않습니다.");
              }
          });
  }

  $scope.twitter = function(no){
        var falseCount = 0;
        var image = 'http://il-bang.com/mobile/img/logo.jpg';
        var link = 'http://il-bang.com/mobile/new_page.php?no='+no;
        var message = '';
        $cordovaSocialSharing
          .shareViaTwitter(message, image, link)
          .then(function(result) {
            // $scope.defaultAlert("트위터 공유 완료!");
          }, function(err) {
            if((err=='false')||(err==false)){
                if(falseCount == 0){
                  $scope.alert('공유를 취소하였거나, twitter가 설치되어 있지 않습니다.<br>웹으로 공유하시겠습니까?','https://twitter.com/intent/tweet?text=구인구직은 일방!&url='+link);
                  falseCount = 1;
                }
            }
            console.log('twitter:'+err);
          });
  }
  $scope.golink = function(domain){
        var options = {
            clearcache: 'yes',
            closebuttoncaption: '종료'
        };
        $cordovaInAppBrowser.open(domain, '_blank', options)
            .then(function(event) {
                  // success
            })
            .catch(function(event) {
                 // error
            });
      }
  $scope.alert = function(data,url){
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>'+data+'<br>(공유 후 인터넷창을 종료해주세요.)<b></span><br>',

      buttons: [{
        text: '취소',
        type: 'button-default'
      },{
        text: '웹으로 공유',
        type: 'button-default',
        onTap:function(){
          $scope.golink(url);
        }
      }]
    });
  }

  $scope.defaultAlert = function(data){
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>'+data+'<b></span><br>',

      buttons: [{
        text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
        type: 'button-default'
      }]
    });
  }


})
