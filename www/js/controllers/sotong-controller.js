angular.module('sotong-controller',[])
.controller('sotongCtrl',function($scope, $state, $localstorage, $cordovaInAppBrowser, $http, $httpParamSerializerJQLike, $stateParams, $ionicPopup, $ionicModal, $ionicPopover, $sce) {
    if($localstorage.get("auto") == "true") {
        $scope.uid = $localstorage.get("id");
        $scope.kind = $localstorage.get("kind");
    } else {
        $scope.uid = sessionStorage.getItem("id");
        $scope.kind = sessionStorage.getItem("kind");
    }

    $scope.type = $stateParams.type;
    $scope.no = $stateParams.no;

    if($stateParams.type == "culture") {
        $scope.title = "문화";
    } else if($stateParams.type == "advert") {
        $scope.title = "광고/홍보";
    } else if($stateParams.type == "care") {
        $scope.title = "요양";
    } else if($stateParams.type == "fitness") {
        $scope.title = "휘트니스";
    }

    function getProfile() {
        var listParam = { no: $scope.no };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getSotongDetailData.php',
            data: $httpParamSerializerJQLike(listParam),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.sotong = data.sotongData;

            $scope.sotongImg = $scope.sotong.imgUrl;
            $scope.sotongName = $scope.sotong.name;
            $scope.sotongKind = $scope.sotong.kind;
            $scope.sotongJob = $scope.sotong.job;
            $scope.sotongAge = $scope.sotong.age;
            $scope.sotongBirth = $scope.sotong.birthday;
            $scope.sotongBirthPlace = $scope.sotong.birthPlace;
            $scope.sotongFacebook = $scope.sotong.facebook;
            $scope.sotongInstagram = $scope.sotong.instagram;

            if($scope.sotongKind == "company") {
                $scope.sotongTypes = $scope.sotong.types;
                $scope.sotongFlotation = $scope.sotong.flotation;
                $scope.sotongStatus = $scope.sotong.status;
                $scope.sotongPhone = $scope.sotong.phone;
                $scope.sotongAddr = $scope.sotong.address;
                $scope.sotongHomepage = $scope.sotong.homepage;
                $scope.tab1 = "회사 정보";
                $scope.tab2 = "연혁";
                $scope.bottomTab = "사업 내역 및 실적";
            } else {
                $scope.tab1 = "경력 사항";
                $scope.tab2 = "학력 사항";
                $scope.bottomTab = "작품 활동";
            }

            $scope.careers = [];
            $scope.careers = data.careerList;

            $scope.scholars = [];
            $scope.scholars = data.scholarshipList;

            $scope.prizes = [];
            $scope.prizes = data.prizeList;

            $scope.works = [];
            $scope.works = data.worksList;

            if($scope.sotong.uid == $scope.uid) {
                $scope.modifyBtn = true;
            } else {
                $scope.modifyBtn = false;
            }
        });
    }

    function getSotongBoardList() {
        var listParam = { no: $scope.no };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getSotongBoardList.php',
            data: $httpParamSerializerJQLike(listParam),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.imageList = [];
            $scope.imageList = data.imageList;

            if(data.imageList == null) {
                $scope.imageNot = true;
            } else {
                $scope.imageNot = false;
            }

            $scope.boardList = [];
            $scope.boardList = data.boardList;

            if(data.boardList == null) {
                $scope.boardNot = true;
            } else {
                $scope.boardNot = false;
            }
        });
    }

    getProfile();
    getSotongBoardList();

    $scope.golink = function(domain) {
        var options = {
            clearcache: 'yes',
            closebuttoncaption: '종료'
        }

        if(domain == "" || domain == "null" || domain ==null || domain == undefined) {
            $ionicPopup.confirm({
                cssClass : 'estiPop',
                title : '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
                template : '<div class="tc f12 bold">등록된 주소가 없습니다.</div>',
                buttons : [{
                    text : '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                    type : 'button-default'
                }]
            });
        } else {
            $cordovaInAppBrowser.open(domain, '_blank', options)
            .then(function(event) {
            })
            .catch(function(event) {
            });
        }
    }

    $ionicModal.fromTemplateUrl('templates/sotong/view/sotongNewRead.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalRead = modal;
    });

    $scope.openModalRead = function(no) {
        $scope.board = {};

        var data = {
            no: no,
            id: $scope.uid
        };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getBoardData.php',
            data: $httpParamSerializerJQLike(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            if(data.boardData.view == 'N') {
                $scope.alert("삭제된 글입니다.");
            } else {
                $scope.modalRead.show();

                $scope.boardNo = no;
                $scope.title = data.boardData.title;
                $scope.content = data.boardData.content;
                $scope.wdate = data.boardData.wdate;
                $scope.reviewCnt = data.boardData.reviewCnt;
                $scope.imageCnt = data.boardData.imageCnt;
                $scope.manageCheck = data.boardData.manageCheck;

                $scope.board.imageList = [];
                $scope.board.imageList = data.imageList;
                $scope.board.videoUrl = $sce.trustAsResourceUrl(data.boardData.video);

                if(data.boardData.video == null || data.boardData.video == "") {
                    $scope.videoView = false;
                } else {
                    $scope.videoView = true;
                }
            }
        });
    }

    var template = '<ion-popover-view class="sotongDetail-pop"><ion-content><ul><li class="delete">삭제</li><li class="modi">수정</li></ul></ion-content></ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });

    $(document).on('click',".dotdotdot",function() {
        var top = $(this).offset().top;
        var left = $(this).offset().left;

        $(".sotongDetail-pop").css({ 'top': top, 'left': left - 50 + 'px', 'margin': 0 });
    });

    $scope.openPopover = function() {
        $scope.popover.show();
    }

    $(".popover-backdrop").click(function() {
        $scope.popover.hide();
    });

    $scope.closePopover = function() {
        $scope.popover.hide();
    }

    $(document).on("click",".delete", function() {
        $ionicPopup.confirm({
            cssClass: 'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%" /></h4>',
            template: '<div class="tc f12 bold">정말 삭제하시겠습니까?</div>',
            buttons: [{
                text: '취소',
                type: 'button-default'
            }, {
                text: '삭제',
                type: 'button-default',
                onTap: function() {
                    var data = { no: $scope.boardNo };

                    $http({
                        method: 'POST',
                        url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/boardDelete.php',
                        data: $httpParamSerializerJQLike(data),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (data, status, headers, config) {
                        $ionicPopup.confirm({
                            cssClass: 'estiPop',
                            title: '<h4 class="fo"><img src="img/cloud.png" width="15%" /></h4>',
                            template: '<div class="tc f12 bold">' + data + '</div>',
                            buttons: [{
                                text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                                type: 'button-default',
                                onTap: function() {
                                    $scope.closePopover();
                                    $scope.closeModalRead();
                                    getSotongBoardList();
                                }
                            }]
                        });
                    });
                }
            }]
        });
    });

    $scope.closeModalRead = function() {
        $scope.modalRead.hide();
    }

    $scope.alert = function(msg) {
        $ionicPopup.confirm({
            cssClass: 'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%" /></h4>',
            template: '<div class="tc f12 bold">' + msg + '</div>',
            buttons: [{
                text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                type: 'button-default'
            }]
        });
    }

    $(".sotong-detail-tab").each(function(i) {
        $(this).click(function() {
            $(".sotong-detail-tab span").removeClass('sotong-tab-active');
            $(this).children('span').addClass('sotong-tab-active');
            $(".sect").hide();
            $(".sect" + i).show();
        });
    });
})
