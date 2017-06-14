angular.module('apply-controller', [])
.controller('ApplyCtrl', function($scope, $localstorage, $http, $state, $httpParamSerializerJQLike, $stateParams,$ionicPopup) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    var adNum = { no:  $stateParams.no, id: id };
    var number = $stateParams.no;

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/getProposalContent.php',
        data: $httpParamSerializerJQLike(adNum),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        var proposal = data.proposalContent;

        $scope.no = proposal.no;
        $scope.title = proposal.title;
        $scope.content = proposal.content;
        $scope.link = proposal.link;
        $scope.time = proposal.time;
        $scope.quiz = proposal.quiz;
        $scope.exam1 = proposal.exam1;
        $scope.exam2 = proposal.exam2;
        $scope.exam3 = proposal.exam3;
        $scope.exam4 = proposal.exam4;
        $scope.correct = proposal.correct;
        $scope.expose = proposal.expose;
        $scope.price = proposal.price;
        $scope.total = $scope.expose * $scope.price;

        if(proposal.no != "") {
            $scope.btnView = true;
        }
    })

    $scope.title = "";
    $scope.expose = 0;
    $scope.price = 0;


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

    $scope.adProposal = function(type, val) {
        if(type == 0) {
            var time = $scope.time;
        } else {
            var time = 15;
        }

        var val = val;
        var type = type;
        var title = $scope.title;
        var content = $scope.content;
        var link = $scope.link;
        var quiz = $scope.quiz;
        var exam1 = $scope.exam1;
        var exam2 = $scope.exam2;
        var exam3 = $scope.exam3;
        var exam4 = $scope.exam4;
        var correct = $scope.correct;
        var expose = $scope.expose;
        var price = $scope.price;

        if(title == "") {
            noti("제목을 입력해주세요.");
        } else if(content == "") {
            noti("내용을 입력해주세요.");
        } else if(link == "") {
            noti("링크를 입력해주세요.");
        } else if(time == "") {
            noti("영상 시간을 입력해주세요.");
        } else if(quiz == "") {
            noti("문제를 입력해주세요.");
        } else if(exam1 == "" || exam2 == "" || exam3 == "" || exam4 == "") {
            noti("정답을 입력해주세요.");
        } else if(expose == "" || expose == 0) {
            noti("노출수를 입력해주세요.");
        } else if(price == "" || price == 0) {
            noti("적립금을 입력해주세요.");
        } else {
            var listParam = {
                id: id,
                val: val,
                num: number,
                type: type,
                title: title,
                content: content,
                link: link,
                quiz: quiz,
                exam1: exam1,
                exam2: exam2,
                exam3: exam3,
                exam4: exam4,
                correct: correct,
                expose: expose,
                price: price,
                time: time
            }

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/adProposal.php',
                data: $httpParamSerializerJQLike(listParam),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                noti(data);
                $state.go('adApply');
            })
        }
    }

    $scope.loginCheck = function(val) {
        if(id == "" || id == undefined) {
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
            if(val == 0) {
                $state.go('applyFormTabs.video');
            } else {
                $state.go('applyLogTabs.video');
            }
        }
    }
})

.controller('ApplyVideoLogCtrl', function($scope, $localstorage, $http, $state, $httpParamSerializerJQLike, $ionicPopup) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    $scope.page = 0;
    $scope.items = [];
    $scope.loadMore = function() {
        $scope.page = $scope.page + 1;
        var myData = { page: $scope.page, id: id }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/getProposalVideoList.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.items = $scope.items.concat(data.adProposalLogList);
            $scope.noMoreItemsAvailable = false;

            if (data.paging.page >= data.paging.allPage) {
               $scope.noMoreItemsAvailable = true;
           }
           if(data.paging.allPost == 0){
             var confirmPopup = $ionicPopup.confirm({
               cssClass:'estiPop',
               title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
               template:'<div class="tc f12"><span><b>'+"영상 광고 신청을 아직 하지 않으셨습니다."+'</b></span><br>',

               buttons: [{
                 text: '확인',
                 type: 'button-default'
               }]
             });
           }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };
})

.controller('ApplyBannerLogCtrl', function($scope, $localstorage, $http, $state, $httpParamSerializerJQLike, $ionicPopup) {
    if($localstorage.get("auto") == "true") {
        var id = $localstorage.get("id");
    } else {
        var id = sessionStorage.getItem("id");
    }

    $scope.page = 0;
    $scope.items = [];

    $scope.loadMore = function() {
        $scope.page = $scope.page + 1;

        var myData = { page: $scope.page, id: id }

        $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/ad/getProposalBannerList.php',
            data: $httpParamSerializerJQLike(myData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.items = $scope.items.concat(data.adProposalLogList);
            $scope.noMoreItemsAvailable = false;

            if (data.paging.page >= data.paging.allPage) {
               $scope.noMoreItemsAvailable = true;
           }
           if(data.paging.allPost == 0){
             var confirmPopup = $ionicPopup.confirm({
               cssClass:'estiPop',
               title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
               template:'<div class="tc f12"><span><b>'+"배너 광고 신청을 아직 하지 않으셨습니다."+'</b></span><br>',

               buttons: [{
                 text: '확인',
                 type: 'button-default'
               }]
             });
           }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };
})
