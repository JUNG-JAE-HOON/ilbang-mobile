angular.module('cultureList-controller',[])
.controller('sotongListCtrl', function($scope, $state, $localstorage, $http, $httpParamSerializerJQLike, $stateParams, $ionicPopup) {
    if($localstorage.get("auto") == "true") {
        $scope.uid = $localstorage.get("id");
    } else {
        $scope.uid = sessionStorage.getItem("id");
    }

    if($stateParams.type == "culture") {
        $scope.title = "문화";
    } else if($stateParams.type == "advert") {
        $scope.title = "광고/홍보";
    } else if($stateParams.type == "care") {
        $scope.title = "요양";
    } else if($stateParams.type == "fitness") {
        $scope.title = "휘트니스";
    }

    $scope.sotongAlert = function(msg) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass : 'estiPop',
            title : '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
            template : '<div class="tc f12"><span><b>' + msg + '</b></span><br>',
            buttons : [{
                text : '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                type : 'button-default',
                onTap: function(){
                }
            }]
        });
    };

    $scope.kakaoView = false;
    $scope.alreadyAdd = false;
    $scope.type = $stateParams.type;

    var listParam = { id: $scope.uid, type: $scope.title }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getSotongList.php',
        data: $httpParamSerializerJQLike(listParam),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function (data, status, headers, config) {
        $scope.items = [];
        $scope.items = data.sotongList;

        if(data.cnt != 0) {
            $scope.alreadyAdd = true;

            if(data.view == "yes") {
                $scope.kakaoView = true;
            }
        }
    });

    $scope.artistAddBtn = function() {
        if($scope.uid == null) {
            var confirmPopup = $ionicPopup.confirm({
                cssClass: 'estiPop',
                template:'<div class="tc">'
                                + '<img src="img/cloud.png" width="15%">'
                                + '<div class="tc f14 bold mt30 mb10">로그인 후 이용바랍니다.</div>'
                                + '</div>',
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
        } else {
            if($scope.alreadyAdd == true) {
                var confirmPopup = $ionicPopup.confirm({
                    cssClass: 'estiPop',
                    template:'<div class="tc">'
                                    + '<img src="img/cloud.png" width="15%">'
                                    + '<div class="tc f14 bold mt30 mb10">이미 신청하셨습니다.</div>'
                                    + '</div>',
                    buttons: [{
                        text: '확인',
                        type: 'button-ilbang'
                    }]
                });
            } else {
                $state.go('kind-select', { type: $stateParams.type });
            }
        }
    }     
})
.controller('sotongApplyCtrl', function($scope, $localstorage, $ionicModal, $http, $httpParamSerializerJQLike, $ionicPopup, $stateParams, $ionicScrollDelegate, $ionicLoading,$cordovaFileTransfer) {
    $scope.alert = function(msg) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass: 'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
            template: '<div class="tc f12"><span><b>' + msg + '</b></span><br>',
            buttons: [{
                text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                type: 'button-default',
                onTap: function() {
                    if (msg == "수정 되었습니다.") {
                        $ionicHistory.goBack();
                    }
                }
            }]
        });
    };

    if($localstorage.get("auto") == "true") {
        $scope.uid = $localstorage.get("id");
    } else {
        $scope.uid = sessionStorage.getItem("id");
    }

    if($stateParams.type == "culture") {
        $scope.title = "문화";
    } else if($stateParams.type == "advert") {
        $scope.title = "광고/홍보";
    } else if($stateParams.type == "care") {
        $scope.title = "요양";
    } else if($stateParams.type == "fitness") {
        $scope.title = "휘트니스";
    }

    if($stateParams.memKind == "general") {
        $scope.kindProfile = "개인";
        $scope.kindName = "이름";
        $scope.kindCareer = "경력 사항";
        $scope.kindScholarship = "학력 사항";
        $scope.kindWorks = "활동 내역";
        $scope.general = true;
    } else {
        $scope.kindProfile = "기업";
        $scope.kindName = "기업명";
        $scope.kindCareer = "기업 정보";
        $scope.kindScholarship = "기업 연혁";
        $scope.kindWorks = "사업 내역 및 실적";
        $scope.company = true;
    }

    $scope.cultureBtn = "신청하기";
    $scope.addBtn1 = "추가하기";
    $scope.addBtn2 = "추가하기";
    $scope.addBtn3 = "추가하기";
    $scope.addBtn4 = "추가하기";
    $scope.addBtn5 = "추가하기";

    $scope.profile = {};
    $scope.company = {};

    $scope.profile.agree = false;
    $scope.portraitShow = true;

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

    getSotongData();
    getSotongData("company");

    function getSotongData(sideType) {
        var listParam = {
            id: $scope.uid,
            type: $scope.title,
            sideType: sideType,
            memKind: $stateParams.memKind
        };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getSotongData.php',
            data: $httpParamSerializerJQLike(listParam),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            if(sideType == null) {
                if(data.sotongData.cnt == 0) {
                    if($stateParams.memKind == "general") {
                        $scope.profileName = "이름";
                    } else {
                        $scope.profileName = "기업명";
                    }

                    $scope.profileMessage = "상태 메세지";
                    $scope.imgUrl1 = "img/sotong-plus.png";
                } else {
                    if(data.sotongData.name == null) {
                        $scope.profileName = $scope.uid;
                        $scope.profileMessage = "상태 메세지";
                    } else {
                        $scope.cultureBtn = "수정하기";
                        $scope.addBtn1 = "수정하기";
                        $scope.profileName = data.sotongData.name;
                        $scope.profileMessage = data.sotongData.message;
                        $scope.profile.name = data.sotongData.name;
                        $scope.profile.year = data.sotongData.year;
                        $scope.profile.month = data.sotongData.month;
                        $scope.profile.day = data.sotongData.day;
                        $scope.profile.job = data.sotongData.job;
                        $scope.profile.birthPlace = data.sotongData.birthPlace;
                        $scope.profile.message = data.sotongData.message;
                        $scope.profile.facebook = data.sotongData.facebook;
                        $scope.profile.instagram = data.sotongData.instagram;
                        $scope.profile.kakao = data.sotongData.kakao;
                    }

                    $scope.imgUrl1 = data.sotongData.imgUrl;

                    if(data.sotongData.portrait == "N") {
                        $scope.profile.agree = false;
                        $scope.portraitShow = true;
                    } else {
                        $scope.profile.agree = true;
                        $scope.portraitShow = false;
                    }
                }
            } else {
                if(sideType == "company") {
                    if(data.companyData != null) {
                        $scope.addBtn2 = "수정하기";
                        $scope.company.year = data.companyData.year;
                        $scope.company.month = data.companyData.month;
                        $scope.company.day = data.companyData.day;
                        $scope.company.status = data.companyData.status;
                        $scope.company.types = data.companyData.types;
                        $scope.company.phone1 = data.companyData.phone1;
                        $scope.company.phone2 = data.companyData.phone2;
                        $scope.company.phone3 = data.companyData.phone3;
                        $scope.company.address = data.companyData.address;
                    }
                } else if(sideType == "career") {
                    $scope.modifyCareers = [];
                    $scope.modifyCareers = data.sotongExtendList;
                } else if(sideType == "scholarship") {
                    $scope.modifyScholars = [];
                    $scope.modifyScholars = data.sotongExtendList;
                } else if(sideType == "prize") {
                    $scope.modifyPrizes = [];
                    $scope.modifyPrizes = data.sotongExtendList;
                } else {
                    $scope.modifyWorks = [];
                    $scope.modifyWorks = data.sotongExtendList;
                }
            }
        });
    }

    $scope.dataAlert = function(msg) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass: 'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
            template: '<div class="tc f12"><span><b>' + msg + '</b></span><br>',
            buttons: [{
                text:'취소',
                type:'button-default'
            },{
                text: '사진 선택하기',
                type: 'button-default',
                onTap: function() {
                    $scope.testFileUpload();
                }
            }]
        });
    };

    $scope.testFileUpload = function() {
        function setOptions(srcType) {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: srcType,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                allowEdit: false,
                correctOrientation: false
            }

            return options;
        }

        var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        var options = setOptions(srcType);

        navigator.camera.getPicture(onSuccess, onFail, options);

        function onSuccess(imageURI) {
            var url = "http://il-bang.com/ilbang_pc/ionic/http/sotong/uploadArtistImage.php";
            var targetPath = imageURI;
            // File name only
            var filename = targetPath.split("/").pop();
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "image/jpg",
                params: {
                    'directory': ' ',
                    'fileName': filename,
                    'uid': $scope.uid,
                    'memKind': $stateParams.memKind,
                    'type': $scope.title
                }
            };

            $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                if(result.response == "") {
                    if(result.bytesSent > 10485760) {
                        $scope.alert("파일 용량이 10MB를 초과하였습니다. 다른 파일을 선택해주세요.");
                    } else {
                        $scope.alert("업로드에 실패하였습니다. 다른 파일을 선택해주세요.");
                    }
                } else {
                    var image = "http://il-bang.com/pc_renewal/sotongFile/";

                    $scope.imgUrl1= image + result.response;
                }
            });
        }

        function onFail(message) {
            $scope.alert('Failed because: ' + message);
        }
    }

    $scope.getPath = function() {
        if(device.platform == 'Android' && device.sdkInt < 20) {
            $ionicPopup.confirm({
                cssClass: 'estiPop',
                template: '<div class="tc">'
                                + '<img src="img/cloud.png" width="15%">'
                                + '<div class="tc f14 bold mt30 mb10">현재 안드로이드 버전에서는 이미지 업로드를 지원하지 않습니다. 이미지 파일을 업로드 하기 위하여 인터넷 브라우저로 이동합니다.</div>'
                                + '</div>',
                buttons : [{
                    text : '취소',
                    type : 'button-default'
                }, {
                    text : '웹으로 이동',
                    type : 'button-default',
                    onTap: function() {
                        window.open('http://il-bang.com/pc_renewal/up.php?id=' + $scope.uid + '&memKind=' + $stateParams.memKind + '&type=' + $scope.title, '_system');
                    }
                }]
            });
        }
    }

    $scope.profileAdd = function() {
        var check = false;

        if($scope.profile.agree == true) {
            if($stateParams.memKind == "general") {
                if($scope.profile.name == null || $scope.profile.name == "") {
                    $scope.sotongAlert("이름을 입력해주세요.", 0);
                } else if($scope.profile.year == null || $scope.profile.month == null || $scope.profile.day == null) {
                    $scope.sotongAlert("생년월일을 선택해주세요.", 0);
                } else if($scope.profile.job == null || $scope.profile.job == "") {
                    $scope.sotongAlert("직업을 입력해주세요.", 0);
                } else if($scope.profile.birthPlace == null || $scope.profile.birthPlace == "") {
                    $scope.sotongAlert("출생지를 입력해주세요.", 0);
                } else {
                    var check = true;
                }
            } else {
                if($scope.profile.name == null || $scope.profile.name == "") {
                    $scope.sotongAlert("기업명을 입력해주세요.", 0);
                } else {
                    var check = true;
                }
            }
        } else {
            $scope.sotongAlert("초상권 사용 동의에 체크해주시기 바랍니다.", 0);
        }

        if(check) {
            var listParam = {
                id: $scope.uid,
                type: $scope.title,
                kind: $stateParams.memKind,
                name: $scope.profile.name,
                birthday: $scope.profile.year + "-" + $scope.profile.month + "-" + $scope.profile.day,
                birthPlace: $scope.profile.birthPlace,
                state_message: $scope.profile.message,
                job: $scope.profile.job,
                homepage: $scope.profile.companyHomepage,
                facebook: $scope.profile.facebook,
                instagram: $scope.profile.instagram,
                kakao: $scope.profile.kakao,
                imgUrl: $scope.imgUrl1,
                portrait: $scope.profile.agree
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
                    if($stateParams.memKind == "general") {
                        $scope.sotongAlert(data + "<br />상태 메세지를 입력하지 않으시면 상태 메세지 대신 직업이 노출됩니다.", 1);
                        $scope.profileMessage = $scope.profile.job;
                    } else {
                        $scope.sotongAlert(data + "<br />상태 메세지를 입력하지 않으시면 상태 메세지가 노출되지 않습니다.", 1);
                        $scope.profileMessage = "";
                    }
                } else {
                    $scope.sotongAlert(data, 1);
                    $scope.profileMessage = $scope.profile.message;
                }
            });
        }
    }

    $scope.companyAdd = function() {
        if($scope.company.year == null || $scope.company.month == null || $scope.company.day == null) {
            $scope.sotongAlert("기업 설립연도를 선택해주세요.", 0);
        } else if($scope.company.types == null || $scope.company.types == "") {
            $scope.sotongAlert("기업 업종을 입력해주세요.", 0);
        } else if($scope.company.status == null || $scope.company.status == "") {
            $scope.sotongAlert("기업 형태를 입력해주세요.", 0);
        } else if($scope.company.phone1 == null || $scope.company.phone1 == "") {
            $scope.sotongAlert("대표 전화를 입력해주세요.", 0);
        } else if($scope.company.phone2 == null || $scope.company.phone2 == "") {
            $scope.sotongAlert("대표 전화를 입력해주세요.", 0);
        } else if($scope.company.phone3 == null || $scope.company.phone3 == "") {
            $scope.sotongAlert("대표 전화를 입력해주세요.", 0);
        } else if($scope.company.address == null || $scope.company.address == "") {
            $scope.sotongAlert("기업 주소를 입력해주세요.", 0);
        } else {
            var listParam = {
                id: $scope.uid,
                type: $scope.title,
                kind: $stateParams.memKind,
                flotation: $scope.company.year + "-" + $scope.company.month + "-" + $scope.company.day,
                status: $scope.company.status,
                types: $scope.company.types,
                phone: $scope.company.phone1 + "-" + $scope.company.phone2 + "-" + $scope.company.phone3,
                address: $scope.company.address
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/companyApply.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                $scope.addBtn2 = "수정하기";
                $scope.sotongAlert(data, 2);
            });
        }
    }

    $scope.extendAdd = function(kind) {
        var check = 0;

        if(kind == 'career') {
            for(var i=0; i<($scope.careers).length; i++) {
                if($scope.careers[i].startYear != null || $scope.careers[i].content != null) {
                    if($scope.careers[i].startYear == null || $scope.careers[i].startYear == "") {
                        $scope.sotongAlert("시작 년도를 선택해주세요.", 0);
                        return;
                    } else if($scope.careers[i].content == null || $scope.careers[i].content == "") {
                        $scope.sotongAlert("경력 사항을 입력해주세요.", 0);
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

            $scope.kindList = $scope.careers;
            $scope.modifyKindList = $scope.modifyCareers;
        } else if(kind == 'scholarship') {
            for(var i=0; i<($scope.scholars).length; i++) {
                if($scope.scholars[i].startYear != null || $scope.scholars[i].content != null) {
                    if($scope.scholars[i].startYear == null || $scope.scholars[i].startYear == "") {
                        $scope.sotongAlert("시작 년도를 선택해주세요.", 0);
                        return;
                    } else if($scope.scholars[i].content == null || $scope.scholars[i].content == "") {
                        $scope.sotongAlert($scope.kindScholarship + "을 입력해주세요.", 0);
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
                        $scope.sotongAlert("시작 년도를 선택해주세요.", 0);
                        return;
                    } else if($scope.modifyScholars[i].content == null || $scope.modifyScholars[i].content == "") {
                        $scope.sotongAlert($scope.kindScholarship + "을 입력해주세요.", 0);
                        return;
                    } else {
                        check++;
                    }
                }
            }

            $scope.kindList = $scope.scholars;
            $scope.modifyKindList = $scope.modifyScholars;
        } else if(kind == "prize") {
            for(var i=0; i<($scope.prizes).length; i++) {
                if($scope.prizes[i].startYear != null || $scope.prizes[i].content != null) {
                    if($scope.prizes[i].startYear == null || $scope.prizes[i].startYear == "") {
                        $scope.sotongAlert("시작 년도를 선택해주세요.", 0);
                        return;
                    } else if($scope.prizes[i].content == null || $scope.prizes[i].content == "") {
                        $scope.sotongAlert("수상 내역을 입력해주세요.", 0);
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
                        $scope.sotongAlert("시작 년도를 선택해주세요.", 0);
                        return;
                    } else if($scope.modifyPrizes[i].content == null || $scope.modifyPrizes[i].content == "") {
                        $scope.sotongAlert("수상 내역을 입력해주세요.", 0);
                        return;
                    } else {
                        check++;
                    }
                }
            }

            $scope.kindList = $scope.prizes;
            $scope.modifyKindList = $scope.modifyPrizes;
        } else {
            for(var i=0; i<($scope.works).length; i++) {
                if($scope.works[i].startYear != null || $scope.works[i].activityType != null || $scope.works[i].content != null) {
                    if($scope.works[i].startYear == null || $scope.works[i].startYear == "") {
                        $scope.sotongAlert("시작 년도를 선택해주세요.", 0);
                        return;
                    } else if($scope.works[i].activityType == null && $stateParams.memKind == "general") {
                        $scope.sotongAlert("활동 분야를 입력해주세요.", 0);
                        return;
                    } else if($scope.works[i].activityType == "" && $stateParams.memKind == "general") {
                        $scope.sotongAlert("활동 분야를 입력해주세요.", 0);
                        return;
                    } else if($scope.works[i].content == null || $scope.works[i].content == "") {
                        $scope.sotongAlert($scope.kindWorks + "을 입력해주세요.", 0);
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
                        $scope.sotongAlert("시작 년도를 선택해주세요.", 0);
                        return;
                    } else if($scope.modifyWorks[i].activityType == null && $stateParams.memKind == "general") {
                        $scope.sotongAlert("활동 분야를 입력해주세요.", 0);
                        return;
                    } else if($scope.modifyWorks[i].activityType == "" && $stateParams.memKind == "general") {
                        $scope.sotongAlert("활동 분야를 입력해주세요.", 0);
                        return;
                    } else if($scope.modifyWorks[i].content == null || $scope.modifyWorks[i].content == "") {
                        $scope.sotongAlert($scope.kindWorks + "을 입력해주세요.", 0);
                        return;
                    } else {
                        check++;
                    }
                }
            }

            $scope.kindList = $scope.works;
            $scope.modifyKindList = $scope.modifyWorks;
        }

        if(check == check2) {
            var listParam = {
                id: $scope.uid,
                type: $scope.title,
                extendType: kind,
                kind: $stateParams.memKind,
                array: $scope.kindList,
                modifyArray: $scope.modifyKindList
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/extendApply.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                if(kind == "career") {
                    $scope.addBtn2 = "수정하기";
                    $scope.sotongAlert(data, 2);
                } else if(kind == "scholarship") {
                    $scope.addBtn3 = "수정하기";
                    $scope.sotongAlert(data, 3);
                } else if(kind == "prize") {
                    $scope.addBtn4 = "수정하기";
                    $scope.sotongAlert(data, 4);
                } else {
                    $scope.addBtn5 = "수정하기";
                    $scope.sotongAlert(data, 5);
                }

                initCareer();
                initScholars();
                initPrize();
                initWorks();
            });
        }
    }

    function initCareer() {
        $scope.careers = [{
            startYear : null,
            startMonth : null,
            endYear : null,
            endMonth : null,
            content : null
        }];
    }

    function initScholars() {
        $scope.scholars = [{
            startYear : null,
            endYear : null,
            content : null
        }];
    }

    function initPrize() {
        $scope.prizes = [{
            startYear : null,
            startMonth : null,
            endYear : null,
            endMonth : null,
            content : null
        }];
    }

    function initWorks() {
        if($stateParams.memKind == "general") {
            $scope.works = [{
                startYear : null,
                activityType : null,
                content : null
            }];
        } else {
            $scope.works = [{
                startYear : null,
                content : null
            }];
        }
    }

    initCareer();
    initScholars();
    initPrize();
    initWorks();

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

    $scope.addScholar = function() {
        var newlist = {
            startYear : null,
            endYear : null,
            content : null
        }

		$scope.scholars.push(newlist);
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
    }

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

    $scope.addWork = function() {
        var newlist = {
            startYear : null,
            activityType : null,
            content : null
        }

        $scope.works.push(newlist);
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
    }

    $scope.openModal = function(index) {
        if(index == 1) {
            getSotongData();
            $scope.modal1.show();
        } else if(index == 2) {
            if($stateParams.memKind == "general") {
                getSotongData("career");
            }

            $scope.modal2.show();
        } else if(index == 3) {
            getSotongData("scholarship");
            $scope.modal3.show();
        } else if(index == 4) {
            getSotongData("prize");
            $scope.modal4.show();
        } else {
            getSotongData("works");
            $scope.modal5.show();
        }
    };

    $ionicModal.fromTemplateUrl('templates/sotong/form/modal1.html', {
        id: "1",
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal1 = modal;
    });

    if($stateParams.memKind == "general") {
        $ionicModal.fromTemplateUrl('templates/sotong/form/modal2.html', {
            id: "2",
            scope: $scope,
            cache: false,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal2 = modal;
        });
    } else {
        $ionicModal.fromTemplateUrl('templates/sotong/form/modal-c2.html', {
            id: "2",
            scope: $scope,
            cache: false,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal2 = modal;
        });
    }

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

    $scope.sotongAlert = function(msg, number) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass: 'estiPop',
            template: '<div class="tc">'
                            + '<img src="img/cloud.png" width="15%">'
                            + '<div class="tc f14 bold mt30 mb10">' + msg + '</div>'
                            + '</div>',
            buttons : [{
                text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                type: 'button-default',
                onTap: function() {
                    if(number!=0) {
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
})

.controller('sotongSelectCtrl', function($scope, $state, $localstorage, $http, $httpParamSerializerJQLike, $stateParams, $ionicPopup) {
    if($localstorage.get("auto") == "true") {
        $scope.uid = $localstorage.get("id");
    } else {
        $scope.uid = sessionStorage.getItem("id");
    }

    if($stateParams.type == "culture") {
        $scope.title = "문화";
    } else if($stateParams.type == "advert") {
        $scope.title = "광고/홍보";
    } else if($stateParams.type == "care") {
        $scope.title = "요양";
    }

    $scope.nextBtn = function() {
        if(!$scope.general && !$scope.company) {
            $scope.sotongAlert("회원 종류를 선택해주세요.");
        } else {
            if($scope.general) {
                $state.go('apply-', { type: $stateParams.type, memKind: 'general' });
            } else {
                $state.go('apply-', { type: $stateParams.type, memKind: 'company' });
            }
        }
    }

    $scope.sotongAlert = function(msg, number) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass: 'estiPop',
            template: '<div class="tc">'
                            + '<img src="img/cloud.png" width="15%">'
                            + '<div class="tc f14 bold mt30 mb10">' + msg + '</div>'
                            + '</div>',
            buttons : [{
                text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                type: 'button-default'
            }]
        });
    };
})
