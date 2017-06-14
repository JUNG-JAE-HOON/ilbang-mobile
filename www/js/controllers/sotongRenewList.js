angular.module('sotongRenewList-controller',[])
.controller('sotongRenewListCtrl',function($scope, $state, $localstorage, $http, $httpParamSerializerJQLike, $stateParams, $ionicPopup, $ionicPopover, $ionicModal, $cordovaCamera, $cordovaFileTransfer, $sce, $ionicScrollDelegate) {
    if($localstorage.get("auto") == "true") {
        $scope.uid = $localstorage.get("id");
    } else {
        $scope.uid = sessionStorage.getItem("id");
    }

    $scope.no = $stateParams.no;
    $scope.alertCheck = 0;
    $scope.page = 1;
    $scope.sotongList = {};

    function getProfile() {
        var data = { no: $scope.no };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getShowAllData.php',
            data: $httpParamSerializerJQLike(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            $scope.kind = data.profile.kind;
            $scope.sotongImg = data.profile.image;
            $scope.sotongName = data.profile.name;
            $scope.sotongAge = data.profile.age;
            $scope.sotongJob = data.profile.job;
            $scope.sotongBirth = data.profile.birthday;
            $scope.sotongBirthPlace = data.profile.birthPlace;
            $scope.sotongTypes = data.profile.types;
            $scope.sotongFlotation = data.profile.flotation;

            if($scope.uid == data.profile.uid) {
                $scope.writeBtn = true;
            } else {
                $scope.writeBtn = false;
            }
        });
    }

    function getBoardList(page, check) {
        var data = {
            page: page,
            no: $scope.no,
            check: check
        };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getPageBoardList.php',
            data: $httpParamSerializerJQLike(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            $scope.boardList = [];
            $scope.boardList = data.boardList;

            if(data.boardList == null) {
                $scope.boardNot = true;
            } else {
                $scope.boardNot = false;
            }

            if(data.paging.allPage <= 1 || data.paging.allPage == data.paging.page) {
                $scope.boardListMoreView = false;
            } else {
                $scope.boardListMoreView = true;
            }
        });
    }

    getProfile();
    getBoardList($scope.page, 'yes');

    $scope.moreBoardList = function() {
        $scope.page++;

        getBoardList($scope.page, 'no');
    }

    $scope.sotongForm = {};
    $scope.sotongForm.imageList = [];

    $scope.imageChange = function(type, index) {
        $ionicPopup.confirm({
            cssClass: 'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%" /></h4>',
            template: '<div class="tc f12 bold">해당 이미지를 변경 또는 삭제하시겠습니까?</div>',
            buttons: [{
                text: "취소",
                type: "button-default"
            }, {
                text: "변경",
                type: "button-default",
                onTap: function() {
                    $scope.getPicture(type, index);
                }
            }, {
                text: "삭제",
                type: "button-default",
                onTap: function() {
                    $scope.sotongForm.imageList.splice(index, 1);
                    $scope.seq = $scope.sotongForm.imageList.length;
                }
            }]
        });
    }

    function setCamera(type, index) {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: false,
            correctOrientation: false
        }

        $cordovaCamera.getPicture(options).then(function(imageData) {
            imageUpload(imageData, type, index);
        });
    }

    $scope.getPicture = function(type, index) {
        if($scope.sotongForm.imageList.length < 3 || type == 'modify') {
            if($scope.alertCheck == 0) {
                $ionicPopup.confirm({
                    cssClass: 'estiPop',
                    title: '<h4 class="fo"><img src="img/cloud.png" width="15%" /></h4>',
                    template: '<div class="tc f12 bold">이미지는 최대 3개까지 등록할 수 있습니다.<br />등록 후 해당 이미지를 터치하시면 수정 또는 삭제할 수 있습니다.</div>',
                    buttons: [{
                        text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                        type: 'button-default',
                        onTap: function() {
                            $scope.alertCheck++;

                            setCamera(type, index);
                        }
                    }]
                });
            } else {
                setCamera(type, index);
            }
        } else {
            $scope.alert("이미지는 최대 3개까지 등록할 수 있습니다.");
        }
    }

    function imageUpload(imagePath, type, index) {
        var url = "http://il-bang.com/ilbang_pc/ionic/http/sotong/imageUpload.php";
        var modifiedFile = imagePath.split("?");
        var filename = modifiedFile[0].split("/").pop();
        var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "image/jpeg",
                params: {
                    'directory': ' ',
                    'filename': filename,
                    'uid': $scope.uid
                }
            };

        $cordovaFileTransfer.upload(url, imagePath, options).then(function(result) {
            if(result.response == "") {
                if(result.bytesSent > 10485760) {
                    Popup.alert("파일 용량이 10MB를 초과했습니다. 다른 파일을 선택해주세요.");
                } else {
                    Popup.alert("업로드에 실패했습니다. 다른 파일을 선택해주세요.");
                }
            } else {
                var url = "http://il-bang.com/pc_renewal/sotongBoardFile/" + result.response;

                if(type == "push") {
                    $scope.sotongForm.imageList.push(result.response);
                } else {
                    $scope.sotongForm.imageList[index] = result.response;
                }
            }
        }, function(err) {
            Popup.alert("파일 업로드 실패\n" + JSON.stringify(err));
        });
    }

    $scope.sotongWrite = function() {
        if($scope.sotongForm.title == null || $scope.sotongForm.title == "") {
            $scope.alert("제목을 입력해주세요.");
        } else if($scope.sotongForm.content == null || $scope.sotongForm.content == "") {
            $scope.alert("내용을 입력해주세요.");
        } else {
            if($scope.modalType == "push") {
                var no = $scope.no;
                var url = "http://il-bang.com/ilbang_pc/ionic/http/sotong/sotongWrite.php";
            } else {
                var no = $scope.boardNo;
                var url = "http://il-bang.com/ilbang_pc/ionic/http/sotong/boardModify.php";
            }

            var data = {
                no: no,
                id: $scope.uid,
                title: $scope.sotongForm.title,
                content: $scope.sotongForm.content,
                video: $scope.sotongForm.videoUrl,
                image: $scope.sotongForm.imageList
            }

            $http({
                method: 'POST',
                url: url,
                data: $httpParamSerializerJQLike(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                if($scope.modalType == "modify") {
                    modalData($scope.boardNo);
                }

                getBoardList($scope.page, 'no');
                $scope.alert(data, 'cancel');
            });
        }
    }

    $ionicModal.fromTemplateUrl('templates/sotong/view/sotongNewWrite.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalWrite = modal;
    });

    $ionicModal.fromTemplateUrl('templates/sotong/view/sotongNewWrite.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalModify = modal;
    });

    $ionicModal.fromTemplateUrl('templates/sotong/view/sotongNewRead.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalRead = modal;
    });

    $scope.openModalWrite = function() {
        $scope.modalType = "push";
        $scope.writeTitle = "글 쓰기";

        var data = { no: $scope.no };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/sotongWriteCheck.php',
            data: $httpParamSerializerJQLike(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            if(data == "yes") {
                $scope.modalWrite.show();

                $scope.sotongForm = {
                    title: "",
                    content: "",
                    imageList: [],
                    videoUrl: ""
                }
            } else {
                $scope.alert("소통방 승인 후 이용 가능합니다.");
            }
        });
    }

    $scope.openModalModify = function() {
        $scope.modalType = "modify";
        $scope.writeTitle = "글 수정";

        var data = { no: $scope.boardNo };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getBoardData.php',
            data: $httpParamSerializerJQLike(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            $scope.modalModify.show();

            $scope.sotongForm = {
                title: data.boardData.title,
                content: data.boardData.content,
                imageList: data.imageList,
                videoUrl: data.boardData.video
            }
        });
    }

    function getCommentList() {
        var data = {
            no: $scope.boardNo,
            id: $scope.uid
        }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getCommentList.php',
            data: $httpParamSerializerJQLike(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            $scope.commentList = [];

            if(data.commentList == null) {
                $scope.reviewCnt = 0;
            } else {
                $scope.commentList = data.commentList;
                $scope.reviewCnt = data.commentList.length;
            }
        });
    }

    function modalData(no) {
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
                $scope.closeModalRead();
            } else {
                $scope.boardNo = no;
                $scope.title = data.boardData.title;
                $scope.content = data.boardData.content;
                $scope.wdate = data.boardData.wdate;
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

                getCommentList();
            }
        });
    }

    $scope.openModalRead = function(no) {
        $scope.commentShow = true;
        $scope.sotongRead.comment = "";
        $scope.board = {};

        modalData(no);
        $scope.modalRead.show();
    }

    $scope.commentView = function() {
        if($scope.commentShow == false) {
            $scope.commentShow = true;
        } else {
            $scope.commentShow = false;
        }
    }

    $scope.sotongRead = {};

    $scope.commentApply = function() {
        if($scope.uid == null || $scope.uid == "") {
            $scope.login();
        } else {
            if($scope.sotongRead.comment == null || $scope.sotongRead.comment == "") {
                $scope.alert("댓글 내용을 입력해주세요.");
            } else {
                var data = {
                    sotongNo: $scope.no,
                    boardNo: $scope.boardNo,
                    id: $scope.uid,
                    content: $scope.sotongRead.comment
                }

                $http({
                    method: 'POST',
                    url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/commentApply.php',
                    data: $httpParamSerializerJQLike(data),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).success(function (data, status, headers, config) {
                    if(data != null && data != "") {
                        $scope.alert(data);
                    } else {
                        $scope.sotongRead.comment = "";

                        getCommentList();
                        getBoardList($scope.page, 'no');
                    }
                });

                setTimeout(function() {
                    $ionicScrollDelegate.scrollBottom();
                }, 100);
            }
        }
    }

    $scope.commentDelete = function(no) {
        $ionicPopup.confirm({
            cssClass: 'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%" /></h4>',
            template: '<div class="tc f12 bold">댓글을 삭제하시겠습니까?</div>',
            buttons: [{
                text: '취소',
                type: 'button-default'
            }, {
                text: '삭제',
                type: 'button-default',
                onTap: function() {
                    var data = { no: no };

                    $http({
                        method: 'POST',
                        url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/commentDelete.php',
                        data: $httpParamSerializerJQLike(data),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (data, status, headers, config) {
                        $scope.alert(data);
                        getCommentList();
                        getBoardList($scope.page, 'no');
                    });
                }
            }]
        });
    }

    $scope.boardDelete = function() {
        $ionicPopup.confirm({
            cssClass: 'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%" /></h4>',
            template: '<div class="tc f12 bold">글을 삭제하시겠습니까?</div>',
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
                        $scope.alert(data, 'back');
                        getBoardList(1);
                    });
                }
            }]
        });
    }

    $scope.closeModalWrite = function() {
        if($scope.modalType == "push") {
            $scope.modalWrite.hide();
        } else {
            $scope.modalModify.hide();
        }
    }

    $scope.closeModalRead = function() {
        $scope.modalRead.hide();
    }

    $scope.alert = function(msg, type) {
        $ionicPopup.confirm({
            cssClass: 'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%" /></h4>',
            template: '<div class="tc f12 bold">' + msg + '</div>',
            buttons: [{
                text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
                type: 'button-default',
                onTap: function() {
                    if(type == 'back') {
                        $scope.closeModalRead();
                    } else if(type == 'cancel') {
                        $scope.closeModalWrite();
                    }
                }
            }]
        });
    }

    $scope.login = function() {
        $ionicPopup.confirm({
            cssClass: 'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%" /></h4>',
            template: '<div class="tc f12 bold">로그인 후 이용바랍니다.</div>',
            buttons: [{
                text: '나중에 하기',
                type: 'button-default'
            }, {
                text: '로그인 하기',
                type: 'button-default',
                onTap: function() {
                    $scope.closeModalRead();
                    $state.go("login");
                }
            }]
        });
    }
})
