angular.module('guinViewTab4-controller', [])
.controller('guinViewTab4Ctrl', function($scope,$ionicPopup, $location, $http, $httpParamSerializerJQLike, $state,$stateParams) {
  // 팝업
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
      // 팝업

  $scope.items = [ {date:[]}];
  $scope.work_date = $stateParams.work_date;
  $scope.work_join_list_no = $stateParams.work_join_list_no;

  var myData = {
    no:  $stateParams.no
  }
  $http({
      method: 'POST',
      url: 'http://il-bang.com/ilbang_pc/ionic/http/viewGujikInfo.php',
      data: $httpParamSerializerJQLike(myData),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function (data, status, headers, config) {
      $scope.items = data.listData;

      //alert(JSON.stringify(data.listData))   ;

      //alert($scope.items[0].title) ;
  }).error(function (data, status, headers, config) {

  });

  $scope.removeChoice = function(){
    var myData = {
      'no':  $scope.work_join_list_no
    }
    //alert('시작전');
    //alert(JSON.stringify(myData));

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/removeChoice.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        if(data.result == "0"){
          $scope.alert(data.msg);
        }else if (data.result == "1"){
          $scope.alert(data.msg);
        }
    }).error(function (data, status, headers, config) {

    });
  }

});
