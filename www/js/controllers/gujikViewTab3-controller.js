angular.module('gujikViewTab3-controller', [])
.controller('gujikViewTab3Ctrl', function($scope,$ionicPopup, $location, $http, $httpParamSerializerJQLike, $state,$stateParams, $localstorage) {
  $scope.employNo = $stateParams.no;
  //alert($scope.employNo);
  //$scope.param = $location.search();
  // 팝ㅇ업
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



  $scope.doGujik = function(work_employ_data_no, euid) {
    // console.log(euid);
    // console.log(work_employ_data_no);
    // console.log($scope.work_dates);
    if ($scope.uid == undefined ){
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
    } else if (euid == $scope.uid) {
      $scope.alert('자신의 채용공고에 구직신청 할 수 없습니다.')
      return ;
    }

    var myData = {
      'work_employ_data_no':  work_employ_data_no,
      'euid' : euid,
      'ruid' : $scope.uid,
      'work_date' : $scope.work_dates
    }

    //alert(JSON.stringify(myData));
    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/doGujik.php',
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

          var fcmData = {
            'work_employ_data_no':  work_employ_data_no,
            'euid' : euid,
            'ruid' : $scope.uid,
            'work_date' : $scope.work_dates
          }

          //alert(JSON.stringify(myData));
          $http({
              method: 'POST',
              url: 'http://ilbbang.com/doGujikFcm.php',
              data: $httpParamSerializerJQLike(fcmData),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (data, status, headers, config) {


          }).error(function (data, status, headers, config) {


          });

        }
    }).error(function (data, status, headers, config) {

    });
  }



    $scope.requestOk = function(join_no, euid, day, title){
      // console.log(join_no+","+euid);
      var myData = {
        'work_join_list_no':  join_no,
        'euid' : euid
      }

      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/gujikRequestOk.php',
          data: $httpParamSerializerJQLike(myData),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
          if (data == "success"){

            var confirmPopup = $ionicPopup.confirm({
              cssClass:'estiPop',
              title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
              template:'<div class="tc f12"><span><b>구직 요청이 승인되었습니다.<br>구인자의 최종 승인을 기다려주세요.</b></span><br>',

              buttons: [{
                text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                type: 'button-default',
                onTap: function(){
                    $scope.backModal();
                    $scope.reLoad();
                }
              }]
            });
///////////////////////// fcm 해야됨
            var fcmData = {
                'euid' : euid,
                'ruid' : $scope.uid,
                'work_date' : day,
                'title' : title
            }
            $http({
                method: 'POST',
                url: 'http://ilbbang.com/requestOkFcm.php',
                data: $httpParamSerializerJQLike(fcmData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {


            }).error(function (data, status, headers, config) {

            });
////////////////////////////////

          }else{
              $scope.alert(data);
          }
      }).error(function (data, status, headers, config) {

      })




    }



  $scope.doGuin = function(work_resume_data_no, ruid) {
      //alert($scope.work_date)  ;
      /*
      if (true){
        return ;
      }*/
      if ($scope.uid == undefined ){
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
        $scope.alert('자신의 이력서에 구인신청 할 수 없습니다.')
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

  $scope.cancelGujik = function(join_No){
    var myData = {
      'work_join_list_no':  join_No
    }
    //alert('시작전');
    // console.log(JSON.stringify(myData));

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/delWorkJoinList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        if(data.result == "0"){
          $scope.alert(data.msg);
        }else if (data.result == "1"){

          var confirmPopup = $ionicPopup.confirm({
            cssClass:'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
            template:'<div class="tc f12"><span><b>구직 취소 되어었습니다.</b></span><br>',

            buttons: [{
              text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
              type: 'button-default',
              onTap: function(){
                  $scope.backModal();
                  $scope.reLoad();
              }
            }]
          });
        }
    }).error(function (data, status, headers, config) {

    })
  }
});
