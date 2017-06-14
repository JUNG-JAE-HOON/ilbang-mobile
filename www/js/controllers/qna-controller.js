angular.module('qna-controller', [])
.controller('qnaCtrl', function($scope, $localstorage, $http, $httpParamSerializerJQLike, $state, $stateParams, $ionicPopup) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    $scope.loginCheck = function() {
        if(id == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass: 'withdrawalPop',
                title: '<h4 class="fo">Q&A 묻고 답하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">로그인 후 이용해주세요.</div>',
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                },{
                  text: '로그인 하기',
                  type: 'button-ilbang',
                  onTap: function(){
                    $state.go("login");
                  }
                }]
            });
        } else {
            $state.go('QNAWrite');
        }
    }

    $scope.page = 1;

    var listParam = { page: $scope.page, id: id }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/getQnaList.php',
        data: $httpParamSerializerJQLike(listParam),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        $scope.items = [];
        $scope.items = data.qnaList;
        $scope.listShow = true;

        for(var i=0; i<$scope.items.length; i++) {
            var lastName = ($scope.items[i].name).substring(0, 1);

            $scope.items[i].name = lastName + "**";
        }

        if (data.paging.page >= data.paging.allPage) {
           $scope.listShow = false;
        }

        if(data.admin == "yes") {
            $scope.admin = true;
        } else {
            $scope.admin = false;
        }
    })

    $scope.loadMore = function() {
        $scope.page = $scope.page + 1;

        var myData = { page: $scope.page, id: id }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/getQnaList.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.items = $scope.items.concat(data.qnaList);
            $scope.listShow = true;

            if (data.paging.page >= data.paging.allPage) {
               $scope.listShow = false;
            }
        })
    };
})

.controller('qnaWriteCtrl', function($scope, $localstorage, $http, $httpParamSerializerJQLike, $state, $stateParams, $ionicPopup) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    var listParam = { no: $stateParams.no, id: id, val: 1 }

    if($stateParams.no != "") {
        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/getQna.php',
            data: $httpParamSerializerJQLike(listParam),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.title = data.qnaList.title;
            $scope.content = data.qnaList.content;
            $scope.adjustmentView = true;
        })
    } else {
        $scope.adjustmentView = false;
    }

    $scope.qnaWrite = function(val) {
        var no = $stateParams.no;
        var title = $scope.title;
        var content = $scope.content;

        if(title == null || title == "") {
            var confirmPopup = $ionicPopup.show({
                cssClass: 'withdrawalPop',
                title: '<h4 class="fo">Q&A 묻고 답하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">제목을 입력해주세요.</div>',
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if(content == null || content == "") {
            var confirmPopup = $ionicPopup.show({
                cssClass: 'withdrawalPop',
                title: '<h4 class="fo">Q&A 묻고 답하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">내용을 입력해주세요.</div>',
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else {
            var listParam = {
                val: val,
                no: no,
                id: id,
                title: title,
                content: content
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/qnaWrite.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                var confirmPopup = $ionicPopup.confirm({
                    cssClass: 'withdrawalPop',
                    title: '<h4 class="fo">Q&A 묻고 답하기</h4>',
                    template: '<div class="tc" style="padding: 30px 0;">' + data + '</div>',
                    buttons: [{
                        text: '<b class="fw">확인</b>',
                        type: 'button-ilbang',
                        onTap: function(e) {
                            $state.go('csCenter');
                        }
                    }]
                });
            })
        }
    }
})

.controller('qnaViewCtrl', function($scope, $localstorage, $http, $httpParamSerializerJQLike, $stateParams, $state, $ionicPopup) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    // if(id == null) {
    //     var confirmPopup = $ionicPopup.confirm({
    //         cssClass: 'withdrawalPop',
    //         title: '<h4 class="fo">Q&A 묻고 답하기</h4>',
    //         template: '<div class="tc" style="padding: 30px 0;">로그인 해주시기 바랍니다.</div>',
    //         buttons: [{
    //             text: '<b class="fw">확인</b>',
    //             type: 'button-ilbang',
    //             onTap: function(e) {
    //                 $state.go('login');
    //             }
    //         }]
    //     });
    // } else {
        if(id == "ilbangManager") {
            $scope.admin = true;
        } else {
            $scope.admin = false;
        }

        var viewNum = { no: $stateParams.no, id: id }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/getQna.php',
            data: $httpParamSerializerJQLike(viewNum),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.items = [];
            $scope.items = data.qnaList;

            var qna = data.qnaList;

            if(id == qna.uid) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }

            $scope.no = qna.no;
            $scope.title = qna.title;
            $scope.comment = qna.comment;
            $scope.content = qna.content;
            $scope.name = (qna.name).substring(0, 1) + "**";
            $scope.date = qna.wdate;
            $scope.hit = qna.hit;

            $scope.adjustment = function() {
                $state.go('QNAWrite');
            }

            if($scope.comment == 0) {
                $scope.adminConShow = true;
            } else {
                $scope.adminContent = qna.admin_content;
                $scope.adminContent2 = qna.admin_content;
                $scope.adminWdate = qna.admin_wdate;
                $scope.adminConShow = false;
            }
        })

        $scope.adminInput = function(val) {
            var no = $stateParams.no;
            var content = $scope.adminContent2;

            var listParam = { no: no, content: content, val: val }

            if(id == "ilbangManager") {
                $http({
                    method: 'POST',
                    url: 'http://il-bang.com/ilbang_pc/ionic/http/qnaAdminWrite.php',
                    data: $httpParamSerializerJQLike(listParam),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (data, status, headers, config) {
                    var confirmPopup = $ionicPopup.confirm({
                        cssClass: 'withdrawalPop',
                        title: '<h4 class="fo">Q&A 묻고 답하기</h4>',
                        template: '<div class="tc" style="padding: 30px 0;">' + data + '</div>',
                        buttons: [{
                            text: '<b class="fw">확인</b>',
                            type: 'button-ilbang',
                            onTap: function(e) {
                                window.location.reload();
                            }
                        }]
                    });
                })
            } else {
                var confirmPopup = $ionicPopup.show({
                    cssClass: 'withdrawalPop',
                    title: '<h4 class="fo">Q&A 묻고 답하기</h4>',
                    template: '<div class="tc" style="padding: 30px 0;">관리자만 쓸 수 있습니다.</div>',
                    buttons: [{
                        text: '<b class="fw">확인</b>',
                        type: 'button-ilbang'
                    }]
                });
            }
        }

        $scope.qnaDelete = function() {
            var no = $stateParams.no;

            var confirmPopup = $ionicPopup.confirm({
                cssClass:'withdrawalPop',
                title: '<h4>Q&A 묻고 답하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">정말로 삭제하시겠습니까?</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">삭제하기</b>',
                    type: 'button-ilbang',
                    onTap: function(e) {
                        var listParam = { no: no, id: id }

                        $http({
                            method: 'POST',
                            url: 'http://il-bang.com/ilbang_pc/ionic/http/qnaDelete.php',
                            data: $httpParamSerializerJQLike(listParam),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).success(function (data, status, headers, config) {
                            var confirmPopup = $ionicPopup.show({
                                cssClass: 'withdrawalPop',
                                title: '<h4 class="fo">Q&A 묻고 답하기</h4>',
                                template: '<div class="tc" style="padding: 30px 0;">' + data + '</div>',
                                buttons: [{
                                    text: '<b class="fw">확인</b>',
                                    type: 'button-ilbang',
                                    onTap: function(e) {
                                        $state.go('csCenter');
                                    }
                                }]
                            });
                        })
                    }
                }, {
                    text: '<b class="fw">취소</b>',
                    type: 'button-ilbang'
                }]
            });
        }
    // }
})
