angular.module('insrtEMCmpInfo-controller',[])
.controller('insrtEMCmpInfoCtrl', function($scope, $http, $httpParamSerializerJQLike,$ionicPopup, $localstorage, $state) {

  function is_binNo(num) {
    var reg = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/;
    if (!reg.test(num)) return false;
      num = RegExp.$1 + RegExp.$2 + RegExp.$3;
    var cVal = 0;
    for (var i=0; i<8; i++) {
      var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp == 1 ) ? 3 : 7);
      cVal += (parseFloat(num.substring(i,i+1)) * cKeyNum) % 10;
    }
    var li_temp = parseFloat(num.substring(i,i+1)) * 5 + '0';
    cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2));
    return (parseInt(num.substring(9,10)) == 10-(cVal % 10)%10);
  }

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

  $scope.addInfo = {};

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

  String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/gi, "");
  }

  $scope.insrtCmpInfo = function(){

    $scope.number = ''+$scope.addInfo.number1+$scope.addInfo.number2+$scope.addInfo.number3;

    if($scope.uid == undefined || $scope.uid == "" ) {
      $scope.alert("로그인 하세요.");
      return ;
    }
    else if($scope.addInfo.company == undefined || String($scope.addInfo.company).trim() == "" ){
      $scope.alert("회사/점포명을 입력해주세요.");
      return ;
    } else if ($scope.addInfo.ceo == undefined || String($scope.addInfo.ceo).trim() == ""){
      $scope.alert("대표자 이름을 입력해주세요.");
      return ;
    } else if ($scope.addInfo.number1 == undefined || String($scope.addInfo.number1).trim() == ""){
      $scope.alert("사업자 등록 번호를 입력해주세요.");
      return ;
    } else if ($scope.addInfo.number2 == undefined || String($scope.addInfo.number2).trim() == ""){
      $scope.alert("사업자 등록 번호를 입력해주세요.");
      return ;
    } else if ($scope.addInfo.number3 == undefined || String($scope.addInfo.number3).trim() == ""){
      $scope.alert("사업자 등록 번호를 입력해주세요.");
      return ;
    } else if (!is_binNo($scope.number)) {
      $scope.alert("사업자 등록 번호를 올바르게 입력해주세요.");
      return ;
    } else if ($scope.addInfo.types == undefined ||  $scope.addInfo.types == ""){
      $scope.alert("업종을 선택해주세요.");
      return ;
    } else if ($scope.addInfo.status == undefined ||  $scope.addInfo.status == ""){
      $scope.alert("기업형태를 선택해주세요.");
      return ;
    } else if ($scope.addInfo.content == undefined ||  String($scope.addInfo.content).trim() == ""){
      $scope.alert("주요 사업 내용을 입력해주세요.");
      return ;
    } else if ($scope.addInfo.flotation == undefined ||  $scope.addInfo.flotation == ""){
     $scope.alert("설립연도를 선택하세요.");
     return ;
    }
    //alert(JSON.stringify($scope.addInfo));

    $scope.addInfo.uid       = $scope.uid         ;
    $scope.addInfo.member_no = $scope.member_no   ;
    $scope.addInfo.valid_no  = $scope.valid_no    ;

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/insrtCmpInfo.php',
        data: $httpParamSerializerJQLike($scope.addInfo),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

         if(data.result == "1" || data.result == "2"){            // 성공
            $scope.alert(data.msg);
            $state.go("emergency");
         } else if (data.result == "0") {    // 실패
            $scope.alert(data.msg);
         }
    }).error(function (data, status, headers, config) {
        // handle error things
    });

  }

})
