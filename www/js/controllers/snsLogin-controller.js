angular.module('snsLogin-controller',[])
.controller('snsLoginCtrl',function($scope,$state,$cordovaInAppBrowser){



      $scope.kakaoLogin = function(){
          KakaoTalk.login(
              function (result) {
                  console.log('Successful login!');
                  console.log(result);
              },
              function (message) {
                  console.log('Error logging in');
                  console.log(message);
              }
          );
      }

      
})
