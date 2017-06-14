angular.module('join-controller', [])

.controller('JoinCtrl', function($scope) {
    $scope.ages = [
        { id: 0, title: '20 ~ 40대' },
        { id: 1, title: '50 ~ 60대' }
    ];

    $scope.ageList = { id: 0, title: '20 ~ 40대' };



})


.controller('JoinValidCtrl', function($scope, $ionicModal,$state, $http,$ionicPopup) {
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

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/in/ionic_in.php',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function (data, status, headers, config) {


        $scope.codeData = data.trim();

    }).error(function (data, status, headers, config) {
        // handle error things
    });



    $scope.submitForm = function(kind) {
        var check1 = $scope.checkValue1;
        var check2 = $scope.checkValue2;
        var check3 = $scope.checkValue3;
        var check4 = $scope.checkValue4;
        var check5 = $scope.checkValue5;
        var all = $scope.all;

        // 모두 동의 체크 했을 시 --> 다른 체크 박스 disabled로 만들고 값 강제로 true로 설정
        if(all) {
            check1 = true;
            check2 = true;
            check3 = true;
            check4 = true;
        };

        if(check1 && check2 && check3 && check4 && check5) {
           if(kind == 'general'){
             $state.go('generalFull');
           }else{
              $state.go('companyFull');
           }
        } else {
            $scope.alert('전부 동의 해주시기 바랍니다.');
            $event.preventDefault();        //Cancels the event if it is cancelable, without stopping further propagation of the event.
        }
    };
})


.controller('JoinModalCtrl', function($scope, $ionicModal, $http) {


    var modal=['templates/member/new-member/choice2.html','templates/member/new-member/join-step1.html', 'templates/member/new-member/join-step2.html', 'templates/member/new-member/join-com-step1.html','templates/member/new-member/join-com-step2.html','templates/member/new-member/join-com-step3.html','templates/member/new-member/join-com-step4.html'];
      $ionicModal.fromTemplateUrl('templates/member/new-member/choice2.html', {
        id: '22', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModal22 = modal;
      });

      $ionicModal.fromTemplateUrl('templates/member/new-member/join-step1.html', {
        id: '1', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModal1 = modal;
      });

      // step2 (일반 - 5,60대)
      $ionicModal.fromTemplateUrl('templates/member/new-member/join-step2.html', {
        id: '2', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModal2 = modal;
      });

      $ionicModal.fromTemplateUrl('templates/member/new-member/join-com-step1.html', {
        id: '3', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModal3 = modal;
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/join-com-step2.html', {
        id: '4', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModal4 = modal;
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/join-com-step3.html', {
        id: '5', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModal5 = modal;
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/join-com-step4.html', {
        id: '6', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModal6 = modal;
      });
      // 약관 전문보기

      $ionicModal.fromTemplateUrl('templates/member/new-member/agree/agree1.html', {
        id: 'agree1', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.agModal1 = modal;
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/agree/agree2.html', {
        id: 'agree2', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.agModal2 = modal;
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/agree/agree3.html', {
        id: 'agree3', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.agModal3 = modal;
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/agree/agree4.html', {
        id: 'agree4', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.agModal4 = modal;
      });
      // 기업약관 전문 보기
      $ionicModal.fromTemplateUrl('templates/member/new-member/agree/agreeComp1.html', {
        id: 'agreeComp1', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.agModalComp1 = modal;
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/agree/agreeComp2.html', {
        id: 'agreeComp2', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.agModalComp2 = modal;
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/agree/agreeComp3.html', {
        id: 'agreeComp3', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.agModalComp3 = modal;
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/agree/agreeComp4.html', {
        id: 'agreeComp4', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.agModalComp4 = modal;
      });

      $scope.openModal = function(index) {
        if (index == 1) $scope.oModal1.show();
        else if(index == 2)$scope.oModal2.show();
        else if(index == 3)$scope.oModal3.show();
        else if(index == 4)$scope.oModal4.show();
        else if(index == 5)$scope.oModal5.show();
        else if(index == 22)$scope.oModal22.show();
        else $scope.oModal6.show();
      };

      $scope.closeModal = function(index) {
        if (index == 1) $scope.oModal1.hide();
        else if(index == 2)$scope.oModal2.hide();
        else if(index == 3)$scope.oModal3.hide();
        else if(index == 4)$scope.oModal4.hide();
        else if(index == 5)$scope.oModal5.hide();
        else if(index == 22)$scope.oModal22.hide();
        else $scope.oModal6.hide();
      };

      $scope.agModal = function(index) {
        if (index == 1) $scope.agModal1.show();
        else if(index == 2)$scope.agModal2.show();
        else if(index == 3)$scope.agModal3.show();
        else $scope.agModal4.show();
      };

      $scope.agModalComp = function(index) {
        if (index == 1) $scope.agModalComp1.show();
        else if(index == 2)$scope.agModalComp2.show();
        else if(index == 3)$scope.agModalComp3.show();
        else $scope.agModalComp4.show();
      };

      $scope.createContact = function(u) {
        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        $scope.modal.hide();
      };

      $scope.setStep1 = function(u) {
        // $scope.contacts.push({ name: u.word1 +' 입니다. ', });
        // $scope.closeModal(1);
        // $scope.openModal(2);

        $scope.closeModal(1);
        $scope.openModal(2);
      };
      $scope.setStep2 = function(u) {
        // $scope.contacts.push({ name: u.word3 +' 입니다. '  });
        $scope.closeModal(2);
      };
      $scope.setStep3 = function(u) {
        // $scope.contacts.push({ name: u.word3 +' 입니다. '  });

        $scope.closeModal(3);
        $scope.openModal(4);
      };
      $scope.setStep4 = function(u) {
        // $scope.contacts.push({ name: u.word3 +' 입니다. '  });
        $scope.closeModal(4);
        $scope.openModal(5);
      };
      $scope.setStep5 = function(u) {
        // $scope.contacts.push({ name: u.word3 +' 입니다. '  });
        $scope.closeModal(5);
        $scope.openModal(6);
      };
      $scope.setStep6 = function(u) {
        // $scope.contacts.push({ name: u.word3 +' 입니다. '  });
        $scope.closeModal(6);

      };
      $scope.setChoice1 = function(u) {
        // $scope.contacts.push({ name: u.word3 +' 입니다. '  });


        $scope.openModal(22);
      };
      $scope.setChoice2 = function(u) {
        // $scope.contacts.push({ name: u.word3 +' 입니다. '  });
        $scope.closeModal(22);
      };


})

// 인증 마친 후 valid-finish.html파일에서 모달 띄우는 스크립트입니다.
.controller('generalModalCtrl', function($scope, $ionicModal, $http) {


      $ionicModal.fromTemplateUrl('templates/member/new-member/join-step1.html', {
        id:'1',
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModalGen1 = modal;
        $scope.oModalGen1.show();

      });

        $ionicModal.fromTemplateUrl('templates/member/new-member/join-step2.html', {
          id:'2',
          scope: $scope,
          backdropClickToClose: false,
          animation: 'slide-in-right'
        }).then(function(modal) {
          $scope.oModalGen2 = modal;
        });

      $scope.next = function(index) {
        switch (index) {
          case 1:
              $scope.oModalGen2.show();
          break;
          case 2:
              // $scope.oModalGen2.show();
          break;
        }
      };
      $scope.back = function() {
        $scope.oModalGen2.hide();
      };

})
// 인증 마친 후 valid-finish.html파일에서 모달 띄우는 스크립트입니다.
.controller('compModalCtrl', function($scope, $ionicModal, $http) {

      $ionicModal.fromTemplateUrl('templates/member/new-member/join-com-step1.html', {
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModalComp1 = modal;
        $scope.oModalComp1.show();
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/join-com-step2.html', {
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModalComp2 = modal;
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/join-com-step3.html', {
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModalComp3 = modal;
      });
      $ionicModal.fromTemplateUrl('templates/member/new-member/join-com-step4.html', {
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-right'
      }).then(function(modal) {
        $scope.oModalComp4 = modal;
      });
      $scope.next = function(index) {
        switch (index) {
          case 1:
              $scope.oModalComp1.hide();
              $scope.oModalComp2.show();
          break;
          case 2:
              $scope.oModalComp2.hide();
              $scope.oModalComp3.show();
          break;
          case 3:
              $scope.oModalComp3.hide();
              $scope.oModalComp4.show();
          break;
          case 4:
              // $scope.oModalComp2.show();
          break;
        }
      };
      $scope.back = function(index) {
        switch (index) {
            case 1:
                $scope.oModalComp1.hide();
            break;
            case 2:
                $scope.oModalComp1.show();
                $scope.oModalComp2.hide();
            break;
            case 3:
                $scope.oModalComp2.show();
                $scope.oModalComp3.hide();
            break;
            case 4:
                $scope.oModalComp3.show();
                $scope.oModalComp4.hide();
            break;
        }
      };
      $scope.emails = [
          { id: 0, emailName: '직접 입력' },
          { id: 1, emailName: 'naver.com' },
          { id: 2, emailName: 'hanmail.net' },
          { id: 3, emailName: 'gmail.com' }
      ];

      $scope.emailList = { id: 0, emailName: '직접 입력' };

})

.controller('generalFullCtrl', function($scope, $http,$httpParamSerializerJQLike,$state,$ionicPopup) {




  $scope.selboxData = {
      email: ['직접입력','naver.com', 'nate.com', 'hanmail.net', 'gmail.com']
  }



  $scope.changeEmail = function(emailAddr) {
      if(emailAddr == "직접입력"){
          $scope.emailtwo = "";
          //$timeout(function() {
        //     document.getElementById("emailAddr").focus();
        //  },750);
      }else {
          $scope.emailtwo = emailAddr;
      }

  }

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
      var today = new Date();
  var numberOfYears = (new Date()).getYear() - 10;
  $scope.Years = [];

  for (var i=today.getFullYear()-15; i>=today.getFullYear() - 100; i-- ){
      $scope.Years.push(String(i));
  }
   //$.map($(Array(numberOfYears)), function (val, i) { return i + 1900; });
  var months = $.map($(Array(12)), function (val, i) { return i + 1; });
  var days = $.map($(Array(31)), function (val, i) { return i + 1; });

  // $scope.Years = years;
  $scope.Days = days;
  $scope.Months = months;

  var idCheck=1;  //아이디체크 (특)
  var sex="";      //성별 male/female
  var obstacle=""; //장애 여부 yes/no

  $scope.checkID = function(){
    var str = $scope.uid;
    if (str.match(/[^a-zA-Z0-9]/) != null ) {
      $scope.alert("숫자와 영문만 입력할 수 있습니다.");
      return;
    }

    var idParam={
      uid:$scope.uid
    }
      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/member/idCheck.php',
          data: $httpParamSerializerJQLike(idParam),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
           idCheck=data.no; //아이디 체크 추후
          $scope.alert(data.message);

          //$scope.$broadcast('scroll.infiniteScrollComplete');
      }).error(function (data, status, headers, config) {
          // handle error things
      });

  }
  $scope.sexCheck = function (va){
      sex = va;
  }
  $scope.obstacleCheck = function (va){
    obstacle =va;
  }

  $scope.addNewMember = function(){
    if($scope.checkForm()){
      //회원가입 실행
      var phone = $scope.phone1+"-"+$scope.phone2+"-"+$scope.phone3;

      var year=parseInt(new Date().getFullYear());
      var ck=parseInt($scope.SelectedYear);
      var age=(year-ck)+1; // 우리나라 나이 표시 +1 더함


      var idParam={
        uid:$scope.uid,
        pwd:$scope.pwd1,
        email:$scope.emailone+"@"+$scope.emailtwo,
        sex:sex,
        obstacle:obstacle,
        phone:phone,
        name:$scope.name,
        year:$scope.SelectedYear,
        month:$scope.SelectedMonth,
        days:$scope.SelectedDays,
        kind:"general",
        age: age,
        ruid:$scope.ruid

      }
        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/member/addNewMember.php',
            data: $httpParamSerializerJQLike(idParam),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {

            $scope.alert(data.message);

            $state.go('login');

            //$scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (data, status, headers, config) {
            // handle error things
        });



    }
  }




  $scope.checkForm =  function(){



    if(idCheck==1){
      $scope.alert("사용할수 없는 ID입니다.");
      return false;
    }
    if($scope.uid.length < 4){
      $scope.alert("아이디가 짧습니다.");
      return false;
    }

    if($scope.pwd1 ==undefined || $scope.pwd2 ==undefined){
      $scope.alert("비밀번호를 입력하세요.");
      return false;
    }
    if($scope.emailone == "" || $scope.emailtwo == ""){
      $scope.alert("e-maile 입력하세요.");
      return false;
    }
    if($scope.name == undefined){
      $scope.alert("이름을 입력하세요.");
      return false;
    }
    if($scope.SelectedDays==undefined || $scope.SelectedMonth==undefined || $scope.SelectedYear==undefined){
      $scope.alert("생년월일을 입력하세요.");
      return false;
    }
    if(sex=="" && obstacle==""){
      $scope.alert("성별과 장애여부를 확인해주세요.");
      return false;
    }
    if($scope.pwd1 != $scope.pwd2){
      $scope.alert("비밀번호가 같지않습니다.");
      return false;
    }
    if($scope.pwd1.length < 6){
      $scope.alert("비밀번호가 짧습니다.");
      return false;
    }

    if($scope.phone1 == undefined || $scope.phone2 == undefined || $scope.phone3 == undefined){
      $scope.alert("핸드폰 번호를 입력하세요.");
      return false;
    }

    return true;
  }

  $scope.emailList = "직접입력";

})



.controller('companyFullCtrl', function($scope, $http,$httpParamSerializerJQLike,$state,$ionicPopup) {


  $scope.selboxData = {
      email: ['직접입력','naver.com', 'nate.com', 'hanmail.net', 'gmail.com']
  }
  $scope.changeEmail = function(emailAddr) {
      if(emailAddr == "직접입력"){
          $scope.emailtwo = "";
          //$timeout(function() {
        //     document.getElementById("emailAddr").focus();
        //  },750);
      }else {
          $scope.emailtwo = emailAddr;
      }

  }
  //사업자등록번호 체크
$scope.checkBizID = function(bizID)  {
    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    var tmpBizID, i, chkSum=0, c2, remander;
    bizID = bizID.replace(/-/gi,'');

    for (i=0; i<=7; i++) {
        chkSum += checkID[i] * bizID.charAt(i);
    }

    c2 = "0" + (checkID[8] * bizID.charAt(8));
    c2 = c2.substring(c2.length - 2, c2.length);
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
    remander = (10 - (chkSum % 10)) % 10 ;

    if (Math.floor(bizID.charAt(9)) == remander) {
        return true ; // OK!
    }
    return false;
}
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
  var numberOfYears = (new Date()).getYear() - 10;
  $scope.Years = [];
  $scope.Years2 = [];
  // $.map($(Array(numberOfYears)), function (val, i) { return i + 1930; });
  var today = new Date();

  for (var i=today.getFullYear()-0; i>=today.getFullYear() - 100; i-- ){
      $scope.Years2.push(String(i));
  }


  for (var i=today.getFullYear()-15; i>=today.getFullYear() - 100; i-- ){
      $scope.Years.push(String(i));
  }

  var months = $.map($(Array(12)), function (val, i) { return i + 1; });
  var days = $.map($(Array(31)), function (val, i) { return i + 1; });

  // $scope.Years = years;
  $scope.Days = days;
  $scope.Months = months;

  var idCheck=1;  //아이디체크 (특)
  var sex="";      //성별 male/female


  $scope.checkID = function(){
    var str = $scope.uid;
    if (str.match(/[^a-zA-Z0-9]/) != null ) {
      $scope.alert("숫자와 영문만 입력할 수 있습니다.");
      return;
    }

    var idParam={
      uid:$scope.uid
    }
      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/member/idCheck.php',
          data: $httpParamSerializerJQLike(idParam),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
           idCheck=data.no; //아이디 체크 추후
          $scope.alert(data.message);

          //$scope.$broadcast('scroll.infiniteScrollComplete');
      }).error(function (data, status, headers, config) {
          // handle error things
      });

  }
  $scope.sexCheck = function (va){
      sex = va;
  }
  $scope.emails = [
      { id: 0, emailName: '직접 입력' },
      { id: 1, emailName: 'naver.com' },
      { id: 2, emailName: 'hanmail.net' },
      { id: 3, emailName: 'gmail.com' }
  ];

  $scope.emailList = { id: 0, emailName: '직접 입력' };



  $scope.addNewMember = function(){
    if($scope.checkForm()){
      //회원가입 실행
      var phone = $scope.phone1+"-"+$scope.phone2+"-"+$scope.phone3;

      var year=parseInt(new Date().getFullYear());
      var ck=parseInt($scope.SelectedYear);
      var age=(year-ck)+1; // 우리나라 나이 표시 +1 더함
      var number = $scope.number1+"-"+$scope.number2+"-"+$scope.number3;
      var idParam={
        uid:$scope.uid,
        pwd:$scope.pwd1,
        email:$scope.emailone+"@"+$scope.emailtwo,
        sex:sex,
        obstacle:'no',
        phone:phone,
        name:$scope.name,
        year:$scope.SelectedYear,
        month:$scope.SelectedMonth,
        days:$scope.SelectedDays,
        kind:"company",
        age: age,
        ceo: $scope.ceo,
        company:$scope.company,
        flotation:$scope.flotation,
        types:$scope.types,
        number:number,
        content:$scope.content,
        status:$scope.status,
        ruid:$scope.ruid


      }
        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/member/addNewMember.php',
            data: $httpParamSerializerJQLike(idParam),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {

            $scope.alert(data.message);
              $state.go('login');
            //$scope.$broadcast('scroll.infiniteScrollComplete');
        }).error(function (data, status, headers, config) {
            // handle error things
        });



    }
  }



  $scope.checkForm =  function(){

    if(idCheck==1){
      $scope.alert("사용할수 없는 ID입니다.");
      return false;
    }
    if($scope.uid.length < 4){
      $scope.alert("아이디가 짧습니다.");
      return false;
    }

    if($scope.pwd1 ==undefined || $scope.pwd2 ==undefined){
      $scope.alert("비밀번호를 입력하세요.");
      return false;
    }
    if($scope.emailone == undefined || $scope.emailtwo == undefined){
      $scope.alert("e-maile 입력하세요.");
      return false;
    }
    if($scope.name == undefined){
      $scope.alert("이름을 입력하세요.");
      return false;
    }
    if($scope.SelectedDays==undefined || $scope.SelectedMonth==undefined || $scope.SelectedYear==undefined){
      $scope.alert("생년월일을 입력하세요.");
      return false;
    }
    if(sex=="" ){
      $scope.alert("성별을 확인해주세요.");
      return false;
    }
    if($scope.pwd1 != $scope.pwd2){
      $scope.alert("비밀번호가 같지않습니다.");
      return false;
    }
    if($scope.pwd1.length < 6){
      $scope.alert("비밀번호가 짧습니다.");
      return false;
    }

    if($scope.phone1 == undefined || $scope.phone2 == undefined || $scope.phone3 == undefined){
      $scope.alert("핸드폰 번호를 입력하세요.");
      return false;
    }
    if($scope.types==undefined){
      $scope.alert("기업 형태를 선택해 주세요.");
      return false;
    }
    if($scope.company==undefined){
      $scope.alert("기업 이름을 입력해 주세요.");
      return false;
    }
    if($scope.ceo==undefined){
      $scope.alert("대표 성명을 입력해 주세요.");
      return false;
    }

    if($scope.content==undefined){
      $scope.alert("사업내용을 입력해주세요.");
      return false;
    }
    if($scope.flotation==undefined){
      $scope.alert("설립년도를 입력해주세요.");
      return false;
    }
    if($scope.number1 == undefined || $scope.number2== undefined || $scope.number3 == undefined){
      $scope.alert("사업자 번호 입력해주세요.");
      return false;
    }if(!checkBizID($scope.number1+$scope.number2+$scope.number3)){
      $scope.alert("사업자 가 올바르지 않습니다.");
      return false;
    }

    return true;
  }

  function checkBizID(bizID)  {
              // bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
              var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
              var tmpBizID, i, chkSum = 0, c2, remander;

              bizID = bizID.replace(/-/gi,'');

              for (i=0; i<=7; i++) {
                  chkSum += checkID[i] * bizID.charAt(i);
              }

              c2 = "0" + (checkID[8] * bizID.charAt(8));
              c2 = c2.substring(c2.length - 2, c2.length);
              chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
              remander = (10 - (chkSum % 10)) % 10 ;

              if (Math.floor(bizID.charAt(9)) == remander) {
                  return true ; // OK!
              }

              return false;
          }

})
