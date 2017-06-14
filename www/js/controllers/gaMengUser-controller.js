angular.module('gaMengUser-controller', [])
.controller('gaMengUserCtrl', function($scope, $stateParams, $http,  $httpParamSerializerJQLike, $localstorage, $ionicPopup, $state) {

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


  $scope.saleAmt    = 0;
  $scope.minusPoint = 0;
  $scope.balancePoint= 0;
  $scope.payAmt     = 0;
  if($localstorage.get("auto")=="true"){
    $scope.uid     = $localstorage.get("id");
   }else{
     $scope.uid    = sessionStorage.getItem("id");
   }


   // test 지워야함
  // $stateParams.affiliate_no = 1;
  //$scope.uid = "p20513";
  // test
  var myData = {
      no  : $stateParams.affiliate_no,
      lat : $localstorage.get('lat'),
      lng : $localstorage.get('lng'),
      uid : $scope.uid
  }

  $http({
      method: 'POST',
      url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/viewGamengMallUser.php',
      data: $httpParamSerializerJQLike(myData),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function (data, status, headers, config) {

      //console.log(JSON.stringify(data));
      //$scope.items = $scope.items.concat(data.listData);

      $scope.title    = data.listData[0].name;
      $scope.address  = data.listData[0].address;
      $scope.dist     = data.listData[0].distance;
      $scope.tel      = data.listData[0].phone;
      $scope.logo     = data.listData[0].img_url;

      $scope.discount_rate = data.listData[0].discount_rate;
      $scope.Tdiscount_rate =  data.listData[0].discount_rate * 100;
      $scope.totalPoint = parseInt(data.totalPoint);
      $scope.usablePoint = $scope.saleAmt * $scope.discount_rate;


  }).error(function (data, status, headers, config) {
       // handle error things
  });


  $scope.calcPoint = function(){

    if($scope.saleAmt < 0) $scope.saleAmt = Math.abs($scope.saleAmt);

    $scope.usablePoint = Math.floor($scope.saleAmt * $scope.discount_rate);

    if ($scope.totalPoint <= 0) {
      $scope.usablePoint = 0;
    } else if ($scope.usablePoint > $scope.totalPoint) $scope.usablePoint = $scope.totalPoint;


    $scope.minusPoint = -$scope.usablePoint;

    if ($scope.minusPoint > $scope.usablePoint) $scope.minusPoint = $scope.usablePoint;
    else if ($scope.minusPoint < -$scope.usablePoint) $scope.minusPoint = -$scope.usablePoint;

    $scope.balancePoint = $scope.totalPoint + $scope.minusPoint;

    $scope.payAmt = $scope.saleAmt + $scope.minusPoint;

  }

  $scope.calcPoint2 = function(){

    if ($scope.minusPoint > 0) $scope.minusPoint = -$scope.minusPoint;

    $scope.usablePoint = Math.floor($scope.saleAmt * $scope.discount_rate);

    if ($scope.totalPoint <= 0) {
      $scope.usablePoint = 0;
    } else if ($scope.usablePoint > $scope.totalPoint) $scope.usablePoint = $scope.totalPoint;

    if ($scope.minusPoint > $scope.usablePoint) $scope.minusPoint = -$scope.usablePoint;
    else if ($scope.minusPoint < -$scope.usablePoint) $scope.minusPoint = -$scope.usablePoint;

    $scope.balancePoint = $scope.totalPoint + $scope.minusPoint;

    $scope.payAmt = $scope.saleAmt + $scope.minusPoint;
  } 


  $scope.goPay = function(){
    //alert('t');

    if ($scope.uid == "" || $scope.uid == undefined) {
      $scope.alert ("로그인 하세요.");
      return ;
    } else if (isNaN($scope.saleAmt)) {
      $scope.alert ("판매금액은 숫자만 입력하세요.");
      return ;
    } else if (isNaN($scope.minusPoint)) {
      $scope.alert ("차감포인트는 숫자만 입력하세요.");
      return ;
    } else if (Math.abs($scope.minusPoint) > $scope.usablePoint) {
      $scope.alert ("사용가능 포인트는 " + $scope.usablePoint +" P 입니다.");
      return ;
    } else if ($scope.totalPoint <= 0) {
      $scope.alert ("누적(보유) 포인트가 없습니다." + "("+$scope.totalPoint+"P)");
      return ;
    } else if ($scope.saleAmt == undefined  ){
      $scope.alert ("판매금액을 입력하세요.");
      return ;
    } else if ($scope.saleAmt == 0 ){
      $scope.alert ("판매금액이 0입니다. 결제가 진행되지 않습니다.");
      return ;
    } else if ($scope.minusPoint == undefined ){
      $scope.alert ("차감포인트를 입력하세요.");
      return ;
    } else if ($scope.saleAmt < 0 ){
      $scope.alert ("판매금액을 올바르게 입력해주세요.(음수(-)입력 불가능합니다.)");
      return ;
    } else if ($scope.minusPoint > 0 ){
      $scope.alert ("차감포인트를 올바르게 입력해주세요.(양수(+)입력 불가능합니다.)");
      return ;
    } else if ($scope.minusPoint == 0 ){
      $scope.alert ("차감포인트가 0입니다. 결제가 진행되지 않습니다.");
      return ;
    } else if ($scope.adminCd == undefined || $scope.adminCd == ""){
      $scope.alert ("관리자코드를 입력하세요.");
      return ;
    }

    var myData = {
        affiliate_no  : $stateParams.affiliate_no,
        adminCd       : $scope.adminCd,
        saleAmt       : $scope.saleAmt,
        totalPoint    : $scope.totalPoint,
        usablePoint   : $scope.usablePoint,
        minusPoint    : $scope.minusPoint,
        balancePoint  : $scope.balancePoint,
        payAmt        : $scope.payAmt,
        uid           : $scope.uid
    }

    //alert(JSON.stringify(myData));

    //  ui-sref="gameng-pay-fin"

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/pay.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

        //console.log(JSON.stringify(data));
        //$scope.items = $scope.items.concat(data.listData);
        if (data.result == "0") {
          $scope.alert (data.msg);
        } else if (data.result == "1"){
          $scope.alert (data.msg);
          $state.go("gameng-pay-fin",{log_no:data.log_no});
          //$scoep.alert ( data.log_no);
            //$state.go("matchingListgMap",{type:apply});
        }
    }).error(function (data, status, headers, config) {
         // handle error things
    });

  }

  /*
  $scope.numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }*/

});
