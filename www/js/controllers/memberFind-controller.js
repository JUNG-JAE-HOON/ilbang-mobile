angular.module('memberFind-controller',[])
.controller('FindCtrl', function($scope, $http, $httpParamSerializerJQLike, $stateParams, $state, $ionicPopup) {
    $scope.memberFind = function(val) {
        if(val == 0) {
            var title = "아이디 찾기";
        } else {
            var title = "비밀번호 찾기";
        }

        var noti = function(message){
          var confirmPopup = $ionicPopup.confirm({
              cssClass: 'urgentPop',
              title: '<h4 class="urgent123" style="background-color:#eb5f43; color:white">알림</h4>',
              template:'<ul class="popupUl"><li><p>'+message+'</p></li></ul>',
              buttons: [{
                  text: '확인',
                  type: 'button-default'
              }]
          });
        }
        var id = $scope.id;
        var name = $scope.name;
        var phone = $scope.phone1 + "-" + $scope.phone2 + "-" + $scope.phone3;

        if(id == null && val == 1 || id == "" && val == 1) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>' + title + '</h4>',
                template: '<div class="tc" style="padding: 30px 0;">아이디를 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if(name == null || name == "") {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>' + title + '</h4>',
                template: '<div class="tc" style="padding: 30px 0;">이름을 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if($scope.phone1 == "" || $scope.phone1 == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>' + title + '</h4>',
                template: '<div class="tc" style="padding: 30px 0;">전화번호를 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if($scope.phone2 == "" || $scope.phone2 == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>' + title + '</h4>',
                template: '<div class="tc" style="padding: 30px 0;">전화번호를 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if($scope.phone3 == "" || $scope.phone3 == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>' + title + '</h4>',
                template: '<div class="tc" style="padding: 30px 0;">전화번호를 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else {
            var listParam = { id: id, name: name, phone: phone, val: val }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/member/memberFind.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                if(data.num == 0) {
                    var confirmPopup = $ionicPopup.show({
                        cssClass:'withdrawalPop',
                        title: '<h4>' + title + '</h4>',
                        template: '<div class="tc" style="padding: 30px 0;">' + data.message + '</div>',
                        scope: $scope,
                        buttons: [{
                            text: '<b class="fw">확인</b>',
                            type: 'button-ilbang'
                        }]
                    });
                } else if(data.num != 0 && val == 0) {
                    var confirmPopup = $ionicPopup.confirm({
                        cssClass:'withdrawalPop',
                        title: '<h4>아이디 찾기</h4>',
                        template: '<div class="tc" style="padding: 30px 0;">' + data.message + '</div>',
                        scope: $scope,
                        buttons: [{
                            text: '<b class="fw">로그인 하기</b>',
                            type: 'button-ilbang',
                            onTap: function(e) {
                                $state.go('login');
                            }
                        }, {
                            text: '<b class="fw">비밀번호 찾기</b>',
                            type: 'button-ilbang',
                            onTap: function(e) {
                                $state.go('findPwd');
                            }
                        }]
                    })
                } else if(data.num != 0 && val == 1) {
                    $scope.memberData = {};

                    var confirmPopup = $ionicPopup.confirm({
                        cssClass:'withdrawalPop',
                        title: '<h4>비밀번호 변경하기</h4>',
                        template: '<div class="list list-inset wid90" style="margin: 30px auto;">'
                        + '<label class="item item-input">'
                        + '<input type="password" ng-model="memberData.pwd1" placeholder="바꿀 비밀번호 입력" />'
                        + '</label>'
                        + '<label class="item item-input">'
                        + '<input type="password" ng-model="memberData.pwd2" placeholder="바꿀 비밀번호 재입력" />'
                        + '</label>'
                        + '</div>',
                        scope: $scope,
                        buttons: [{
                            text: '<b class="fw">변경하기</b>',
                            type: 'button-ilbang',
                            onTap: function(e) {
                                var pwd1 = $scope.memberData.pwd1;
                                var pwd2 = $scope.memberData.pwd2;

                                if(pwd1 == null || pwd1 == "" || pwd2 == null || pwd2 == "") {
                                    noti("비밀번호를 입력해주세요.");
                                } else if(pwd1 != pwd2) {
                                    noti("비밀번호가 맞지 않습니다.");
                                } else {
                                    var listParam = { id: id, pwd1: pwd1, val: 2 }
                                    $http({
                                        method: 'POST',
                                        url: 'http://il-bang.com/ilbang_pc/ionic/http/member/memberFind.php',
                                        data: $httpParamSerializerJQLike(listParam),
                                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                    }).success(function (data, status, headers, config) {
                                        if(data.num == 0) {
                                            var title = "로그인 하기";
                                        } else {
                                            var title = "확인";
                                        }

                                        var confirmPopup = $ionicPopup.confirm({
                                            cssClass:'withdrawalPop',
                                            title: '<h4>비밀번호 변경하기</h4>',
                                            template: '<div class="tc" style="padding: 30px 0;">' + data.message + '</div>',
                                            scope: $scope,
                                            buttons: [{
                                                text: '<b class="fw">' + title + '</b>',
                                                type: 'button-ilbang',
                                                onTap: function(e) {
                                                    if(data.num == 0) {
                                                        $state.go('login');
                                                    }
                                                }
                                            }]
                                        })
                                    })
                                }
                            }
                        }]
                    })
                }
            })
        }
    };
})
