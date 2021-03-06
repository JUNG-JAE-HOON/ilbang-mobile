angular.module('employReview-controller', [])

.controller('employReviewCtrl', function($scope,$ionicPopup,$stateParams,$http,$httpParamSerializerJQLike,$localstorage,$window) {

  $scope.score=0;
  //alert('test');
  //alert($stateP arams.work_join_list_no);

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


  $scope.page = 0;
  $scope.items = [];
  $scope.loadMore = function() {

    $scope.page = $scope.page + 1;
    $scope.allPost = 0;

    var myData = {
      'work_join_list_no':  $stateParams.work_join_list_no,
      'page'  : $scope.page
    }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/getEmployReviewList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
      console.log(JSON.stringify(data));
      $scope.items = $scope.items.concat(data.listData);
      //$scope.paging.push(data.paging);
      //$scope.paging.push(data.paging);
      $scope.allPost = data.paging.allPost;
      $scope.name = data.name;
      //alert($scope.name);
      $scope.noMoreItemsAvailable = false;

      if (data.paging.page >= data.paging.allPage) {
         $scope.noMoreItemsAvailable = true;
      }
      $( document ).ready(function() {
        asyncGreet(data.listData);
      });

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (data, status, headers, config) {

    });
  }

  function asyncGreet() {

    setTimeout(function() {
          var rateYo=function(){
             for(var i=0; i<$scope.items.length; i++){
               console.log("실행"+i);
               //alert($scope.items[i].score);
               $("#rateYo"+(i+1)).rateYo({
                 rating: $scope.items[i].score,
                 readOnly: true,
                 starWidth:'17px'
               });
             }

          }
          rateYo();
    }, 1000);

  }





    $scope.confirmStar = function() {
        $( document ).ready(function() {
            $(document).on("click","#employReviewBtn",function(){
              $("#rateYo991").rateYo({
                starWidth: "35px",
                onChange: function (rating, rateYoInstance) {


                 $scope.score = rating;
               }
            });
          });
        });

      $scope.review = {text : "" ,rating : 0}
      var confirmPopup = $ionicPopup.confirm({
        title: '<h4 class="fo">구인자를 평가해주세요</h4>',
        cssClass:'starPop',
        template: '<div id="rateYo991" class="choicePoint di mt10"></div>'
                 +'<textarea name="estiText" id="estiTextArea" class="border2 estiText mt20 padding" ng-model="review.text" placeholder="평가는 익명으로 올려집니다. 솔직한 후기를 남겨주세요"></textarea>',
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
            $scope.scoreUp();
           //$state.go('itemRead');
          //alert($scope.review2);
            //alert($( "#estiTextArea").val());
            //alert(JSON.stringify($scope.review));
            //alert($scope.review.rating);
            //alert($scope.review.text2);
            //alert($scope.review.text2);
            //alert($scope.review.rating );
            //  alert($scope.review.text);



          return ;
          //  alert(e.review2);
           //alert(angular.element('#estiTextArea').toString());
          }
        }]

      });
    };
  $scope.scoreUp = function( ){
    var myData = {
      'score'             : $("#rateYo991").rateYo("option", "rating")  ,
      'content'           : $scope.review.text    ,
      'work_join_list_no' : $stateParams.work_join_list_no
    }
    //alert('시작전');
    console.log("asdf"+JSON.stringify(myData));

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/insertEmployReview.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        //alert('성공');
        if(data.result == "0"){
          $scope.alert(data.msg);
          //alert(data.sql);
          //alert(data.work_date);
        }else if (data.result == "1"){
          $scope.alert(data.msg);

          //alert(data.sql);
          //alert(data.work_date);

        }

        $scope.items = [];
        $scope.page = 0;
        $scope.loadMore();
        //$window.location.reload();
    }).error(function (data, status, headers, config) {

    });
  };


})
