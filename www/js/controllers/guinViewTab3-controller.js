angular.module('guinViewTab3-controller', [])
.controller('guinViewTab3Ctrl', function($scope,$ionicPopup, $location, $http, $httpParamSerializerJQLike, $state,$stateParams,$localstorage) {

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
  //$scope.param = $location.search();

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
/*
   if ($scope.uid ==  undefined ) {
     //$scope.noMoreItemsAvailable = true;
     alert('로그인 하세요.');
     return ;
   }
*/
  $scope.items = [ {date:[]}];
  $scope.work_date = $stateParams.work_date;
  $scope.work_join_list_no = $stateParams.work_join_list_no;
  $scope.company_apply = $stateParams.company_apply;
  $scope.employ_apply = $stateParams.employ_apply;


  $scope.approve = function (work_resume_data_no, ruid){
    //alert($scope.work_join_list_no);
    var myData = {
      'no':  $scope.work_join_list_no
    }
    //alert('시작전');
    //alert(JSON.stringify(myData));

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/approveResume.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        if(data.result == "0"){
          $scope.alert(data.msg);
        }else if (data.result == "1"){
          $scope.alert(data.msg);

          var fcmData = {
            'work_employ_data_no' :  $scope.work_join_list_no,
             ruid:  ruid,
             euid:  $scope.uid
          }
          $http({
              method: 'POST',
              url: 'http://ilbbang.com/approveResume.php',
              data: $httpParamSerializerJQLike(fcmData),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (data, status, headers, config) {


          }).error(function (data, status, headers, config) {

          });


        }
    }).error(function (data, status, headers, config) {

    });
  }
  $scope.checkWorkDate = function(date){
  }

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



  $scope.doGuin = function(work_resume_data_no, ruid) {
      //alert($scope.work_date)  ;
      /*
      if (true){
        return ;
      }*/
      if ($scope.uid == "" ){
        // alert ('로그인 하세요.');
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
        return ;
      } else if (ruid == $scope.uid) {
        $scope.alert ('자신의 이력서에 구인신청 할 수 없습니다.');
        return ;
      }

      var myData = {
        'work_resume_data_no':  work_resume_data_no,
        'ruid' : ruid,
        'euid' : $scope.uid,
        'work_date' : $scope.work_date
      }
      //alert('시작전');
      //alert(JSON.stringify(myData));

      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/doGuin.php',
          data: $httpParamSerializerJQLike(myData),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
          //alert('성공');
          if(data.result == "0"){
            $scope.alert(data.msg);
            //alert(data.sql);
            //alert(data.work_date);
          }else if (data.result == "1"){
            $scope.alert(data.msg);
            //alert(data.sql);
            //alert(data.work_date);

          }
      }).error(function (data, status, headers, config) {

      });

  }

  // 구인취소
  $scope.cancelGuin = function(){
    var myData = {
      'work_join_list_no':  $scope.work_join_list_no
    }
    //alert('시작전');
    //alert(JSON.stringify(myData));

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/delWorkJoinList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        if(data.result == "0"){
          $scope.alert(data.msg);
        }else if (data.result == "1"){
          $scope.alert(data.msg);
          $state.go("erTabs.erTab3");
        }
    }).error(function (data, status, headers, config) {

    })
  }

});
