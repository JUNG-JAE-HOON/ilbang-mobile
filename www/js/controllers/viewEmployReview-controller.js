angular.module('viewEmployReview-controller', [])

.controller('viewEmployReviewCtrl', function($scope,$ionicPopup,$stateParams,$http,$httpParamSerializerJQLike,$localstorage) {
  //alert('test');
  //alert($stateP arams.work_join_list_no);
  //alert('t');
  $scope.alert = function(msg) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>'+msg+'</b></span><br>',

      buttons: [{
        text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
        type: 'button-default'
      }]

    });

  };
  if($localstorage.get("auto")=="true"){
    $scope.uid        = $localstorage.get("id");
    $scope.kind       = $localstorage.get("kind");
    $scope.member_no  = $localstorage.get("no");
    $scope.valid_no   = $localstorage.get("valid_no");
   }else{
    $scope.uid        = sessionStorage.getItem("id");
    $scope.kind       = sessionStorage.getItem("kind");
    $scope.member_no  = sessionStorage.getItem("no");
    $scope.valid_no   = sessionStorage.getItem("valid_no");
   }

  $scope.loadMore = function() {
    //alert($stateParams.employ_no);
    $scope.items = [];
    $scope.allPost = 0;
    var myData = {
      'employ_no':  $stateParams.employ_no
    }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/viewEmployReview.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
      $scope.items = $scope.items.concat(data.listData);
      //$scope.paging.push(data.paging);
      //$scope.paging.push(data.paging);
      $scope.allPost = data.paging.allPost;
      $scope.name = data.name;
      $scope.noMoreItemsAvailable = false;

      if (data.paging.page >= data.paging.allPage) {
         $scope.noMoreItemsAvailable = true;
      }
      asyncGreet(data.listData);

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (data, status, headers, config) {

    });
  }

  function asyncGreet() {

    setTimeout(function() {
          var rateYo=function(){
             for(var i=0; i<$scope.items.length; i++){

               $("#rateYo"+(i)).rateYo({
                 rating: $scope.items[i].score,
                 readOnly: true,
                 starWidth:'17px'
               });
             }

          }
          rateYo();
    }, 1000);

  }


    var rateYo=function(){
      $("#rateYo").rateYo({
        rating: 4.8,
        readOnly: true,
        starWidth:'17px'
      });
      $("#rateYo1").rateYo({
        rating: 4.2,
        readOnly: true,
         starWidth: "10px"
      });
      $("#rateYo2").rateYo({
        rating: 3.9,
        readOnly: true,
         starWidth: "10px"
      });
      $("#rateYo3").rateYo({
        rating: 4.3,
        readOnly: true,
         starWidth: "10px"
      });
      $("#rateYo4").rateYo({
        rating: 4.6,
        readOnly: true,
         starWidth: "10px"
      });
      $("#rateYo5").rateYo({
        rating: 4.0,
        readOnly: true,
         starWidth: "10px"
      });
    }
    rateYo();

    //$scope.review="안녕";
    //$scope.reviewContent ="";
    $scope.review = {};


        // 팝업



    $scope.confirmStar = function() {

      $scope.review = {};
      $(document).on("click",".estiBtn",function(){
          $("#rateYo99").rateYo({
            starWidth: "35px",
            onChange: function (rating, rateYoInstance) {
             console.log(rating);
             $scope.review.rating = rating;
           }
        });
      });

      var confirmPopup = $ionicPopup.confirm({
        title: '<h4 class="fo">구직자를 평가해주세요</h4>',
        cssClass:'starPop',
        template: '<div id="rateYo99" ng-model="review.rating" class="choicePoint di mt10"></div>'
                 +'<textarea name="estiText" id="estiTextArea" class="border2 estiText mt20 padding" ng-model="review.text" placeholder="평가는 익명으로 올려집니다. 솔직한 후기를 남겨주세요.<br>평점으로만 평가하기도 가능합니다."></textarea>',
      scope: $scope,
        buttons: [{
          text: '취소',
          type: 'button-default',
          onTap: function() {
            return;
           //$state.go('itemRead');
          }
        },{
          text: '확인',
          type: 'button-default',
          onTap: function(e) {
           //$state.go('itemRead');
          //alert($scope.review2);
            //alert($("#estiTextArea").val());
            //alert(JSON.stringify($scope.review));
            //alert($scope.review.rating);
            //alert($scope.review.text2);
            //alert($scope.review.text2);


            var myData = {
              'score'             : $scope.review.rating  ,
              'content'           : $scope.review.text    ,
              'work_join_list_no' : $stateParams.work_join_list_no
            }
            //alert('시작전');
            //alert(JSON.stringify(myData));

            $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/insertResumeReview.php',
                data: $httpParamSerializerJQLike(myData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                //alert('성공');
                $scope.loadMore();
                if(data.result == "0"){
                  $scope.alert(data.msg);
                  //alert(data.sql);
                  //alert(data.work_date);
                }else if (data.result == "1"){
                  $scope.alert(data.msg);

                  //alert(data.sql);
                  //alert(data.work_date);

                }
            }).error(function (data, status, headers, config) {

            });

          return ;
          //  alert(e.review2);
           //alert(angular.element('#estiTextArea').toString());
          }
        }]

      });


      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    };
    // alert('1');

    // 평가하기 클릭하면 빈 별 표시



})
