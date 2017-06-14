angular.module('startup-controller', [])
.controller('startupCtrl', function($state, $localstorage, $scope, $http, $httpParamSerializerJQLike, $ionicPopup) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    $scope.loginCheck = function() {
        if(id == "" || id == null || id == undefined) {
            var confirmPopup = $ionicPopup.confirm({
                cssClass: 'estiPop',
                title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
                template: '<div class="tc f12 bold">로그인을 해주세요.</div>',
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
             $state.go("su-apply");
        }
    }

    $scope.startup = {};

    $scope.emails = [
        { value: "", name: "직접 입력" },
        { value: "naver.com", name: "naver.com" },
        { value: "nate.com", name: "nate.com" },
        { value: "hanmail.net", name: "hanmail.net" },
        { value: "gmail.com", name: "gmail.com" }
    ];

    $scope.startup.email3 = $scope.emails[0];

    $scope.emailChange = function() {
        if($scope.startup.email3["value"] == "") {
            $scope.startup.email2 = "";
        } else {
            $scope.startup.email2 = $scope.startup.email3["value"];
        }
    }

    $scope.startupApply = function() {
        if($scope.startup.name == null || $scope.startup.name == "") {
            messageAlert("이름을 입력해주세요.");
        } else if($scope.startup.phone1 == null || $scope.startup.phone1 == "") {
            messageAlert("연락처를 입력해주세요.");
        } else if($scope.startup.phone2 == null || $scope.startup.phone2 == "") {
            messageAlert("연락처를 입력해주세요.");
        } else if($scope.startup.phone3 == null || $scope.startup.phone4 == "") {
            messageAlert("연락처를 입력해주세요.");
        } else if($scope.startup.phone1.length > 3 || $scope.startup.phone2.length > 4 || $scope.startup.phone3.length > 4) {
            messageAlert("연락처를 똑바로 입력해주세요.");
        } else if($scope.startup.email1 == null || $scope.startup.email1 == "") {
            messageAlert("이메일 주소를 입력해주세요.");
        } else if($scope.startup.email2 == "") {
            messageAlert("이메일 주소를 입력해주세요.");
        } else if($scope.startup.agree != true) {
            messageAlert("개인 정보 수집에 동의해주시기 바랍니다.");
        } else {
            var data = {
              id: id,
              name: $scope.startup.name,
              phone: $scope.startup.phone1 + "-" + $scope.startup.phone2 + "-" + $scope.startup.phone3,
              email: $scope.startup.email1 + "@" + $scope.startup.email2
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/startupApply.php',
                data: $httpParamSerializerJQLike(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                messageAlert2(data);
            });
        }
    }

    function messageAlert(msg) {
        var confirmPopup = $ionicPopup.show({
            cssClass: 'estiPop',
            template: '<div class="tc" style="padding: 30px 0;">' + msg + '</div>',
            buttons: [{
                text: '<b class="fw">확인</b>',
                type: 'button-ilbang'
            }]
        });
    }

    function messageAlert2(msg) {
        var confirmPopup = $ionicPopup.show({
            cssClass: 'estiPop',
            template: '<div class="tc" style="padding: 30px 0;">' + msg + '</div>',
            buttons: [{
                text: '<b class="fw">확인</b>',
                type: 'button-ilbang',
                onTap: function(e) {
                    $state.go('startup');
                }
            }]
        });
    }
});
