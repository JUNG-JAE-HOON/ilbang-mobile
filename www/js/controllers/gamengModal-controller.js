angular.module('gamengModal-controller', [])
.controller('gamengModalCtrl', function($state, $localstorage, $scope, $ionicModal, $http, $httpParamSerializerJQLike) {
  $scope.lat = 0;
  $scope.lng = 0;
  $ionicModal.fromTemplateUrl('templates/pointShop/gameng-search.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal1) {
    $scope.gamengSrch = modal1;
  });
  $ionicModal.fromTemplateUrl('templates/pointShop/gameng-detail.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.gamengModal = modal;
  });
  $scope.viewGameng = function(affiliate_no) {

    $scope.viewGameng = [];

    var myData = {
     no: affiliate_no,
     lat  : $localstorage.get('lat'),
     lng  : $localstorage.get('lng')
   }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/viewAffiliate.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        $scope.viewGameng = $scope.viewGameng.concat(data.listData);
        $scope.lat = data.listData[0].lat;
        $scope.lng = data.listData[0].lng;
    }).error(function (data, status, headers, config) {
        // handle error things
    });

    $scope.gamengModal.show();
  };
  $scope.viewSrch = function() {
    $scope.gamengSrch.show();
  };
  $scope.closeModal = function() {

        $scope.gamengModal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.loadRecmmndAffListPage = 0;
  $scope.recommndAffList = [];
  $scope.loadRecmmndAffList = function() {

   $scope.loadRecmmndAffListPage += 1;

   var myData = {
     page: $scope.loadRecmmndAffListPage,
     lat  : $localstorage.get('lat'),
     lng  : $localstorage.get('lng')
   }

   $http({
       method: 'POST',
       url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/getRecmmndAffList.php',
       data: $httpParamSerializerJQLike(myData),
       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function (data, status, headers, config) {

       $scope.recommndAffList = $scope.recommndAffList.concat(data.listData);
       $scope.loadRecmmndAffListAv = false;

       if (data.paging.page >= data.paging.allPage) {
          $scope.loadRecmmndAffListAv = true;
       }
       $scope.$broadcast('scroll.infiniteScrollComplete1');

   }).error(function (data, status, headers, config) {
       // handle error things
   });
 }


  $scope.currentLoc="";
  $scope.test=function(){
    $scope.currentLoc="서울시 금천구 가산동 코오롱디지털애스턴";
  }
  $scope.gamengSiList=[
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'},
                       {number: '1', value:'가산디지털단지역'}
                     ];

});
