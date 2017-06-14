angular.module('inAppbrowser-controller',[])
.controller('inAppbrowserCtrl', function($cordovaInAppBrowser,$scope) {
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
})
