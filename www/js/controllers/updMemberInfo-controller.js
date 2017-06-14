angular.module('updMemberInfo-controller', [])

  .controller('updMemberInfoCtrl', function($scope, $ionicPopup, $localstorage, $location, $http, $httpParamSerializerJQLike, $state, $stateParams, $timeout, $ionicScrollDelegate, $ionicHistory, $cordovaFileTransfer, $ionicLoading, $cordovaFile) {
    // 팝업

    var spinner = '<ion-spinner icon="dots" class="spinner-stable"></ion-spinner><br/>';

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

    // 팝업
    if ($localstorage.get("auto") == "true") {
      $scope.uid = $localstorage.get("id");
      $scope.kind = $localstorage.get("kind");
      $scope.member_no = $localstorage.get("no");
      $scope.valid_no = $localstorage.get("valid_no");
    } else {
      $scope.uid = sessionStorage.getItem("id");
      $scope.kind = sessionStorage.getItem("kind");
      $scope.member_no = sessionStorage.getItem("no");
      $scope.valid_no = sessionStorage.getItem("valid_no");
    }
    if ($scope.kind == 'general') {
      $scope.image_URL = "http://il-bang.com/pc_renewal/gujikImage/";

    } else {
      $scope.image_URL = "http://il-bang.com/pc_renewal/guinImage/";
    }



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
        var url = '';
        if ($scope.kind == 'general') {
          url = "http://il-bang.com/pc_renewal/ionic/gujik_upload.php";

        } else {
          url = "http://il-bang.com/pc_renewal/ionic/guin_upload.php";

        }
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
            'uid': $scope.uid
          }
        };

        $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
          console.log(JSON.stringify(result));
          if (result.response == "") {
            if (result.bytesSent > 10485760) {
              $scope.alert("파일 용량이 10MB를 초과하였습니다. 다른파일을 선택해주세요.");
            } else {
              $scope.alert("업로드에 실패하였습니다. 다른파일을 선택해주세요.");
            }
          } else {
            var image = "";
            if ($scope.kind == 'general') {
              image = "http://il-bang.com/pc_renewal/gujikImage/";;

            } else {
              image = "http://il-bang.com/pc_renewal/guinImage/";

            }

            $("#profileImg").attr("src", image + result.response);
            $scope.alert("업로드 성공!");
          }
        }, function(err) {
          $scope.alert("ERROR: " + JSON.stringify(err));

        }, function(progress) {

        });
      }

      function onFail(message) {
        $scope.alert('Failed because: ' + message);
      }
    }


    $scope.uploadFile = function() {
      $ionicLoading.show({
        template: spinner + '사진 업로드중...'
      });
      if ($('#FILE_TAG').val() == "") {
        $ionicLoading.hide();
        $scope.alert("사진을 선택하세요.");

      } else {
        var url = '';
        if ($scope.kind == 'general') {
          url = "http://il-bang.com/pc_renewal/ionic/gujik_image_upload.php";

        } else {
          url = "http://il-bang.com/pc_renewal/ionic/guin_image_upload.php";

        }

        var form = $('FILE_FORM')[0];
        var formData = new FormData(form);
        formData.append("file", $("#FILE_TAG")[0].files[0]);
        formData.append("uid", $scope.uid);

        $.ajax({
          url: url,
          processData: false,
          contentType: false,
          data: formData,
          type: 'POST',
          dataType: 'JSON',
          success: function(data) {
            $scope.alert(data.logoData.message);
            $("#profileImg").attr("src", $scope.image_URL + data.logoData.image);
          }
        });
        $ionicLoading.hide();
      }


    }






    /*
     if ($localstorage.get("id") == undefined ) {

       return ;
     } else {
       $scope.uid = $localstorage.get("id");
       $scope.kind = $localstorage.get("kind");
     };
     */
    $scope.memberInfo = {};


    if ($scope.kind == "general") $scope.isCompany = false;
    else if ($scope.kind == "company") $scope.isCompany = true;

    $scope.changeEmail = function(emailAddr) {

      if (emailAddr == "직접입력") {
        $scope.memberInfo.emailAddr = "";
        $timeout(function() {
          document.getElementById("emailAddr").focus();
        }, 750);
      } else {
        $scope.memberInfo.emailAddr = emailAddr;
      }

    }

    $scope.memberInfoList = [];

    $scope.selboxData = {
      status: ['소기업', '중소기업', '대기업'],
      email: ['직접입력', 'naver.com', 'nate.com', 'hanmail.net', 'gmail.com'],
      types: ['서비스업', '판매/유통', '건설업', '제조/화학', 'IT/통신', '기관/협회', '교육업', '의료/제약/복지', '미디어/디자인', '은행/금융업'],
      flatation: [],
      year: [],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
    }

    var today = new Date();

    for (var i = today.getFullYear(); i >= today.getFullYear() - 100; i--) {
      $scope.selboxData.flatation.push(String(i));
    }

    for (var i = today.getFullYear() - 17; i >= today.getFullYear() - 117; i--) {
      $scope.selboxData.year.push(String(i));
    }

    $scope.getMemberInfo = function() {




      var myData = {
        uid: $scope.uid,
        kind: $scope.kind
      }

      $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/getMemberInfo.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function(data, status, headers, config) {

        $scope.memberInfoList = $scope.memberInfoList.concat(data.listData);
        $scope.memberInfo.emailId = data.listData[0].emailId;
        $scope.year = data.listData[0].year;
        $scope.month = Number(data.listData[0].month);
        $scope.day = Number(data.listData[0].day);
        $scope.sex = data.listData[0].sex;
        $scope.name = data.listData[0].name;
        $scope.phone1 = data.listData[0].phone1;
        $scope.phone2 = data.listData[0].phone2;
        $scope.phone3 = data.listData[0].phone3;
        console.log(data.listData[0].img_url);
        if (data.listData[0].img_url != null) {
          $scope.imageUrl = $scope.image_URL + data.listData[0].img_url;
        } else {
          // console.log("이미지없어");
          $scope.imageUrl = "http://il-bang.com/pc_renewal/gujikImage/profile-img3.png";
        }

        if (data.listData[0].emailAddr == null) {
          $scope.memberInfo.emailAddrSel = "직접입력";
        } else {
          $scope.memberInfo.emailAddr = data.listData[0].emailAddr;
          $scope.memberInfo.emailAddrSel = data.listData[0].emailAddr;
        }

        if ($scope.isCompany) {
          // alert(data.listData[0].flotation);
          $scope.types = data.listData[0].types;
          $scope.flatation = data.listData[0].flotation;
          $scope.status = data.listData[0].status;
          $scope.memberInfo.content = data.listData[0].content;
          $scope.number1 = data.listData[0].number1;
          $scope.number2 = data.listData[0].number2;
          $scope.number3 = data.listData[0].number3;
          $scope.company = data.listData[0].company;
          $scope.ceo = data.listData[0].ceo;

        }
      }).error(function(data, status, headers, config) {});
      //alert('조회 완료됨');
    }

    $scope.getMemberInfo();


    String.prototype.trim = function() {
      return this.replace(/(^\s*)|(\s*$)/gi, "");
    }

    $scope.updMemberInfo = function(o) {

      var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
      var pwd_pattern = /[`%&|\\\'\";:\/]/gi;

      if ($scope.pwd1 == undefined) {
        $scope.alert("패스워드를 입력하세요.");
        $ionicScrollDelegate.scrollTop();
        $timeout(function() {
          document.getElementById("pwd1").focus();
        }, 750);
        return;
      } else if (pwd_pattern.test($scope.pwd1)) {
        $scope.alert("패스워드에 사용할수 없는 문자입니다. (`%&|\\\'\";:\/)");
        $ionicScrollDelegate.scrollTop();
        $timeout(function() {
          document.getElementById("pwd1").select();
        }, 750);
        return;
      } else if (String($scope.pwd1).trim() == '') {
        $scope.alert("패스워드를 입력하세요.");
        $ionicScrollDelegate.scrollTop();
        $timeout(function() {
          $("#pwd1").select();
        }, 750);
        return;
      } else if (String($scope.pwd1).length < 6) {
        $scope.alert("패스워드가 너무 짧습니다 (6자 이상)");
        $ionicScrollDelegate.scrollTop();
        $timeout(function() {
          $("#pwd1").select();
        }, 750);
        return;

      } else if ($scope.pwd2 == undefined) {
        $scope.alert("패스워드를 재입력 입력하세요.");
        $ionicScrollDelegate.scrollTop();
        $timeout(function() {
          document.getElementById("pwd2").focus();
        }, 750);
        return;
      } else if ($scope.pwd1 != $scope.pwd2) {
        $scope.alert("입력한 패스워드가 일치하지 않습니다.");
        $ionicScrollDelegate.scrollTop();
        $timeout(function() {
          $("#pwd1").select();
        }, 750);
        return;
      } else if (special_pattern.test($scope.memberInfo.content)) {
        $scope.alert("주요 사업내용에 특수문자를 입력할 수 없습니다.");
        $ionicScrollDelegate.scrollTop();
        $timeout(function() {
          $("#content").select();
        }, 750);
        return;
      }


      var myData = {
        pwd1: $scope.pwd1,
        pwd2: $scope.pwd2,
        email: $scope.memberInfo.emailId + '@' + $scope.memberInfo.emailAddr,
        content: $scope.memberInfo.content,
        kind: $scope.kind,
        uid: $scope.uid
      }

      $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/updMemberInfo.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function(data, status, headers, config) {

        if (data.result) {
          $scope.getMemberInfo();
          $scope.pwd1 = '';
          $scope.pwd2 = '';
          $ionicScrollDelegate.scrollTop();
          $scope.alert("수정 되었습니다.");

        } else {
          $scope.alert("수정 실패하였습니다.");
        }

      }).error(function(data, status, headers, config) {});

    }

  })
