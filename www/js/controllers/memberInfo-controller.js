angular.module('memberInfo-controller',[])
/*
.controller('updMemberInfoCtrl', function($scope,  $location, $http, $httpParamSerializerJQLike, $state,$stateParams, $timeout, $ionicScrollDelegate) {
  
    // $scope.status;
    // $scope.emailAddr;
    // $scope.types;
    // $scope.flatation;
    // $scope.sex;
    // $scope.emailAddrSel;

    $scope.memberInfoList = [];

    $scope.selboxData = { 
        status: ['소기업','중소기업', '대기업'],
        email: ['직접입력','naver.com', 'nate.com', 'daum.net', 'google.com'],
        types: ['서비스업','판매/유통','건설업','제조/화학','IT/통신','기관/협회','교육업','의료/제약/복지','미디어/디자인','은행/금융업'],
        flatation : [],
        year: [],
        month: [1,2,3,4,5,6,7,8,9,10,11,12],
        day: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
    }
  
    var today = new Date();

    for (var i=today.getFullYear(); i>=today.getFullYear() - 100; i-- ){
        $scope.selboxData.flatation.push(String(i));
    }

    for (var i=today.getFullYear()-17; i>=today.getFullYear() - 117; i-- ){
        $scope.selboxData.year.push(String(i));
    }

    
    var kind = "company";

    if      (kind == "general" ) $scope.isCompany = false;
    else if (kind == "company" ) $scope.isCompany = true;


    
    var myData = {
      uid:  '',
      kind: ''
    }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/ajax/getMemberInfo.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        // handle success things
        //$scope.items = data.listData;
        //$scope.items.push(data.listData[0]);
        $scope.memberInfoList = $scope.memberInfoList.concat(data.listData);
        $scope.emailId   = data.listData[0].emailId;
        $scope.year      = data.listData[0].year;
        $scope.month     = Number(data.listData[0].month);
        $scope.day       = Number(data.listData[0].day);
        $scope.sex       = data.listData[0].sex;
        $scope.name      = data.listData[0].name;
        $scope.phone1    = data.listData[0].phone1;
        $scope.phone2    = data.listData[0].phone2;
        $scope.phone3    = data.listData[0].phone3;


        if (data.listData[0].emailAddr == null){
            $scope.emailAddr = "직접입력";
        } else {
            $scope.emailAddr = data.listData[0].emailAddr;
        }

        if ($scope.isCompany){
            
            $scope.types    = data.listData[0].types;
            $scope.flatation= data.listData[0].flatation;
            $scope.status   = data.listData[0].status;
            $scope.content  = data.listData[0].content;
            $scope.number1  = data.listData[0].number1;
            $scope.number2  = data.listData[0].number2;
            $scope.number3  = data.listData[0].number3;
            $scope.company  = data.listData[0].company;
            $scope.ceo      = data.listData[0].ceo;

        }
    }).error(function (data, status, headers, config) {
    });

    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/gi, "");
    }

    $scope.updMemberInfo =  function () {
        
        if($scope.pwd1 == undefined  ) {
            alert("패스워드를 입력하세요.");
            $ionicScrollDelegate.scrollTop();
             $timeout(function() {
                document.getElementById("pwd1").focus(); 
            },750);
            return ;
        } else if (String($scope.pwd1).trim() == '') {
            alert("공백을 입력할 수 없습니다.");
            $ionicScrollDelegate.scrollTop();
             $timeout(function() {
                $("#pwd1").select();
            },750);
            return ;
        } else if ($scope.pwd2 == undefined){
            alert("패스워드를 재입력 입력하세요.");
            $ionicScrollDelegate.scrollTop();
             $timeout(function() {
                document.getElementById("pwd2").focus(); 
            },750);
            return ;
        } else if (String($scope.pwd1).length < 6){
            alert("패스워드가 너무 짧습니다 (6자 이상)");
            $ionicScrollDelegate.scrollTop();
             $timeout(function() {
                $("#pwd1").select();
            },750);
            return ;           
            
        } else if ($scope.pwd1 != $scope.pwd2){
            alert("입력한 패스워드가 일치하지 않습니다.");
            $ionicScrollDelegate.scrollTop();
             $timeout(function() {
                $("#pwd1").select();
            },750);
            return ;
        }
        alert($scope.pwd1);
        alert($scope.pwd2);
        alert($scope.types);
        alert($scope.flatation);
        alert($scope.status);
        alert($scope.sex);
        alert($scope.content);
    }
})*/
