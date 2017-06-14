angular.module('cooperate-controller', [])
.controller('cooperateCtrl', function($scope, $localstorage, $http, $state, $httpParamSerializerJQLike, $ionicPopup,$cordovaInAppBrowser) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }



    $scope.goCooper = function(domain){
      var options = {
          clearcache: 'yes',
          closebuttoncaption: '종료'
      };
      $cordovaInAppBrowser.open(domain, '_blank', options)
          .then(function(event) {
                // success
          })
          .catch(function(event) {
               // error
          });
    }



    $scope.loginCheck = function() {
        if(id == undefined || id == "") {
          var confirmPopup = $ionicPopup.confirm({
            cssClass:'estiPop',
            title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
            template:'<div class="tc f12"><span><b>로그인을 해주세요.</b></span><br>',

            buttons: [{
                text: '나중에 하기',
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
            $state.go('ptn');
        }
    }

    $scope.cooperate = function() {
        var company = $scope.company;
        var name = $scope.name;
        var email = $scope.email;
        var phone1 = $scope.phone1;
        var phone2 = $scope.phone2;
        var phone3 = $scope.phone3;
        var phone = phone1 + "-" + phone2 + "-" + phone3;
        var title = $scope.title;
        var content = $scope.content;

        if(company == "" || company == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>업무 제휴 신청하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">회사명을 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if(name == "" || name == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>업무 제휴 신청하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">이름을 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if(email == "" || email == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>업무 제휴 신청하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">이메일을 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if(phone1 == "" || phone1 == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>업무 제휴 신청하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">전화번호를 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if(phone2 == "" || phone2 == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>업무 제휴 신청하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">전화번호를 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if(phone3 == "" || phone3 == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>업무 제휴 신청하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">전화번호를 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if(title == "" || title == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>업무 제휴 신청하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">제목을 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else if(content == "" || content == null) {
            var confirmPopup = $ionicPopup.show({
                cssClass:'withdrawalPop',
                title: '<h4>업무 제휴 신청하기</h4>',
                template: '<div class="tc" style="padding: 30px 0;">내용을 입력해주세요.</div>',
                scope: $scope,
                buttons: [{
                    text: '<b class="fw">확인</b>',
                    type: 'button-ilbang'
                }]
            });
        } else {
            var listParam = {
                id: id,
                company: company,
                name: name,
                email: email,
                phone: phone,
                title: title,
                content: content
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/cooperate.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                var confirmPopup = $ionicPopup.confirm({
                    cssClass:'withdrawalPop',
                    title: '<h4>업무 제휴 신청하기</h4>',
                    template: '<div class="tc" style="padding: 30px 0;">' + data + '</div>',
                    buttons: [{
                        text: '<b class="fw">확인</b>',
                        type: 'button-ilbang',
                        onTap: function(e) {
                            $state.go('cooperate');
                        }
                    }]
                });
            })
        }
    }



    // $http({
    //     method: 'POST',
    //     url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/getProposalContent.php',
    //     data: $httpParamSerializerJQLike(adNum),
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    // }).success(function (data, status, headers, config) {
    //     var proposal = data.proposalContent;
    //
    //     $scope.no = proposal.no;
    //     $scope.title = proposal.title;
    //     $scope.content = proposal.content;
    //     $scope.link = proposal.link;
    //     $scope.time = proposal.time;
    //     $scope.quiz = proposal.quiz;
    //     $scope.exam1 = proposal.exam1;
    //     $scope.exam2 = proposal.exam2;
    //     $scope.exam3 = proposal.exam3;
    //     $scope.exam4 = proposal.exam4;
    //     $scope.correct = proposal.correct;
    //     $scope.expose = proposal.expose;
    //     $scope.price = proposal.price;
    //     $scope.total = $scope.expose * $scope.price;
    //
    //     if(proposal.no != "") {
    //         $scope.btnView = true;
    //     }
    // })
    //
    // $scope.title = "";
    // $scope.expose = 0;
    // $scope.price = 0;
    //
    // $scope.adProposal = function(type, val) {
    //     if(type == 0) {
    //         var time = $scope.time;
    //     } else {
    //         var time = 15;
    //     }
    //
    //     var val = val;
    //     var type = type;
    //     var title = $scope.title;
    //     var content = $scope.content;
    //     var link = $scope.link;
    //     var quiz = $scope.quiz;
    //     var exam1 = $scope.exam1;
    //     var exam2 = $scope.exam2;
    //     var exam3 = $scope.exam3;
    //     var exam4 = $scope.exam4;
    //     var correct = $scope.correct;
    //     var expose = $scope.expose;
    //     var price = $scope.price;
    //
    //     if(title == "") {
    //         alert("제목을 입력해주세요.");
    //     } else if(content == "") {
    //         alert("내용을 입력해주세요.");
    //     } else if(link == "") {
    //         alert("링크를 입력해주세요.");
    //     } else if(time == "") {
    //         alert("영상 시간을 입력해주세요.");
    //     } else if(quiz == "") {
    //         alert("문제를 입력해주세요.");
    //     } else if(exam1 == "" || exam2 == "" || exam3 == "" || exam4 == "") {
    //         alert("정답을 입력해주세요.");
    //     } else if(expose == "" || expose == 0) {
    //         alert("노출수를 입력해주세요.");
    //     } else if(price == "" || price == 0) {
    //         alert("적립금을 입력해주세요.");
    //     } else {
    //         var listParam = {
    //             id: id,
    //             val: val,
    //             num: number,
    //             type: type,
    //             title: title,
    //             content: content,
    //             link: link,
    //             quiz: quiz,
    //             exam1: exam1,
    //             exam2: exam2,
    //             exam3: exam3,
    //             exam4: exam4,
    //             correct: correct,
    //             expose: expose,
    //             price: price,
    //             time: time
    //         }
    //
    //         $http({
    //             method: 'POST',
    //             url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/adProposal.php',
    //             data: $httpParamSerializerJQLike(listParam),
    //             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    //         }).success(function (data, status, headers, config) {
    //             alert(data);
    //             $state.go('adApply');
    //         })
    //     }
    // }
    //
    // $scope.loginCheck = function(val) {
    //     if(id == "") {
    //         alert("로그인 해주시기 바랍니다.");
    //     } else {
    //         if(val == 0) {
    //             $state.go('applyFormTabs.video');
    //         } else {
    //             $state.go('applyLogTabs.video');
    //         }
    //     }
    // }
})
