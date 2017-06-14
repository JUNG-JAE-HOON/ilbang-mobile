angular.module('gaMengAdminLog-controller', [])
.controller('gaMengAdminLogCtrl', function($scope, $stateParams, $http,  $httpParamSerializerJQLike, $localstorage, $ionicPopup, $state) {

  // test 시작
  //$stateParams.affiliate_no = 1;
  $scope.page               = 0;
  $scope.AdminLogitems             = [];
  // test 끝

  var myData = {
   no: $stateParams.affiliate_no,
   lat  : $localstorage.get('lat'),
   lng  : $localstorage.get('lng')
  }

  $http({
      method: 'POST',
      url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/viewAffiliate.php',
      data: $httpParamSerializerJQLike(myData),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function (data, status, headers, config) {
      // $scope.viewGameng = $scope.viewGameng.concat(data.listData);

      $scope.name           = data.listData[0].name;
      $scope.area_1st_nm    = data.listData[0].area_1st_nm;
      $scope.area_2nd_nm    = data.listData[0].area_2nd_nm;
      $scope.Taddress        = data.listData[0].address;
      $scope.img_url        = data.listData[0].img_url;
      $scope.discount_rate  = data.listData[0].discount_rate;
      $scope.distance       = data.listData[0].distance;
      $scope.phone          = data.listData[0].phone;
  }).error(function (data, status, headers, config) {
      // handle error things
  });

  $scope.AdminLogloadMore = function() {

   $scope.page += 1;

   var myData = {
     page: $scope.page,
     affiliate_no  : $stateParams.affiliate_no,
   }

   $http({
       method: 'POST',
       url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/getAdminLogList.php',
       data: $httpParamSerializerJQLike(myData),
       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function (data, status, headers, config) {

       $scope.AdminLogitems = $scope.AdminLogitems.concat(data.listData);
       $scope.AdminLognoMoreItemsAvailable = false;

       if (data.paging.page >= data.paging.allPage) {
          $scope.AdminLognoMoreItemsAvailable = true;
       }
       $scope.$broadcast('scroll.infiniteScrollComplete');

   }).error(function (data, status, headers, config) {
       // handle error things
   });
 }

});
