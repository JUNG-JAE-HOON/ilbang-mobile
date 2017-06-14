angular.module('artistModify-controller', [])
.controller('artistModifyCtrl', function($scope, $localstorage, $ionicModal, $http, $httpParamSerializerJQLike,$ionicScrollDelegate) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    var listParam = { id: id }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getCultureList.php',
        data: $httpParamSerializerJQLike(listParam),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function (data, status, headers, config) {
        $scope.items = [];
        $scope.items = data.cultureList;

        if(data.profileList.no == null) {
            $scope.profileName = "이름";
            $scope.profileMessage = "상태 메세지";
            $scope.artistAddBtn = true;
        } else {
            $scope.profileName = data.profileList.name;
            $scope.profileMessage = data.profileList.message;

            $scope.profile.name = data.profileList.name;
            $scope.profile.year = data.profileList.year;
            $scope.profile.month = data.profileList.month;
            $scope.profile.day = data.profileList.day;
            $scope.profile.job = data.profileList.job;
            $scope.profile.birthPlace = data.profileList.birthPlace;
            $scope.profile.message = data.profileList.message;
            $scope.profile.facebook = data.profileList.facebook;
            $scope.profile.instagram = data.profileList.instagram;
            $scope.profile.kakao = data.profileList.kakao;
            $scope.artistAddBtn = false;
        }

        if(data.careerList == null) {
            $scope.careerBtn = "추가하기";
        } else {
            $scope.careers = [];
            $scope.careers = data.careerList;
            $scope.careerBtn = "수정하기";
        }

        if(data.scholarshipList == null) {
            $scope.scholarshipBtn = "추가하기";
        } else {
            $scope.scholars = [];
            $scope.scholars = data.scholarshipList;
            $scope.scholarshipBtn = "수정하기";
            console.log($scope.scholars)
        }

        if(data.prizeList == null) {
            $scope.prizeBtn = "추가하기";
        } else {
            $scope.prizes = [];
            $scope.prizes = data.prizeList;
            $scope.prizeBtn = "수정하기";
        }

        if(data.worksList == null) {
            $scope.worksBtn = "추가하기";
        } else {
            $scope.works = [];
            $scope.works = data.worksList;
            $scope.worksBtn = "수정하기";
        }
    });

    var today = new Date();

    $scope.Years = [];
    $scope.Months = [];
    $scope.Days = [];

    for (var i=today.getFullYear(); i>=today.getFullYear() - 100; i--) {
        $scope.Years.push(String(i));
    }

    for(var i=1; i<=12; i++) {
        $scope.Months.push(String(i));
    }

    for(var i=1; i<=31; i++) {
        $scope.Days.push(String(i));
    }

    //개인 프로필 추가
    $scope.profile = {};

    $scope.profileAdd = function() {
        if($scope.profile.name == null) {
            alert("이름을 입력해주세요.");
        } else if($scope.profile.year == null || $scope.profile.month == null || $scope.profile.day == null) {
            alert("생년월일을 선택해주세요.");
        } else if($scope.profile.job == null) {
            alert("직업을 입력해주세요.");
        } else if($scope.profile.birthPlace == null) {
            alert("출생지를 입력해주세요.");
        } else {
            var listParam = {
                id: id,
                kind: 'profile',
                name: $scope.profile.name,
                birthday: $scope.profile.year + "-" + $scope.profile.month + "-" + $scope.profile.day,
                birthPlace: $scope.profile.birthPlace,
                state_message: $scope.profile.message,
                job: $scope.profile.job,
                facebook: $scope.profile.facebook,
                instagram: $scope.profile.instagram,
                kakao: $scope.profile.kakao
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/profileApply.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                $scope.profileName = $scope.profile.name;
                $scope.buttonText = "수정하기";

                if($scope.profile.message == "" || $scope.profile.message == null) {
                    alert("상태 메세지를 입력하지 않으시면 상태 메세지 대신 직업이 노출됩니다.");

                    $scope.profileMessage = $scope.profile.job;
                } else {
                    $scope.profileMessage = $scope.profile.message;
                }

                alert(data);

                $scope.closeModal(1);
            });
        }
    }

    $scope.career = {};

    $ionicModal.fromTemplateUrl('templates/sotong/form/modal1.html', {
        id: "1",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal1 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/sotong/form/modal2.html', {
        id: "2",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal2 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/sotong/form/modal3.html', {
        id: "3",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal3 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/sotong/form/modal4.html', {
        id: "4",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal4 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/sotong/form/modal5.html', {
        id: "5",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal5 = modal;
    });

    $scope.openModal = function(index) {
        if(id == null) {
            alert('로그인 후 이용해주세요.');
        } else {
            if(index == "1") {
                $scope.modal1.show();
            } else if (index == "2") {
                $scope.modal2.show();
            } else if (index == "3") {
                $scope.modal3.show();
            } else if (index == "4") {
                $scope.modal4.show();
            } else {
                $scope.modal5.show();
            }
        }
    };

    $scope.closeModal = function(index) {
        if(index == "1") {
            $scope.modal1.hide();
        } else if(index == "2") {
            $scope.modal2.hide();
        } else if(index == "3") {
            $scope.modal3.hide();
        } else if(index == "4") {
            $scope.modal4.hide();
        } else {
            $scope.modal5.hide();
        }
    };
    // 경력추가
    $scope.careers2=[
      {
        startYear:"",
        startMonth:"",
        endYear:"",
        endMonth:"",
        content:""
      }
    ];
    $scope.addCareer=function(){
    		var newlist={
          startYear:"",
          startMonth:"",
          endYear:"",
          endMonth:"",
          content:""
    		}
    		$scope.careers2.push(newlist);
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
    	}
    // 학력추가
    $scope.scholars2=[
      {
        startYear:"",
        endYear:"",
        content:""
      }
    ];
    $scope.addScholar=function(){
    		var newlist={
    			startYear:"",
    			endYear:"",
          content:""
    		}
    		$scope.scholars2.push(newlist);
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
    	}
      // 수상경력추가
      $scope.prizes2=[
        {
          startYear:"",
          startMonth:"",
          endYear:"",
          endMonth:"",
          content:""
        }
      ];
      $scope.addprize=function(){
      		var newlist={
      			startYear:"",
            startMonth:"",
      			endYear:"",
            endMonth:"",
            content:""
      		}
      		$scope.prizes2.push(newlist);
          $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
      	}
        // 활동경력
        $scope.works2=[
          {
            startYear:"",
            content:""
          }
        ];
        $scope.addWork=function(){
        		var newlist={
        			startYear:"",
              content:""
        		}
        		$scope.works2.push(newlist);
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
        	}
})
