angular.module('sotongRenewRead-controller',[])
.controller('sotongRenewReadCtrl',function($scope, $state, $localstorage, $cordovaInAppBrowser, $http, $httpParamSerializerJQLike, $stateParams, $ionicPopup,$ionicPopover,$ionicBackdrop,$ionicModal) {

  var template = '<ion-popover-view class="sotongDetail-pop"><ion-content><ul><li class="delete">삭제</li><li class="modi">수정</li></ul></ion-content></ion-popover-view>';

   $scope.popoverRead = $ionicPopover.fromTemplate(template, {
     scope: $scope
   });


   // .fromTemplateUrl() method
  //  $ionicPopover.fromTemplateUrl('my-popover.html', {
  //    scope: $scope
  //  }).then(function(popover) {
  //    $scope.popover = popover;
  //  });

$(document).on('click',".dotdotdot",function(){
  var top=$(this).offset().top;
  var left=$(this).offset().left;
  $(".sotongDetail-pop").css({'top':top,'left':left-50+'px','margin':0})
});
// $(".dotdotdot").click(function(){
//   var top=$(this).offset().top;
//   var left=$(this).offset().left;
//   console.log(top);
//   console.log(left);
//   $(".sotongDetail-pop").css({'top':top,'left':left-30+'px','margin':0})
// });
   $scope.openPopover = function() {
     $scope.popoverRead.show();
    //  $(".popover-backdrop").hide();
   };
  //  $("").click(function(){
  //    alert();
  //   //  $scope.popoverRead.hide();
  //  });
   $scope.closePopover = function() {
     $scope.popoverRead.hide();
   };

// 삭제버튼
$(document).on("click",".popover-backdrop",function(){
  $scope.popoverRead.hide();
});
   $(document).on("click",".delete",function(){
     alert("삭제1");
   });
  // 수정버튼
   $(document).on("click",".modi",function(){
     alert("수정1");
   });

   $ionicModal.fromTemplateUrl('templates/sotong/view/sotongNewWrite.html', {
   scope: $scope,
   animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.modalWrite = modal;
   });
   $ionicModal.fromTemplateUrl('templates/sotong/view/sotongNewRead.html', {
   scope: $scope,
   animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.modalRead = modal;
   });
   $scope.openModalWrite = function() {
     $scope.modalWrite.show();
   };
   $scope.openModalRead = function() {
     $scope.modalRead.show();
   };

   $scope.closeModalWrite = function() {
     $scope.modalWrite.hide();
   };
   $scope.closeModalRead = function() {
     $scope.modalRead.hide();
   };

   $scope.writeFin=function(){
     alert("글이 등록되었습니당.");
     $scope.modalWrite.hide();
   }
   $scope.readFin=function(){
     $scope.modalRead.hide();
   }
})
