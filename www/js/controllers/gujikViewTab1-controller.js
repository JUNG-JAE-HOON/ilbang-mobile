angular.module('gujikViewTab1-controller', ["checklist-model"])
  .controller('gujikViewTab1Ctrl', function($scope, $ionicPopup, $location, $http, $httpParamSerializerJQLike, $state, $stateParams, $localstorage) {
    // 팝업
    $scope.alert = function(msg) {
      var confirmPopup = $ionicPopup.confirm({
        cssClass: 'estiPop',
        title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
        template: '<div class="tc f12"><span><b>' + msg + '</b></span><br>',

        buttons: [{
          text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
          type: 'button-default'
        }]

      });

    };
    // 팝업
    if ($localstorage.get("auto") == "true") {
      $scope.uid = $localstorage.get("id");
      $scope.kind = $localstorage.get("kind");
      $scope.member_no = $localstorage.get("no");
      $scope.valid_no = $localstorage.get("valid_no");
    } else {
      $scope.uid = sessionStorage.getItem("id");
      $scope.kind = sessionStorage.getItem("kind");
      $scope.member_no = sessionStorage.getItem("no");
      $scope.valid_no = sessionStorage.getItem("valid_no");
    }

    $scope.items = [{
      date: []
    }];
    $scope.date = [];


    $scope.checkWorkDate = function(date) {

    }

    var myData = {
      no: $stateParams.no,
      uid: $scope.uid
    }
    $http({
      method: 'POST',
      url: 'http://il-bang.com/ilbang_pc/ionic/http/viewGuinInfo.php',
      data: $httpParamSerializerJQLike(myData),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success(function(data, status, headers, config) {

      setTimeout(function() {
        $(".rateYo-gujik").rateYo({
          rating: data.listData[0].avgScore,
          starWidth: "20px",
          readOnly: true
        });
        $(".rateYo-gujik").rateYo("option", "rating", data.listData[0].avgScore);
        $(".rateYo-gujik").rateYo("option", "readOnly", true);
      }, 100);



      if ($stateParams.no != "" && data.msg != "메시지없음.") $scope.alert(data.msg);


      $scope.items = data.listData;
      //alert(JSON.stringify(data.listData[0].doGuinDate));
      if (data.listData[0].doGujikDate == undefined) {

      } else {

        $scope.work_date = data.listData[0].doGujikDate;
      }

    }).error(function(data, status, headers, config) {

    });


    $scope.loadMore1 = function(no2) {
      $scope.items = [];
      $scope.allPost = 0;
      var myData = {
        'resume_no': no2
      }

      $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/viewResumeReview.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function(data, status, headers, config) {

        // console.log(JSON.stringify(data));
        //alert(JSON.stringify(data));
        $scope.items = $scope.items.concat(data.listData);

        //$scope.paging.push(data.paging);
        //$scope.paging.push(data.paging);
        $scope.allPost = data.paging.allPost;
        $scope.name = data.name;
        $scope.noMoreItemsAvailable = false;

        if (data.paging.page >= data.paging.allPage) {
          $scope.noMoreItemsAvailable = true;
        }

        $scope.addStart();



        $scope.$broadcast('scroll.infiniteScrollComplete');
      }).error(function(data, status, headers, config) {

      });
    }

    //$scope.review="안녕";
    //$scope.reviewContent ="";
    $scope.review = {};

    $scope.addStart = function() {
      // console.log("실행");
      $("#rateYo").rateYo({
        rating: 4.8,
        readOnly: true,
        starWidth: '17px'
      });
      $("#rateYo1").rateYo({
        rating: 4.2,
        readOnly: true,
        starWidth: "10px"
      });
      $("#rateYo2").rateYo({
        rating: 3.9,
        readOnly: true,
        starWidth: "10px"
      });
      $("#rateYo3").rateYo({
        rating: 4.3,
        readOnly: true,
        starWidth: "10px"
      });
      $("#rateYo4").rateYo({
        rating: 4.6,
        readOnly: true,
        starWidth: "10px"
      });
      $("#rateYo5").rateYo({
        rating: 4.0,
        readOnly: true,
        starWidth: "10px"
      });

    }
    $scope.doGujik = function(work_employ_data_no, euid, msg) {
      console.log(euid);
      console.log(work_employ_data_no);
      console.log($scope.work_dates);
      console.log(msg);
      if ($scope.uid == undefined) {
        var confirmPopup = $ionicPopup.confirm({
          cssClass: 'estiPop',
          title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
          template: '<div class="tc f12"><span><b>로그인을 해주세요.</b></span><br>',

          buttons: [{
            text: '나중에 하기',
            type: 'button-ilbang'
          }, {
            text: '로그인 하기',
            type: 'button-ilbang',
            onTap: function() {
              $state.go("login");
            }
          }]
        });
        return;
      } else if (euid == $scope.uid) {
        $scope.alert('자신의 채용공고에 구직신청 할 수 없습니다.')
        return;
      } else if ($scope.work_dates == "" || $scope.work_dates == '' || $scope.work_dates == undefined) {
        $scope.alert('날짜를 선택해 주세요.')
        return;
      } else if (msg != "메시지없음.") {
        $scope.alert(msg);
        return;
      }

      var myData = {
        'work_employ_data_no': work_employ_data_no,
        'euid': euid,
        'ruid': $scope.uid,
        'work_date': $scope.work_dates
      }

      //alert(JSON.stringify(myData));
      $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/doGujik.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function(data, status, headers, config) {
        //alert('성공');

        if (data.result == "0") {
          $scope.alert(data.msg);
          //alert(data.sql);
          //alert(data.work_date);
        } else if (data.result == "1") {

          $scope.alert(data.msg);

          var fcmData = {
            'work_employ_data_no': work_employ_data_no,
            'euid': euid,
            'ruid': $scope.uid,
            'work_date': $scope.work_dates
          }

          //alert(JSON.stringify(myData));
          $http({
            method: 'POST',
            url: 'http://ilbbang.com/doGujikFcm.php',
            data: $httpParamSerializerJQLike(fcmData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).success(function(data, status, headers, config) {


          }).error(function(data, status, headers, config) {


          });

        }
      }).error(function(data, status, headers, config) {

      });
    }
  });
