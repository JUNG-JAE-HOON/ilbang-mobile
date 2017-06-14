angular.module('guinViewTab1-controller',["checklist-model"])
.controller('guinViewTab1Ctrl', function($scope, $ionicPopup, $location, $http, $httpParamSerializerJQLike, $state,$stateParams,$localstorage) {

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
     $scope.noMoreItemsAvailable = true;
     alert('로그인 하세요.');
     return ;
   }
*/
$scope.items = [ {date:[]}];
$scope.date = [];



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


  $scope.doGuin = function(work_resume_data_no, ruid) {
      console.log(work_resume_data_no);
      console.log(ruid);
      console.log($scope.doGuinDate);
      console.log($scope.uid);
      //alert($scope.uid);
      if ($scope.uid == undefined ){
        //alert($scope.uid);
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
        //$scope.alert();
        return ;
      } else if (ruid == $scope.uid) {
        $scope.alert ('자신의 이력서에 구인신청 할 수 없습니다.')
        return ;
      }

      var myData = {
        'work_resume_data_no':  work_resume_data_no,
        'ruid' : ruid,
        'euid' :$scope.uid,
        'work_date' : $scope.doGuinDate
      }

      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/doGuin.php',
          data: $httpParamSerializerJQLike(myData),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {

          //alert('성공');
          $scope.aa= data.msg;

          if(data.result == "0"){
            $scope.alert(data.msg);
            // alert(data.msg);
            // showAlert(data.msg);
            //alert(data.sql);
            //alert(data.work_date);

          }else if (data.result == "1"){


            var fcmData = {
                'euid' : ruid,
                'ruid' : $scope.uid,
                'work_date' : $scope.work_dates
            }

            //alert(JSON.stringify(myData));
            $http({
                method: 'POST',
                url: 'http://ilbbang.com/doGuinFcm.php',
                data: $httpParamSerializerJQLike(fcmData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                $scope.alert($scope.aa);

            }).error(function (data, status, headers, config) {


            });

          }
      }).error(function (data, status, headers, config) {

      });
    }
    // 팝업


     var myData = {
     no:  $stateParams.no,
      uid: $scope.uid
    }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/viewGujikInfo.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        //alert(JSON.stringify(data));

        $scope.items = data.listData;
        //alert(JSON.stringify(data.listData[0].doGuinDate));
        if(data.listData[0].doGujikDate == undefined){
        }else{
          $scope.work_date = data.listData[0].doGujikDate;
        }

        setTimeout(function(){
          $(".rateYo-guin").rateYo({
             rating: data.listData[0].avgScore,
             starWidth: "20px",
             readOnly: true
           });
           $(".rateYo-guin").rateYo("option", "rating", data.listData[0].avgScore);
           $(".rateYo-guin").rateYo("option", "readOnly", true);
        },100);


        //test();
    }).error(function (data, status, headers, config) {

    });

});
