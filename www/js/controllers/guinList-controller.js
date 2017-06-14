angular.module('guinList-controller', ["checklist-model"])
.controller('guinListCtrl', function( $state, $localstorage, $scope, $ionicPopover, $http, $httpParamSerializerJQLike, $ionicScrollDelegate,$ionicPopup,$ionicModal,$rootScope, $ionicPlatform,$ionicScrollDelegate) {



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
  $scope.alert = function(data){
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>'+data+'</b></span><br>',

      buttons: [{
        text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
        type: 'button-default',
        onTap: function(){
          $scope.backModal();
        }
      }]

    });

  }
  $scope.state = 1;
  $scope.page =0;

  //이력서 상세보기
  $scope.obstacle="";
  $scope.no="";
  $scope.work_2nd_nm = "";
  $scope.content="";
  $scope.ruid="";
  $scope.title="";
  $scope.area_1st_nm="";
  $scope.area_2nd_nm="";
  $scope.work_2nd_nm="";
  $scope.career="";
  $scope.pay="";
  $scope.phone="";
  $scope.email="";
  $scope.name="";
  $scope.age="";
  $scope.sex="";
  $scope.time="";
  $scope.score="";
  $scope.dates="";
  $scope.doGuinDate = [];


  //평가보기
  $scope.allPost = "";
  $scope.itemss = [];


  $ionicModal.fromTemplateUrl('templates/guin/view/tab1-modal.html', {
    id:1,
    scope: $scope,
    cache: false,
    animation: 'slide-in-right'
  }).then(function(modal) {
    $scope.viewResume = modal;
  });

  // 평가보기 기능 아코디언처럼
  $scope.showEstimate = function(){
      $(".sect1").hide();
      $(".sect2").show();
      $scope.state = 2;
      $ionicScrollDelegate.$getByHandle('guinModalDetail').scrollTop(true);

  }

  $scope.backModal = function(){
      if($scope.state == 2){
          $(".sect2").hide();
          $(".sect1").show();
          $scope.state=1;
      }else if($scope.state == 1){
          $scope.doGuinDate = null;
          $scope.viewResume.hide();

      }
  }

    $scope.items = [];
    var siId;
    var guId;
    $scope.showSi = false;
    $scope.showGu = false;
    $scope.guList = [];
    $scope.siNo;
    $scope.areaCd = '';
    $scope.workCd = '';
    $scope.guNo;
    $scope.siName="시";
    $scope.guName="구";
    $scope.ilbangName = "직종";
    $scope.showIlbangList = false;

    $scope.getGujikList = function (){
      $scope.page = 1;
      var listParam = {
        page: $scope.page,
        areaCd: $scope.areaCd,
        workCd: $scope.workCd
      }
      //alert($scope.areaCd);
      //alert(JSON.stringify(listParam)  );

      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/getGujikList.php',
          data: $httpParamSerializerJQLike(listParam),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
          // handle success things
          $scope.items = [];
          $scope.items = data.listData;
          //$scope.items.push(data.listData[0]);

          //$scope.items = data.listData;
          $scope.noMoreItemsAvailable = false;

          if (data.paging.page >= data.paging.allPage ) {
             $scope.noMoreItemsAvailable = true;
          }

          $scope.$broadcast('scroll.infiniteScrollComplete');
          //$scope.$broadcast('scroll.infiniteScrollComplete');
      }).error(function (data, status, headers, config) {
          // handle error things
      });
    }

    $scope.guButton = function() {
      $scope.showSi = false;
      $scope.showGu = ! $scope.showGu;
    }

    $scope.siSelect = function(value,name) {
      $scope.showSi = false;
      //alert(value);
      $scope.siName = name;
      $scope.areaCd = value;
      siID=value;
      $scope.siNo = value;

      var myData = {
        siNo: $scope.siNo
      }

      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/getGuList.php',
          data: $httpParamSerializerJQLike(myData),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {

          if($scope.siNo == "10000"){
            $scope.guList = [];
            $scope.guName = "구";
          } else {
            $scope.guList = [{guNo:$scope.areaCd, guName:"전체"}];
            $scope.guList = $scope.guList.concat(data.listData);
          }
      }).error(function (data, status, headers, config) {
          // handle error things
      });

      $scope.getGujikList();

      $scope.showGu = true;
    }

    $scope.guSelect = function(value,name) {
      $scope.showSi = false;
      guId=value;

      $scope.guName=name;


      $scope.areaCd  = value;
      if(value=="10000") $scope.areaCd  = ''; // 전체


      $scope.getGujikList();


      $scope.showGu = false;
    }

    $scope.siButton = function() {
      $scope.showSi = !$scope.showSi;
      siId="";
      guId="";
      $scope.showGu = false;
    }

    $scope.ilbangButton = function() {
      $scope.showIlbangList = !$scope.showIlbangList;
    }

    $scope.ilbangSelect = function (ilbangCd, ilbangName){
      $scope.showIlbangList = false;
      $scope.ilbangName = ilbangName;


      if (ilbangCd == '8000') {  // 전체
        $scope.workCd = '';
      } else {
        $scope.workCd = ilbangCd;
      }

      $scope.getGujikList();
    }

    $scope.siList=[
      {number: '10000', value:'전국'},
      {number: '1'  ,  value:'서울특별시'},
      {number: '907',  value:'인천광역시'},
      {number: '1164', value:'광주광역시'},
      {number: '1420', value:'대전광역시'},
      {number: '1631', value:'대구광역시'},
      {number: '1923', value:'부산광역시'},
      {number: '2314', value:'울산광역시'},
      {number: '2422', value:'경기도'},
      {number: '3312', value:'강원도'},
      {number: '3641', value:'충청남도'},
      {number: '3950', value:'충청북도'},
      {number: '4219', value:'전라남도'},
      {number: '4687', value:'전라북도'},
      {number: '5128', value:'경상남도'},
      {number: '5709', value:'경상북도'},
      {number: '6296', value:'제주특별자치도'},
      {number: '7335', value:'해외'},
      {number: '7700', value:'세종특별자치시'}
      ];

    $scope.ilbangList=[
      {number: '8000', value:'전체'},
      {number: '8001', value:'건설일방'},
      {number: '8002', value:'전문일방'},
      {number: '8003', value:'배달일방'},
      {number: '8004', value:'간병일방'},
      {number: '8005', value:'방송일방'},
      {number: '8006', value:'사무일방'},
      {number: '8007', value:'서빙일방'},
      {number: '8008', value:'행사일방'},
      {number: '8009', value:'백화점/마트일방'},
      {number: '8010', value:'호텔일방'},
      {number: '8011', value:'농촌일방'},
      {number: '8012', value:'어촌일방'},
      {number: '8013', value:'노인일방'},
      {number: '8014', value:'가사일방'},
      {number: '8015', value:'청년일방'},
      {number: '8016', value:'기독일방'},
      {number: '8017', value:'봉사일방'},
      {number: '8018', value:'해외일방'},
      {number: '8019', value:'달인일방'},
      {number: '8020', value:'조선해양일방'},
      // {number: '8021', value:'외국인일방'},
      {number: '8022', value:'장애인일방'},
      {number: '8023', value:'파출일방'},
      {number: '8024', value:'청소일방'},
      {number: '8025', value:'홍보일방'},
      {number: '8026', value:'IT일방'},
      {number: '8027', value:'마케팅일방'},
      {number: '8028', value:'물류일방'},
      {number: '8029', value:'디자인일방'},
      {number: '8030', value:'교육일방'},
      {number: '8031', value:'회계일방'},
      {number: '8032', value:'생산일방'},
      {number: '8033', value:'서비스일방'},
      {number: '8034', value:'토목일방'},
      {number: '8035', value:'유통일방'},
      {number: '8036', value:'운수일방'},
      {number: '8037', value:'번역일방'}
      ];

    $scope.loadMore = function() {

    $scope.page = $scope.page +1;
    var myData = {
      page: $scope.page,
      areaCd: $scope.areaCd,
      workCd: $scope.workCd,
      uid: $scope.uid
    }

    //alert(JSON.stringify(myData));
    $scope.canViewList;

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/getGujikList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

        $scope.items = $scope.items.concat(data.listData);
        $scope.noMoreItemsAvailable = false;
        $scope.canViewList    = data.canViewList; // 0:기간제 아이템 잇음, 1:1회열람아이템 잇음, 2:아이템 없음. 3:로그인 안함.
        $scope.open_item_cnt  = data.open_item_cnt;



        if (data.paging.page >= data.paging.allPage) {
           $scope.noMoreItemsAvailable = true;
        }

        $scope.$broadcast('scroll.infiniteScrollComplete');
        //$scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (data, status, headers, config) {
        // handle error things
    });

  };
// <!-- ui-sref="guinViewTab1({no:{{item.no}}})" -->
$scope.viewContent = function(no){
  if($scope.state == 1){

  }else{
    $(".sect2").hide();
    $(".sect1").show();
    $scope.state =1;
  }
    $scope.dates = [];
    $scope.doGuinDate = [];
    $scope.dates = '';
    $scope.name = '';
    $scope.title = '';
    $scope.sex = '';
    $scope.age = '';
    $scope.career = '';
    $scope.obstacle = '';
    $scope.phone = '';
    $scope.email = '';

    $scope.area_1st_nm = '';
    $scope.area_2nd_nm = '';
    $scope.work_2nd_nm = '';
    $scope.time = '';
    $scope.pay = '';
    $scope.content = '';
    $scope.no = '';
    $scope.ruid = '';

     var myData = {
       no:  no,
       uid: $scope.uid
     }
     $http({
         method: 'POST',
         url: 'http://il-bang.com/ilbang_pc/ionic/http/viewGujikInfo.php',
         data: $httpParamSerializerJQLike(myData),
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).success(function (data, status, headers, config) {
        // console.log("data::::"+JSON.stringify(data));

       $(".rateYo-guin").rateYo({
          rating: data.listData[0].avgScore,
          readOnly: true,
          starWidth: "20px"
        });
       //});
       $(".rateYo-guin").rateYo("option", "rating", data.listData[0].avgScore);
       $(".rateYo-guin").rateYo("option", "readOnly", true);

       if(data.listData[0].doGuinDate == undefined){

       }else {
         $scope.doGuinDate = data.listData[0].doGuinDate;
       }
         $scope.dates = data.listData[0].date;
         $scope.name = data.listData[0].name;
         $scope.title = data.listData[0].title;
         $scope.sex= data.listData[0].sex;
         $scope.age= data.listData[0].age;
         $scope.career= data.listData[0].career;
         $scope.obstacle= data.listData[0].obstacle;
         $scope.phone= data.listData[0].phone;
         $scope.email= data.listData[0].email;
         if($scope.email == "undefined@undefined"){
           $scope.email = "구직자가 이메일 주소를 입력하지 않았습니다.";
         }
         $scope.area_1st_nm= data.listData[0].area_1st_nm;
         $scope.area_2nd_nm= data.listData[0].area_2nd_nm;
         $scope.work_2nd_nm= data.listData[0].work_2nd_nm;
         $scope.time= data.listData[0].time;
         $scope.pay= data.listData[0].pay;
         $scope.content= data.listData[0].content;
         $scope.no= data.listData[0].no;
         $scope.ruid= data.listData[0].ruid;




         var myData1 = {
           'resume_no':  no
         }

         $http({
             method: 'POST',
             url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/viewResumeReview.php',
             data: $httpParamSerializerJQLike(myData1),
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         }).success(function (data, status, headers, config) {


           //$scope.paging.push(data.paging);
           //$scope.paging.push(data.paging);

           $scope.allPost = data.paging.allPost;
           $scope.rename = data.name;
           $scope.itemss= data.listData;

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


  $scope.putdata = no;
  $ionicScrollDelegate.$getByHandle('guinModalDetail').scrollTop(true);
  $scope.viewResume.show();

}




  $scope.buyItem = function() {
    var confirmPopup = $ionicPopup.confirm({
      cssClass: 'readItemPop',
      title: '<h4 class="">열람서비스</h4>',
      template:
      '<ul class="popupUl">'
        +'<li>'
          +'<p class="di">이력서를 열람 하기 위해서는 아이템이 필요합니다.</p>'
        +'</li>'
      +'</ul>',
      buttons: [{
        text: '구매하기',
        type: 'button-default',
        onTap: function() {
         $state.go('itemRead');
        }
      },{
        text: '취소',
        type: 'button-default',
        onTap: function() {
         return;
        }
      }]

    });
    };

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


    $scope.useOpenItem = function(no2,open_item_cnt) {
      var confirmPopup = $ionicPopup.confirm({
        cssClass: 'readItemPop',
        title: '<h4 class="">열람서비스</h4>',
        template:
        '<ul class="popupUl">'
          +'<li>'
            +'<p class="di popupTitle">상품이름 :</p>'
            +'<p class="di">이력서 열람 1회</p>'
          +'</li>'
          +'<li>'
            +'<p class="di popupTitle">남은 횟수 :</p>'
            +'<p class="di">'+open_item_cnt+'</p>'
          +'</li>'
        +'</ul>',
        buttons: [{
          text: '사용하기',
          type: 'button-default',
          onTap: function() {
           // 아이템 하나 사용 하는 http
           $scope.page = $scope.page +1;
           var myData = {
             uid: $scope.uid,
             no: no2
           }

           $scope.canViewList;

           $http({
               method: 'POST',
               url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/useOpenItem.php',
               data: $httpParamSerializerJQLike(myData),
               headers: {'Content-Type': 'application/x-www-form-urlencoded'}
           }).success(function (data, status, headers, config) {

               if (data.result == "0") {
                  noti(data.msg);
               } else if (data.result == "1") {
                 $scope.viewContent(no2);
               }

               //$scope.$broadcast('scroll.infiniteScrollComplete');
           }).error(function (data, status, headers, config) {
               // handle error things
           });
          }
        },{
          text: '취소',
          type: 'button-default',
          onTap: function() {
           return ;
          }
        }]

      });
      };



    $scope.viewResume1 = function(no2) {


      var myData = {
        uid: $scope.uid,
        no: no2
      }

      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/readingItemCheck.php',
          data: $httpParamSerializerJQLike(myData),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
        // console.log("datalog:"+JSON.stringify(data));
        if(data.name == null){
            $scope.alert("삭제된 이력서입니다.");
        }else{

            if(data.canViewList == "0"){
                $scope.viewContent(no2);
            } else if (data.canViewList == "1") { // 1회 열람 아이템 잇음.
                $scope.useOpenItem(no2,data.open_item_cnt);
            } else if (data.canViewList == "2") { // 아이템없음
                $scope.buyItem();
            } else if (data.canViewList == "3") { // 로그인 안함
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
            }
        }

      }).error(function (data, status, headers, config) {

      });
    }
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

    }

      $scope.page = 0;
      $scope.itemss = [];
      $scope.loadMore();


});
