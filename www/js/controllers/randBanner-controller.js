angular.module('randBanner-controller', [])

.controller('randBanCtrl', function($scope,$state) {
  $scope.bannerPath='';
  var R=Math.floor(Math.random()*3);
  var bannerImage = ["img/twosome-mid.jpg","img/hosigi-mid.jpg","img/ghouse-mid.jpg"];
  var bannerNo    = [231,80,0];
  $scope.bannerPath = bannerImage[R];
  $scope.bannerNo = bannerNo[R];

  //호시기 80
  //투썸 231
  //
})
