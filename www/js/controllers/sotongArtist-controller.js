angular.module('sotongArtist-controller', [])
.controller('sotongArtistCtrl', function($scope, $localstorage, $ionicModal, $http, $httpParamSerializerJQLike, $ionicScrollDelegate, $stateParams, $ionicPopup,$cordovaCamera,$ionicPopover) {
    if($localstorage.get("auto") == "true") {
        $scope.uid = $localstorage.get("id");
    } else {
        $scope.uid = sessionStorage.getItem("id");
    }
    $scope.count1=0;
    $scope.artistAddBtn = false;
    $scope.imgUrl1="img/sotong-plus.png";


    if($stateParams.no == null || $stateParams.no == "") {
        $scope.cultureBtn = "신청하기";
        $scope.addBtn2 = "추가하기";
        $scope.addBtn3 = "추가하기";
        $scope.addBtn4 = "추가하기";
        $scope.addBtn5 = "추가하기";
    } else {
        $scope.cultureBtn = "수정하기";
        $scope.addBtn1 = "수정하기";
        $scope.addBtn2 = "수정하기";
        $scope.addBtn3 = "수정하기";
        $scope.addBtn4 = "수정하기";
        $scope.addBtn5 = "수정하기";
    }

    var listParam = { id: $scope.uid }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getCultureList.php',
        data: $httpParamSerializerJQLike(listParam),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function (data, status, headers, config) {
        $scope.items = [];
        $scope.items = data.cultureList;

        if($scope.uid != null) {
            if(data.profileList.name == null) {
                $scope.addBtn1 = "추가하기";
                $scope.artistAddBtn = true;
                $scope.profileName = "이름";
                $scope.profileMessage = "상태 메세지";
            } else {
                $scope.addBtn1 = "수정하기";
                $scope.profileName = data.profileList.name;
                $scope.profileMessage = data.profileList.message;
            }
        }

        if(data.profileList.uid == $scope.uid) {
            $scope.kakaoView = true;
        } else {
            $scope.kakaoView = false;
        }

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

        if(data.profileList.imgUrl != null || data.profileList.imgUrl != "" || data.profileList.imgUrl != undefined) {
            document.getElementById("artistImg") = "url('" + data.profileList.imgUrl + "')";
            // document.getElementById("plusImg").style.display = "none";
            // $scope.imgUrl1 = data.profileList.imgUrl;

        } else {

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
            $scope.sotongAlert("이름을 입력해주세요.",0);
        } else if($scope.profile.year == null || $scope.profile.month == null || $scope.profile.day == null) {
            $scope.sotongAlert("생년월일을 선택해주세요.",0);
        } else if($scope.profile.job == null) {
            $scope.sotongAlert("직업을 입력해주세요.",0);
        } else if($scope.profile.birthPlace == null) {
            $scope.sotongAlert("출생지를 입력해주세요.",0);
        } else {
            var listParam = {
                id: $scope.uid,
                kind: 'profile',
                name: $scope.profile.name,
                birthday: $scope.profile.year + "-" + $scope.profile.month + "-" + $scope.profile.day,
                birthPlace: $scope.profile.birthPlace,
                state_message: $scope.profile.message,
                job: $scope.profile.job,
                facebook: $scope.profile.facebook,
                instagram: $scope.profile.instagram,
                kakao: $scope.profile.kakao,
                imgUrl: $scope.image_URL
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/profileApply.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                $scope.profileName = $scope.profile.name;
                $scope.addBtn1 = "수정하기";

                if($scope.profile.message == "" || $scope.profile.message == null) {
                    // $scope.sotongAlert("상태 메세지를 입력하지 않으시면 상태 메세지 대신 직업이 노출됩니다.");

                    $scope.profileMessage = $scope.profile.job;
                } else {
                    $scope.profileMessage = $scope.profile.message;
                }

                $scope.sotongAlert(data+"<br>상태 메세지를 입력하지 않으시면 상태 메세지 대신 직업이 노출됩니다.",1);
            });
        }
    }




$scope.getPath = function(){

  if(device.platform == 'Android' && device.sdkInt<20){

    $ionicPopup.confirm({
        cssClass : 'estiPop',
        title : '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
        template : '<div class="tc f12"><span><b>현재 안드로이드 버전에서는 이미지 업로드를 지원하지 않습니다. 이미지 파일을 업로드 하기 위하여 인터넷 브라우저로 이동합니다.</b></span><br>',
        buttons : [{
          text : '취소',
          type : 'button-default'
        },{
            text : '웹으로 이동',
            type : 'button-default',
            onTap: function(){
              window.open('http://il-bang.com/pc_renewal/up.php?id='+$scope.uid+'&no='+$stateParams.no, '_system');
            }
        }]
    });
  }
}

    $scope.uploadArtistImage = function() {


        if($('#FILE_TAG').val() == "") {
            $scope.sotongAlert("사진을 선택하세요.",0);
        } else {
            var form = $('artistForm')[0];
            var formData = new FormData(form);

            $scope.image_URL = "http://il-bang.com/pc_renewal/sotongFile/";

            formData.append("file", $("#FILE_TAG")[0].files[0]);
            formData.append("uid", $scope.uid);
            formData.append("no", $stateParams.no);

            $.ajax({
                url: "http://il-bang.com/ilbang_pc/ionic/http/sotong/uploadArtistImage.php",
                processData: false,
                contentType: false,
                data: formData,
                type: 'POST',
                dataType: 'JSON',
                success: function(data) {
                    $scope.sotongAlert(data.message,0);

                    $scope.imgUrl1 =$scope.image_URL + data.fileName;

                    if($stateParams.no == null || $stateParams.no == "") {

                        $scope.image_URL = data.fileName;
                    }
                }
            });
        }

    }

    //경력 사항 추가
    $scope.careerAdd = function() {
        var check = 0;

        for(var i=0; i<($scope.careers).length; i++) {
            if($scope.careers[i].startYear != null || $scope.careers[i].content != null) {
                if($scope.careers[i].startYear == null || $scope.careers[i].startYear == "") {
                    $scope.sotongAlert("시작 년도를 선택해주세요.",0);
                    return;
                } else if($scope.careers[i].content == null || $scope.careers[i].content == "") {
                    $scope.sotongAlert("경력 사항을 입력해주세요.",0);
                    return;
                } else {
                    check++;
                }
            } else {
                check++;
            }
        }

        if($scope.modifyCareers == null) {
            var check2 = $scope.careers.length;
        } else {
            var check2 = $scope.modifyCareers.length + $scope.careers.length;

            for(var i=0; i<($scope.modifyCareers).length; i++) {
                if($scope.modifyCareers[i].startYear == null || $scope.modifyCareers[i].startYear == "") {
                    $scope.sotongAlert("시작 년도를 선택해주세요.",0);
                    return;
                } else if($scope.modifyCareers[i].content == null || $scope.modifyCareers[i].content == "") {
                    $scope.sotongAlert("경력 사항을 입력해주세요.",0);
                    return;
                } else {
                    check++;
                }
            }
        }

        if(check == check2) {
            var listParam = {
                id: $scope.uid,
                kind: 'career',
                careers: $scope.careers,
                modifyCareers: $scope.modifyCareers
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/profileApply.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                // $scope.sotongAlert(data);

                $scope.addBtn2 = "수정하기";

                $scope.careers = [{
                    startYear : null,
                    startMonth : null,
                    endYear : null,
                    endMonth : null,
                    content : null
                }];

                $scope.sotongAlert(data,2);
            });
        }
    }

    //학력 사항 추가
    $scope.scholarshipAdd = function() {
        var check = 0;

        for(var i=0; i<($scope.scholars).length; i++) {
            if($scope.scholars[i].startYear != null || $scope.scholars[i].content != null) {
                if($scope.scholars[i].startYear == null || $scope.scholars[i].startYear == "") {
                    $scope.sotongAlert("시작 년도를 선택해주세요.",0);
                    return;
                } else if($scope.scholars[i].content == null || $scope.scholars[i].content == "") {
                    $scope.sotongAlert("경력 사항을 입력해주세요.",0);
                    return;
                } else {
                    check++;
                }
            } else {
                check++;
            }
        }

        if($scope.modifyScholars == null) {
            var check2 = $scope.scholars.length;
        } else {
            var check2 = $scope.modifyScholars.length + $scope.scholars.length;

            for(var i=0; i<($scope.modifyScholars).length; i++) {
                if($scope.modifyScholars[i].startYear == null || $scope.modifyScholars[i].startYear == "") {
                    $scope.sotongAlert("시작 년도를 선택해주세요.",0);
                    return;
                } else if($scope.modifyScholars[i].content == null || $scope.modifyScholars[i].content == "") {
                    $scope.sotongAlert("경력 사항을 입력해주세요.",0);
                    return;
                } else {
                    check++;
                }
            }
        }

        if(check == check2) {
            var listParam = {
                id: $scope.uid,
                kind: 'scholarship',
                scholars: $scope.scholars,
                modifyScholars: $scope.modifyScholars
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/profileApply.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                // $scope.sotongAlert(data);

                $scope.addBtn3 = "수정하기";

                $scope.scholars = [{
                    startYear : null,
                    endYear : null,
                    content : null
                }];

                $scope.sotongAlert(data,3);
            });
        }
    }

    //수상 내역 추가
    $scope.prizeAdd = function() {
        var check = 0;

        for(var i=0; i<($scope.prizes).length; i++) {
            if($scope.prizes[i].startYear != null || $scope.prizes[i].content != null) {
                if($scope.prizes[i].startYear == null || $scope.prizes[i].startYear == "") {
                    $scope.sotongAlert("시작 년도를 선택해주세요.",0);
                    return;
                } else if($scope.prizes[i].content == null || $scope.prizes[i].content == "") {
                    $scope.sotongAlert("경력 사항을 입력해주세요.",0);
                    return;
                } else {
                    check++;
                }
            } else {
                check++;
            }
        }

        if($scope.modifyPrizes == null) {
            var check2 = $scope.prizes.length;
        } else {
            var check2 = $scope.modifyPrizes.length + $scope.prizes.length;

            for(var i=0; i<($scope.modifyPrizes).length; i++) {
                if($scope.modifyPrizes[i].startYear == null || $scope.modifyPrizes[i].startYear == "") {
                    $scope.sotongAlert("시작 년도를 선택해주세요.",0);
                    return;
                } else if($scope.modifyPrizes[i].content == null || $scope.modifyPrizes[i].content == "") {
                    $scope.sotongAlert("경력 사항을 입력해주세요.",0);
                    return;
                } else {
                    check++;
                }
            }
        }

        if(check == check2) {
            var listParam = {
                id: $scope.uid,
                kind: 'prize',
                prizes: $scope.prizes,
                modifyPrizes: $scope.modifyPrizes
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/profileApply.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                // $scope.sotongAlert(data);

                $scope.addBtn4 = "수정하기";

                $scope.prizes = [{
                    startYear : null,
                    startMonth : null,
                    endYear : null,
                    endMonth : null,
                    content : null
                }];

                $scope.sotongAlert(data,4);
            });
        }
    }

    //전체 작품 활동 내역 추가
    $scope.worksAdd = function() {
        var check = 0;

        for(var i=0; i<($scope.works).length; i++) {
            if($scope.works[i].startYear != null || $scope.works[i].activityType != null || $scope.works[i].content != null) {
                if($scope.works[i].startYear == null || $scope.works[i].startYear == "") {
                    $scope.sotongAlert("시작 년도를 선택해주세요.",0);
                    return;
                } else if($scope.works[i].activityType == null || $scope.works[i].activityType == "") {
                    $scope.sotongAlert("활동 분야를 입력해주세요.",0);
                    return;
                } else if($scope.works[i].content == null || $scope.works[i].content == "") {
                    $scope.sotongAlert("경력 사항을 입력해주세요.",0);
                    return;
                } else {
                    check++;
                }
            } else {
                check++;
            }
        }

        if($scope.modifyWorks == null) {
            var check2 = $scope.works.length;
        } else {
            var check2 = $scope.modifyWorks.length + $scope.works.length;

            for(var i=0; i<($scope.modifyWorks).length; i++) {
                if($scope.modifyWorks[i].startYear == null || $scope.modifyWorks[i].startYear == "") {
                    $scope.sotongAlert("시작 년도를 선택해주세요.",0);
                    return;
                } else if($scope.modifyWorks[i].activityType == null || $scope.modifyWorks[i].activityType == "") {
                    $scope.sotongAlert("활동 분야를 입력해주세요.",0);
                    return;
                } else if($scope.modifyWorks[i].content == null || $scope.modifyWorks[i].content == "") {
                    $scope.sotongAlert("경력 사항을 입력해주세요.",0);
                    return;
                } else {
                    check++;
                }
            }
        }

        if(check == check2) {
            var listParam = {
                id: $scope.uid,
                kind: 'works',
                works: $scope.works,
                modifyWorks: $scope.modifyWorks
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/profileApply.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                // $scope.sotongAlert(data);

                $scope.addBtn5 = "수정하기";

                $scope.works = [{
                    startYear : null,
                    activityType : null,
                    content : null
                }];

                $scope.sotongAlert(data,5);
            });
        }
    }

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
        cache: false,
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
        var listParam = { id: $scope.uid }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getCultureList.php',
            data: $httpParamSerializerJQLike(listParam),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {

            if($scope.uid == null) {
                $scope.sotongAlert('로그인 후 이용해주세요.',0);
            } else {
                if(index == "1") {
                    $scope.modal1.show();
                } else if (index == "2") {
                    $scope.modifyCareers = [];
                    $scope.modifyCareers = data.careerList;
                    $scope.modal2.show();
                } else if (index == "3") {
                    $scope.modifyScholars = [];
                    $scope.modifyScholars = data.scholarshipList;
                    $scope.modal3.show();
                } else if (index == "4") {
                    $scope.modifyPrizes = [];
                    $scope.modifyPrizes = data.prizeList;
                    $scope.modal4.show();
                } else {
                    $scope.modifyWorks = [];
                    $scope.modifyWorks = data.worksList;
                    $scope.modal5.show();
                }
            }
        });
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

    // 경력 사항 추가
    $scope.careers = [{
        startYear : null,
        startMonth : null,
        endYear : null,
        endMonth : null,
        content : null
    }];

    $scope.addCareer = function() {
        var newlist = {
            startYear : null,
            startMonth : null,
            endYear : null,
            endMonth : null,
            content : null
	    }

        $scope.careers.push(newlist);
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
	}

    // 학력 사항 추가
    $scope.scholars = [{
        startYear : null,
        endYear : null,
        content : null
    }];

    $scope.addScholar = function() {
        var newlist = {
            startYear : null,
            endYear : null,
            content : null
        }

		$scope.scholars.push(newlist);
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
    }

    // 수상 경력 추가
    $scope.prizes = [{
        startYear : null,
        startMonth : null,
        endYear : null,
        endMonth : null,
        content : null
    }];

    $scope.addPrize = function() {
        var newlist = {
            startYear : null,
            startMonth : null,
      		endYear : null,
            endMonth : null,
            content : null
      	}

      	$scope.prizes.push(newlist);
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
    }

    // 활동경력
    $scope.works = [{
        startYear : null,
        activityType : null,
        content : null
    }];

    $scope.addWork = function() {
        var newlist = {
            startYear : null,
            activityType : null,
            content : null
        }

        $scope.works.push(newlist);
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
    }

    $scope.sotongAlert = function(msg,number) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass : 'estiPop',
            title : '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
            template : '<div class="tc f12"><span><b>' + msg + '</b></span><br>',
            buttons : [{
                text : '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                type : 'button-default',
                onTap: function(){
                  if(number!=0){
                    if(number == "1") {
                        $scope.modal1.hide();
                    } else if(number == "2") {
                        $scope.modal2.hide();
                    } else if(number == "3") {
                        $scope.modal3.hide();
                    } else if(number == "4") {
                        $scope.modal4.hide();
                    } else {
                        $scope.modal5.hide();
                    }
                  }
                }
            }]
        });
    };
    $ionicPopover.fromTemplateUrl('../templates/sotong/view/popover.html', {
    scope: $scope
    }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };

})
