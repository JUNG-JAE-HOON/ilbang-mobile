angular.module('adSaveLog-controller', [])
.controller('AdLogCtrl', function($scope, $ionicPopover,$localstorage) {
  $ionicPopover.fromTemplateUrl('templates/admoney/popover/popover.html', {
     scope: $scope
   }).then(function(popover) {
     $scope.popover = popover;
   });


   $scope.openPopover = function($event) {
     $scope.popover.show($event);
   };
   $scope.closePopover = function() {
     $scope.popover.hide();
   };




   $scope.adLoginCheck = function(){
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

      if($scope.uid != null){
        return true;
      }else{
        return false;
      }

   }




});
