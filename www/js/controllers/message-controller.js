angular.module('message-controller', [])
.controller('messageCtrl', function($scope, $localstorage, $ionicModal, $http, $httpParamSerializerJQLike, $ionicBackdrop, $ionicPopup) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    $scope.page = 1;

    function getMessageList(page, start) {
        var data = { page: page, id: id, check: start };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/getMessageList.php',
            data: $httpParamSerializerJQLike(data),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.messageList = [];
            $scope.messageList = data.messageList;

            if(start == 'yes' && data.paging.allPage > 1) {
                $scope.moreView = true;
            }

            if(start == 'no' && data.paging.page == data.paging.allPage) {
                $scope.moreView = false;
            }
        });
    }

    getMessageList($scope.page, 'yes');

    $scope.moreMessage = function() {
        $scope.page += 1;

        var data = { page: $scope.page, id: id, check: 'yes' };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/getMessageList.php',
            data: $httpParamSerializerJQLike(data),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            if(data.paging.page <= data.paging.allPage) {
                $scope.messageList = $scope.messageList.concat(data.messageList);
            }

            if(data.paging.page == data.paging.allPage) {
                $scope.moreView = false;
            }
        });
    }

    $scope.deleteMessage = function(no) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass: 'estiPop',
            title: '<h4 class="fo">알림</h4>',
            template: '<div class="popStyle f14">정말 삭제하시겠습니까?</div>',
            buttons: [{
                text: '확인',
                type: 'button-default',
                onTap: function(e) {
                    var data = { no: no };

                    $http({
                        method: 'POST',
                        url: 'http://il-bang.com/ilbang_pc/ionic/http/deleteMessage.php',
                        data: $httpParamSerializerJQLike(data),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function (data, status, headers, config) {
                        $scope.messageaAlert(data);
                    });
                }
            }, {
                text: '취소',
                type: 'button-default'
            }]
        });
    }

    $ionicModal.fromTemplateUrl('templates/message-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function(no) {
        $scope.no = no;

        var data = { no: no };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/getMessageData.php',
            data: $httpParamSerializerJQLike(data),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.message = data;
        });

        $scope.modal.show();

        getMessageList($scope.page, 'no');
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    function backdropOn() {
        $ionicBackdrop.retain();
    };

    function backdropOff() {
        $ionicBackdrop.release();
    };

    $scope.$on('modal.shown', function() {
        backdropOn()
    });

    $scope.$on('modal.hidden', function() {
        backdropOff()
    });

    $scope.messageaAlert = function(msg) {
        var confirmPopup = $ionicPopup.confirm({
            cssClass : 'estiPop',
            title : '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
            template : '<div class="tc f12"><span><b>' + msg + '</b></span><br>',
            buttons : [{
                text : '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                type : 'button-default',
                onTap: function() {
                    getMessageList($scope.page, 'no');
                    $scope.closeModal();
                }
            }]
        });
    };
})
