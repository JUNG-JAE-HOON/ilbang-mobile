
angular.module('myReview-controller',[])
.controller('MyReviewCtrl', function($scope, $http, $httpParamSerializerJQLike,$localstorage,$ionicPopup,$ionicHistory,$state,$ionicPlatform) {
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
  $scope.loadData = function(){
    var myData = {
      'uid':  $scope.uid,
      'kind': $scope.kind
    }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/myReview.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

      // console.log(JSON.stringify(data));
      $scope.items = $scope.items.concat(data.listData);

      $scope.allPost = data.allPost;


      $scope.asyncGreet ();
      if($scope.allPost==0){


        if($scope.kind== "company"){
          var confirmPopup = $ionicPopup.confirm({
            cssClass:'estiPop',
            template: '<div class="tc f12"><img src="img/cloud.png" width="20%"></div>'
                     +'<div class="tc f12"><span><b>평점, 평가가 없습니다.</b></span><br>'
                     +'<span class="f12"><b>평가는 구직자가 구직 후 작성이 가능합니다.</b></span></div>',
            buttons: [{
              text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
              type: 'button-default'
            }]
          });
        }else{
          var confirmPopup = $ionicPopup.confirm({
            cssClass:'estiPop',
            template: '<div class="tc f12"><img src="img/cloud.png" width="20%"></div>'
                     +'<div class="tc f12"><span><b>평점, 평가가 없습니다.</b></span><br>'
                     +'<span class="f12"><b>평가는 구인, 구직 후 구인자가 작성합니다.</b></span></div>',
            buttons: [{
              text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
              type: 'button-default'
            }]
          });
        }
      }


      // $scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (data, status, headers, config) {

    });
  }

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


   if($scope.uid == "" || $scope.uid == undefined) {
     var confirmPopup = $ionicPopup.confirm({
       cssClass:'estiPop',
       title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
       template:'<div class="tc f12"><span><b>로그인을 해주세요.</b></span><br>',

       buttons: [{
           text: '나중에 하기',
           type: 'button-ilbang',
           onTap: function(){
             $ionicHistory.goBack();
           }
       },{
         text: '로그인 하기',
         type: 'button-ilbang',
         onTap: function(){
           $state.go("login");
         }
       }]
     });
   } else {
     $scope.items = [];
     $scope.allPost = 0;
     $scope.loadData();

    }







     $scope.asyncGreet =  function() {
       setTimeout(function() {
             var rateYo=function(){
                for(var i=0; i<$scope.items.length; i++){
                  $("#rateYo1"+(i)).rateYo({
                    rating: $scope.items[i].review_score,
                    readOnly: true,
                    starWidth:'17px'
                  });
                }

             }
             rateYo();
       }, 1000);
     }

     $scope.checkItem = function(review_no, review_title, reiview_content, review_score){
          var myData = {
            uid : $scope.uid
          }

          $http({
              method: 'POST',
              url: 'http://il-bang.com/ilbang_pc/ionic/http/reviewDeleteItemCheck.php',
              data: $httpParamSerializerJQLike(myData),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (data, status, headers, config) {
            console.log(data);
             if(data == 0 || data == null || data == 'null'){
                //아이템 0개
                  var confirmPopup = $ionicPopup.confirm({
                    cssClass: 'readItemPop',
                    title: '<h4 class="">악평 지우기 1회 서비스</h4>',
                    template:'<ul class="popupUl"><li><p class="di popupTitle">상품이름 :</p><p class="di">악평 지우기 1회 이용권</p></li><li><p class="di popupTitle">금액</p><p class="di"><span class="assertive bold">1,000원</span></p></li></ul>',
                    buttons: [{
                      text: '구매하기',
                      type: 'button-default',
                      onTap: function() {
                       $state.go('itemReview');
                      }
                    },{
                      text: '취소',
                      type: 'button-default'
                    }]
                  });

             } else if(data > 0){
               //아이템 있음 사용
               var confirmPopup1 = $ionicPopup.confirm({
                 cssClass: 'readItemPop',
                 title: '<h4 class="">악평 지우기 1회 서비스</h4>',
                 template:
                     '<ul class="popupUl">'+
                         '<li>'+
                             '<p class="di popupTitle">상품이름 :</p>' +
                             '<p class="di"><span class="assertive bold">악평 지우기 1회</span></p>'+
                         '</li>' +
                         '<li>'+
                             '<p class="di popupTitle">금액 :</p>'+
                             '<p class="di"><span class="assertive bold">악평 지우기 아이템 1회 차감</span></p>'+
                         '</li>'+
                         '<li>'+
                             '<p class="di popupTitle">채용공고 :</p>'+
                             '<p class="di"><span class="assertive bold">'+review_title+'</span></p>'+
                         '</li>'+
                         '<li>'+
                             '<p class="di popupTitle">평가 :</p>'+
                             '<p class="di"><span class="assertive bold">'+review_score+'</span></p>'+
                         '</li>'+
                         '<li>'+
                             '<p class="di popupTitle">내용 :</p>'+
                             '<p class="di"><span class="assertive bold">'+reiview_content+'</span></p>'+
                         '</li>'+
                         '<li>'+
                             '<p class="di popupTitle">아이템 갯수 :</p>'+
                             '<p class="di"><span class="assertive bold">'+data+'</span></p>'+
                         '</li>'+
                     '</ul>',
                 buttons: [{
                   text: '사용하기',
                   type: 'button-default',
                   onTap: function() {
                       var itemUseData ={
                          uid: $scope.uid,
                          no: review_no,
                          kind: $scope.kind,
                          device: device.platform

                       };
                       $http({
                            method: 'POST',
                            url: 'http://il-bang.com/ilbang_pc/ionic/http/deleteReview.php',
                            data: $httpParamSerializerJQLike(itemUseData),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                       }).success(function (data, status, headers, config) {
                         console.log(data);
                         if(data == "fail"){
                           $scope.alert("아이템 사용 실패");
                         }else if(data == "ok"){
                           $scope.items = [];
                           $scope.allPost = 0;
                           $scope.alert("아이템 사용!");
                           $scope.loadData();
                         }
                       }).error(function (data, status, headers, config) {
                           $scope.alert(data);
                       });
                    }
                 },{
                   text: '취소',
                   type: 'button-default',
                }]

               });


             }else{
               //통신오류 등
               $scope.alert(data);

             }
          }).error(function (data, status, headers, config) {

          });
     }
})
