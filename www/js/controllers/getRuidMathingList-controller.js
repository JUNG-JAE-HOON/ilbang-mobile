angular.module('getRuidMathingList-controller', [])

.controller('getRuidMathingListCtrl', function($scope,$ionicPopup,$http,$httpParamSerializerJQLike,$localstorage,$state,$ionicModal,$ionicScrollDelegate) {
  // 중하단 배너 이미지 랜덤으로 보여주는 스크립트

  $scope.alertCount = 0;
  $(".newTab").click(function(){
            if($(this).hasClass("newTab1")){
              $(".newTab").removeClass('newRedBtn');
              $(".newTab").removeClass('newWhiteBtn');
              $(".newTab1").addClass('newRedBtn');
              $(".newTab2").addClass('newWhiteBtn');


            }else{
              $(".newTab").removeClass('newRedBtn');
              $(".newTab").removeClass('newWhiteBtn');
              $(".newTab2").addClass('newRedBtn');
              $(".newTab1").addClass('newWhiteBtn');
            }
          });
  $scope.alert2 = function(data){
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>'+data+'</b></span><br>',

      buttons: [{
        text: '확인',
        type: 'button-default'
      }]
    });
  }
  $scope.alert = function() {
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
  };
  $scope.listType = 'matchingList';
  $scope.sortType = 'date'; // date/range/pay
  $scope.page = 0;
  $scope.items = [];
  $scope.selectedItem = "date";
  $scope.apply = "1";
  $scope.matchingListAllPost = 0;
  if($localstorage.get("auto")=="true"){
    $scope.ruid        = $localstorage.get("id");
    $scope.kind       = $localstorage.get("kind");
    $scope.member_no  = $localstorage.get("no");
    $scope.valid_no   = $localstorage.get("valid_no");
   }else{
     $scope.ruid        = sessionStorage.getItem("id");
     $scope.kind       = sessionStorage.getItem("kind");
     $scope.member_no  = sessionStorage.getItem("no");
     $scope.valid_no   = sessionStorage.getItem("valid_no");
   }

   if ($scope.ruid ==  undefined ) {
     $scope.noMoreItemsAvailable = true;
     $scope.alert();
     return ;
   }


  $scope.loadMore = function() {
    //$scope.alert('ㅅ');


     if($scope.listType == 'matchingList') {  // 매칭된 목록 조회

         $scope.apply="1";
         $scope.page = $scope.page +1;
         //alert($scope.page);
         var myData = {
           page : $scope.page,
           uid  : $scope.ruid,
           lat  : $localstorage.get('lat'),
           lng  : $localstorage.get('lng'),
           sortType : $scope.sortType
         }

         $http({
             method: 'POST',
             url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/getMatchingList.php',
             data: $httpParamSerializerJQLike(myData),
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).success(function (data, status, headers, config) {
             // handle success things
            //  console.log("matchingList"+JSON.stringify(data));
             $scope.items = $scope.items.concat(data.listData);
             $scope.matchingListAllPost = data.paging.allPost;
             $scope.noMoreItemsAvailable = false;

             if (data.paging.page >= data.paging.allPage) {
                $scope.noMoreItemsAvailable = true;
             }
             if(data.paging.allPost == 0){
               if($scope.alertCount == 0){
                 $scope.alert2("작성한 이력서와 매칭된 공고가 없습니다.<br>채용 공고에서 다른 일방을 확인해주세요.");
                 $scope.alertCount = 1;
               }
             }

             $scope.$broadcast('scroll.infiniteScrollComplete');

         }).error(function (data, status, headers, config) {
             // handle error things
         });

     } else {
       //myMatchingList
       $scope.apply="2";
       var myData = {
         ruid: $scope.ruid,
         lat : $localstorage.get('lat'),
         long: $localstorage.get('lng'),
         sort: $scope.selectedItem
       }

       $http({
           method: 'POST',
           url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/getRuidMatchingSort.php',
           data: $httpParamSerializerJQLike(myData),
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       }).success(function (data, status, headers, config) {
          //  console.log("mymatchingList"+JSON.stringify(data));
           $scope.items = $scope.items.concat(data.listData);
           $scope.myMatchingListAllPost = data.allPost;
           if(data.allPost ==  0){
             $scope.alert2("신청한 채용 공고가 없습니다.<br>채용 공고에서 구직 신청을 해주세요");
           }
           $scope.noMoreItemsAvailable = true;
       }).error(function (data, status, headers, config) {
           // handle error things
       });


     }

  }

  $scope.alert = function() {
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
  };


  $scope.page   = 0;
  $scope.items  = [];
  $scope.selectedItem = 'date';





   //로그인


  //지도로 넘어가는거 체크
  $scope.mapCheck = function(apply){

        if(apply=="1"){
          if($scope.matchingListAllPost>0){
              $state.go("matchingListgMap",{type:apply});
            }else{
              $scope.alert2("작성한 이력서에 매칭된 채용 공고가 없습니다.<br>이력서를 수정하거나 다시 작성을 한 후 지도를 확인해주세요.");
            }
        }else if(apply=="2"){
          if($scope.myMatchingListAllPost>0){
               $state.go("matchingListgMap",{type:apply});
            }else{
              $scope.alert2("신청한 채용 공고가 없습니다.<br>채용 공고에서 구직 신청을 한 후 지도를 확인해주세요.");
            }
        }

  }



  $ionicModal.fromTemplateUrl('templates/gujik/view/tab3.html', {
    id:1,
    scope: $scope,
    animation: 'slide-in-right'
  }).then(function(modal) {
    $scope.viewResume = modal;
  });
  // 평가보기 기능 아코디언처럼
  $scope.showEstimate = function(){
      $(".sect1").hide();
      $(".sect2").show();
      $scope.state = 2;
      $ionicScrollDelegate.$getByHandle('eeMatModalDetail').scrollTop(true);
  }
$scope.backModal = function(){
    if($scope.state == 2){
        $(".sect2").hide();
        $(".sect1").show();
        $scope.state=1;
    }else if($scope.state == 1){
        $scope.work_dates=[];
        $scope.viewResume.hide();
    }
}
$scope.reLoad = function(){
  $scope.items = [];
    $scope.loadMore();
}
$scope.goDetail = function(getNo,workDay, work_join_list_no, apply,employ_apply){
  // console.log(apply+","+employ_apply);
  if($scope.state == 1){

  }else{
    $(".sect2").hide();
    $(".sect1").show();
    $scope.state =1;
  }
  $ionicScrollDelegate.$getByHandle('eeMatModalDetail').scrollTop(true);
  $scope.work_dates = [];
  $scope.dates = [];
  var myData = {
    no:  getNo,
    uid: $scope.ruid
  }
  $http({
      method: 'POST',
      url: 'http://il-bang.com/ilbang_pc/ionic/http/viewGuinInfo.php',
      data: $httpParamSerializerJQLike(myData),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function (data, status, headers, config) {
    //  console.log(JSON.stringify(data));
      $scope.applyEmploy = employ_apply;
      $scope.applyState = apply;
      $scope.dates = data.listData[0].date;
      $scope.company = data.listData[0].company;
      $scope.manager = data.listData[0].manager;
      $scope.business = data.listData[0].business;
      $scope.sex = data.listData[0].sex;
      $scope.age_1st = data.listData[0].age_1st;
      $scope.age_2nd = data.listData[0].age_2nd;
      $scope.people_num = data.listData[0].people_num;
      $scope.career = data.listData[0].career;
      $scope.area_3rd = data.listData[0].address;
      $scope.phone = data.listData[0].phone;
      $scope.area_1st = data.listData[0].area_1st;
      $scope.area_2nd = data.listData[0].area_2nd;
      $scope.address = $scope.area_1st+" "+$scope.area_2nd+" "+$scope.area_3rd;
      $scope.euid = data.listData[0].euid;
      $scope.pay = data.listData[0].pay;
      $scope.time = data.listData[0].time;
      $scope.content = data.listData[0].content;
      $scope.number = getNo;
      $scope.title = data.listData[0].title;
      if(data.listData[0].doGujikDate == undefined){

      } else {
        $scope.work_dates = data.listData[0].doGujikDate;
      }



      if($scope.apply==2){
        $scope.day = workDay;
        $scope.join_No = work_join_list_no;
      }

      $scope.itemss = [];
      $scope.allPost = 0;
      var myData = {
        'employ_no':  getNo
      }

      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/viewEmployReview.php',
          data: $httpParamSerializerJQLike(myData),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
        $scope.itemss = $scope.itemss.concat(data.listData);
        //$scope.paging.push(data.paging);
        //$scope.paging.push(data.paging);
        $scope.allPost = data.paging.allPost;
        $scope.reName = data.name;
        $scope.noMoreItemsAvailableReview = false;

        if (data.paging.page >= data.paging.allPage) {
           $scope.noMoreItemsAvailableReview = true;
        }
        asyncGreet(data.listData);

        $scope.$broadcast('scroll.infiniteScrollComplete');
      }).error(function (data, status, headers, config) {

      });




  }).error(function (data, status, headers, config) {

  });
  $scope.viewResume.show();
};
function asyncGreet() {

      setTimeout(function() {
            var rateYo=function(){
               for(var i=0; i<$scope.itemss.length; i++){

                 $("#rateYo"+(i)).rateYo({
                   rating: $scope.itemss[i].score,
                   readOnly: true,
                   starWidth:'17px'
                 });
               }

            }
            rateYo();
      }, 1000);
    };


  $scope.alert1 = function(){
    $scope.sortType = $scope.selectedItem;
    $scope.page = 0;
    $scope.items  = [];
    $scope.loadMore();
  }
  $scope.getMatchingList = function () {
    $scope.listType = 'matchingList';
    $scope.page = 0;
    $scope.items  = [];
    $scope.loadMore();
  }
  $scope.getMymatchingList = function (){
    $scope.listType = 'myMatchingList';
    $scope.page = 0;
    $scope.items  = [];
    $scope.loadMore();
  }

  $scope.doGujik = function(work_employ_data_no, euid) {
      // console.log(euid);
      // console.log(work_employ_data_no);
      // console.log($scope.work_dates);
      if ($scope.uid == undefined ){
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
        return ;
      } else if (euid == $scope.uid) {
        $scope.alert('자신의 채용공고에 구직신청 할 수 없습니다.')
        return ;
      }

      var myData = {
        'work_employ_data_no':  work_employ_data_no,
        'euid' : euid,
        'ruid' : $scope.uid,
        'work_date' : $scope.work_dates
      }

      //alert(JSON.stringify(myData));
      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/doGujik.php',
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

            var fcmData = {
              'work_employ_data_no':  work_employ_data_no,
              'euid' : euid,
              'ruid' : $scope.uid,
              'work_date' : $scope.work_dates
            }

            //alert(JSON.stringify(myData));
            $http({
                method: 'POST',
                url: 'http://ilbbang.com/doGujikFcm.php',
                data: $httpParamSerializerJQLike(fcmData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {


            }).error(function (data, status, headers, config) {

            });

          }
      }).error(function (data, status, headers, config) {

      });
    }

      $scope.page = 0;
      $scope.items = [];
      $scope.loadMore();
  
})
