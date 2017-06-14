angular.module('sotongBoardView-controller',[])
.controller('sotongBoardViewCtrl',function($scope, $state, $localstorage, $http, $httpParamSerializerJQLike, $stateParams, $ionicPopup, $ionicModal, $cordovaFileTransfer, $sce, $ionicHistory, $ionicScrollDelegate, $cordovaCamera) {
    if($localstorage.get("auto") == "true") {
        $scope.uid = $localstorage.get("id");
    } else {
        $scope.uid = sessionStorage.getItem("id");
    }

    $scope.type = $stateParams.type;
    $scope.no = $stateParams.no;
    $scope.writeTitle = "글 수정";
    $scope.alertCheck = 0;
    $scope.commentShow = true;

    if($stateParams.type == "culture") {
        $scope.title = "문화";
    } else if($stateParams.type == "advert") {
        $scope.title = "광고/홍보";
    } else if($stateParams.type == "care") {
        $scope.title = "요양";
    } else if($stateParams.type == "fitness") {
        $scope.title = "휘트니스";
    }

    getBoardData();
    getCommentList();

    function getBoardData() {
        var data = {
            no: $scope.no,
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
                $scope.sotongNo = data.boardData.sotongNo;
                $scope.name = data.boardData.name;
                $scope.boardTitle = data.boardData.title;
                $scope.content = data.boardData.content;
                $scope.wdate = data.boardData.wdate;
                $scope.imageCnt = data.boardData.imageCnt;
                $scope.manageCheck = data.boardData.manageCheck;

                $scope.imageList = [];
                $scope.imageList = data.imageList;
                $scope.videoUrl = $sce.trustAsResourceUrl(data.boardData.video);

                if(data.boardData.video == null || data.boardData.video == "") {
                    $scope.videoView = false;
                } else {
                    $scope.videoView = true;
                }
            }
        });
    }

    function getCommentList() {
        var data = {
            no: $scope.no,
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

    $scope.commentView = function() {
        if($scope.commentShow == false) {
            $scope.commentShow = true;
        } else {
            $scope.commentShow = false;
        }
    }

    $scope.sotong = {};

    $scope.commentApply = function() {
        if($scope.uid == null || $scope.uid == "") {
            $scope.login();
        } else {
            if($scope.sotong.comment == null || $scope.sotong.comment == "") {
                $scope.alert("댓글 내용을 입력해주세요.");
            } else {
                var data = {
                    sotongNo: $scope.sotongNo,
                    boardNo: $scope.no,
                    id: $scope.uid,
                    content: $scope.sotong.comment
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
                        $scope.sotong.comment = "";
                        getCommentList();
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
                    var data = { no: $scope.no };

                    $http({
                        method: 'POST',
                        url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/boardDelete.php',
                        data: $httpParamSerializerJQLike(data),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).success(function (data, status, headers, config) {
                        $scope.alert(data, 'back');
                    });
                }
            }]
        });
    }

    $ionicModal.fromTemplateUrl('templates/sotong/view/sotongNewWrite.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalWrite = modal;
    });

    $scope.openModalWrite = function() {
        var data = { no: $scope.no };

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/getBoardData.php',
            data: $httpParamSerializerJQLike(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function (data, status, headers, config) {
            $scope.modalWrite.show();

            $scope.sotongForm = {
                title: data.boardData.title,
                content: data.boardData.content,
                imageList: data.imageList,
                videoUrl: data.boardData.video
            }
        });
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
            var data = {
                no: $scope.no,
                id: $scope.uid,
                title: $scope.sotongForm.title,
                content: $scope.sotongForm.content,
                video: $scope.sotongForm.videoUrl,
                image: $scope.sotongForm.imageList
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/sotong/boardModify.php',
                data: $httpParamSerializerJQLike(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function (data, status, headers, config) {
                $scope.alert(data, 'cancel');
            });
        }
    }

    $scope.closeModalWrite = function() {
        $scope.modalWrite.hide();
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
                        $ionicHistory.goBack();
                    } else if(type == 'cancel') {
                        getBoardData();
                        getCommentList();
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
                    $state.go("login");
                }
            }]
        });
    }
})
