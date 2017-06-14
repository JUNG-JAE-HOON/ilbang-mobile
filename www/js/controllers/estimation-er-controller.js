angular.module('estiEr-controller', [])

.controller('estiErCtrl', function($scope, $location, $http, $httpParamSerializerJQLike, $state,$stateParams,$ionicPopup) {


  var rateYo=function(){
    $("#rateYo").rateYo({
      rating: 3.5,
      readOnly: true,
      starWidth:'17px'
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
    $("#rateYo99").rateYo({
      rating: 4.0,
      readOnly: true,
      starWidth: "17px"
    });
  }
  rateYo();
  $scope.confirmStar = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: '<h4 class="fo">구인자(업체)를 평가해주세요</h4>',
      cssClass:'starPop',
      template:'<div id="rateYo99" class="choicePoint di mt10"></div>'
               +'<textarea name="estiText" id="estiTextArea" class="border2 estiText mt20 padding" placeholder="평가는 익명으로 올려집니다. 솔직한 후기를 남겨주세요"></textarea>',
      buttons: [{
        text: '취소',
        type: 'button-default'
      },{
        text: '확인',
        type: 'button-default'
      }]

    });


    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });

  };

// 평가하기 클릭하면 빈 별 표시
  $(document).on("click",".estiBtn",function(){
    $("#rateYo99").rateYo({
      starWidth: "35px"
    });
  });

  $scope.items = [];

  var myData = {
    work_join_list_no:  $stateParams.work_join_list_no
  }

  $http({
      method: 'POST'  ,
      url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/getCompanyReviewList.php',
      data: $httpParamSerializerJQLike(myData),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function (data, status, headers, config) {
      $scope.items = data.listData;
  }).error(function (data, status, headers, config) {

  });
});
