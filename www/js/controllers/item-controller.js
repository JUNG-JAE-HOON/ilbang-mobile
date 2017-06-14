angular.module('itemshop-controller',[])
.controller('itemshopCtrl',function($scope, $state, $ionicPopup, $timeout, $localstorage,$ionicScrollDelegate) {
    $scope.prepareAlert = function() {
        var confirmPopup = $ionicPopup.confirm({
            cssClass:'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
            template:'<div class="tc"><span><b>준비중입니다.</b></span><br>',
            buttons: [{
                text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                type: 'button-default'
            }]
        });
    };

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

    $scope.scrollTop = function(){
      $ionicScrollDelegate.scrollTop();
    }
    $scope.loginCheck = function(val) {

      if($localstorage.get("auto")=="true"){
         $scope.uid=$localstorage.get("id");
       }else{
         $scope.uid=sessionStorage.getItem("id");
       }
        if($scope.uid == null) {
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
            if(val == 1) {
                $state.go("itemRead");
            } else if(val == 2) {
                $state.go("itemUrgent");
            } else if(val == 4){
                $state.go("itemReview");
            } else if(val == 5){
                $state.go("myItem");
            }
        }
    }
    $(".tab-menu").each(function(i){
      $(this).click(function(){
        $(".tab-menu").removeClass("tab-menu-active");
        $(this).addClass("tab-menu-active");
        $(".list-tab").hide();
        $(".list-tab"+(i+1)).show();

      });
    });

})
