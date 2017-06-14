angular.module('eventLaunchApp-controller', [])
  .controller('eventLaunchAppCtrl', function($scope, $ionicLoading,$ionicPopup) {

    $scope.appexe = function() {
      var spinner = '<ion-spinner icon="dots" class="spinner-stable"></ion-spinner><br/>';
      $ionicLoading.show({
        template: spinner + '어플 실행중...'
      });

      if (device.platform == "Android") {
        var sApp = startApp.set({
          action: "ACTION_VIEW",
          uri: "fb://facewebmodal/f?href=https://www.facebook.com/1bbang/"

        });

        sApp.start(function() { /* success */
          console.log("OK");
          $ionicLoading.hide();
        }, function(error) { /* fail */
          $ionicLoading.hide();
          $scope.alert("페이스북이 설치되어 있지 않습니다.");
        });

      } else {

          window.open("fb://facewebmodal/f?href=https://www.facebook.com/1bbang/", "_system");

          $ionicLoading.hide();

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

  })
