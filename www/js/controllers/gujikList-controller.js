

angular.module('gujikList-controller',["checklist-model"])

//
//
// .controller('GujikListCtrl', function($scope, $http, $httpParamSerializerJQLike, $ionicScrollDelegate) {
//
// })
//




.controller('gujikListCtrl', function($scope, $http, $httpParamSerializerJQLike, $ionicScrollDelegate,$ionicModal,$localstorage,$stateParams,$ionicPopup) {
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

  $scope.param1 = $stateParams.no;
  $scope.state =1;
  $scope.company = "";
  $scope.manager = "";
  $scope.business = "";
  $scope.sex = "";
  $scope.age_1st = "";
  $scope.age_2nd = "";
  $scope.people_num = "";
  $scope.career = "";
  $scope.address = "";
  $scope.phone = "";
  $scope.itemss = [];
  $scope.work_dates =[];

  $ionicModal.fromTemplateUrl('templates/gujik/view/tab1-modal.html', {
    id:1,
    scope: $scope,
    cache: false,
    animation: 'animated fadeInUp'
  }).then(function(modal) {
    $scope.viewResume = modal;
  });
  // 평가보기 기능 아코디언처럼
$scope.showEstimate = function(){
    $(".sect1").hide();
    $(".sect2").show();
    $scope.state = 2;
    $ionicScrollDelegate.$getByHandle('gujikModalDetail').scrollTop(true);
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

    //alert('ㅇ');
    $scope.page =0;
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


  $scope.msgAlert = function(msg) {
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


$scope.goDetail = function(getNo){
  if($scope.state == 1){

  }else{
    $(".sect2").hide();
    $(".sect1").show();
    $scope.state =1;
  }
  $ionicScrollDelegate.$getByHandle('gujikModalDetail').scrollTop(true);
  $scope.work_dates = [];
  $scope.dates = [];
  var myData = {
    no:  getNo,
    uid: $scope.uid
  }

  $http({
      method: 'POST',
      url: 'http://il-bang.com/ilbang_pc/ionic/http/viewGuinInfo.php',
      data: $httpParamSerializerJQLike(myData),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function (data, status, headers, config) {
      //alert(JSON.stringify(data));
      $scope.alertMsg=data.msg;
      //alert(data.listData[0].avgScore);

      //$scope.$on('modal.shown', function() {
      $(".rateYo-gujik").rateYo({
         rating: data.listData[0].avgScore,
         starWidth: "20px",
         readOnly: true
       });
      //});
      $(".rateYo-gujik").rateYo("option", "rating", data.listData[0].avgScore);
      $(".rateYo-gujik").rateYo("option", "readOnly", true);
      //alert($(".rateYo-gujik").rateYo("option", "rating"));
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
      $scope.title = data.listData[0].title;
      $scope.number = getNo;

      var titleLength=$scope.company.length;

      if(titleLength>15){
        $(".title-length").css("font-size","18px");
      }else{
        $(".title-length").css("font-size","24px");
      }
      var manageLength=$scope.manager.length;
      if(manageLength>7){
        $(".manage-length").css("font-size","12px");
      }else{
        $(".manage-length").css("font-size","14px");
      }
      if(data.listData[0].doGujikDate == ''){
        $scope.phone = "전화번호는 구직 신청 후 공개됩니다.";
      }else {
        if(data.listData[0].doGujikDate != '' && data.listData[0].doGujikDate != 'null' && data.listData[0].doGujikDate != null ){
          $scope.work_dates = data.listData[0].doGujikDate;
        }
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
    $scope.getGujikList = function (){
      $scope.page = 1;
      var listParam = {
        page: $scope.page,
        areaCd: $scope.areaCd,
        workCd: $scope.workCd
      }
      //console.log(JSON.stringify(listParam));

      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/getGuinList.php',
          data: $httpParamSerializerJQLike(listParam),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
          // handle success things
          $scope.items = [];
          $scope.items = data.listData;
        //  console.log(JSON.stringify(data));
          //$scope.items.push(data.listData[0]);


          $scope.noMoreItemsAvailable = false;

          if (data.paging.page == data.paging.allPage) {
             $scope.noMoreItemsAvailable = true;
          }

          $scope.$broadcast('scroll.infiniteScrollComplete');
          //$scope.$broadcast('scroll.infiniteScrollComplete');
      }).error(function (data, status, headers, config) {
          // handle error things
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
      };

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

      //alert($scope.siNo);
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
          $scope.guName="구";
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
      {number: '8021', value:'외국인일방'},
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
      workCd: $scope.workCd
    }

    //  alert(J SON.stringify(myData))

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/getGuinList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        // handle success things
        //$scope.items = data.listData;
        //$scope.items.push(data.listData[0]);

        $scope.items = $scope.items.concat(data.listData);
        $scope.noMoreItemsAvailable = false;
        //alert(data.paging.page );
        //alert(data.paging.allPage);
        if (data.paging.page >= data.paging.allPage) {
           $scope.noMoreItemsAvailable = true;
        }
        if($scope.param1!=undefined && $scope.param1 != ''){
//          console.log($scope.param1);
          $scope.goDetail($scope.param1);
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
        //$scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (data, status, headers, config) {
        // handle error things
    });

  };

  $scope.page = 0;
  $scope.itemss = [];
  $scope.loadMore();


})

.controller('MapCtrl', function($scope, $ionicLoading, $http,$compile,$stateParams,$localstorage,$httpParamSerializerJQLike,$state) {

  // console.log($stateParams.page);
   $scope.type=$stateParams.type;

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


   if($scope.page==0){
     $scope.page=1;
   }
   if($scope.type==2){
     var myData = {
        ruid: $scope.ruid
     }
  // alert(JSON.stringify(myData));
     $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/getRuidMatchingAllList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).success(function (data, status, headers, config) {
        //  console.log(JSON.stringify(data));
        //  console.log(JSON.stringify(data));
        loadIlbangList(data.listData);

     }).error(function (data, status, headers, config) {
        // handle error things
     });
  }else if($scope.type==1){
    var myData = {
       ruid: $scope.ruid
    }
  // alert(JSON.stringify(myData));
    $http({
       method: 'POST',
       url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/getMatchingAllList.php',
       data: $httpParamSerializerJQLike(myData),
       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
       //  console.log(JSON.stringify(data));
       //  console.log(JSON.stringify(data));
       loadIlbangList(data.listData);

    }).error(function (data, status, headers, config) {
       // handle error things
    });

  }



  var lat =37.5615367;
  var lng = 126.9795475;

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var infowindow = new daum.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map_update'), // 지도를 표시할 div
    mapOption = {
        // center: new daum.maps.LatLng(lat, lng), // 지도의 중심좌표
         center: new daum.maps.LatLng(lat, lng),
        level: 5 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map_update = new daum.maps.Map(mapContainer, mapOption);





// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function loadIlbangList (data){


      //console.log(JSON.stringify(data));

      var bounds = new daum.maps.LatLngBounds();

      for (var i=0; i<data.length; i++ ){

        // alert(data.no[i]+'='+data.subject[i]+'='+data.lat[i]+'='+data.lng[i]);
        if(data[i].lat !=""){
        //console.log(data[i].work_join_list_no+","+data[i].lat+","+data[i].lng);
         displayMarker(data[i].work_join_list_no,data[i].title,data[i].lat, data[i].lng, data[i].company,data[i].work_2nd_nm, data[i].area_2nd_nm, data[i].pay);
           bounds.extend(new daum.maps.LatLng(data[i].lat, data[i].lng));
         }else{
           bounds.extend(new daum.maps.LatLng(lat, lng));
         }

      }
      map_update.setBounds(bounds);



}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(no,title,lat,lng,company,work, address2, pay) {
  var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
    imageSize = new daum.maps.Size(0,0), // 마커이미지의 크기입니다
    imageOprion = {offset: new daum.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOprion),
    markerPosition = new daum.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

  var marker = new daum.maps.Marker({
    position: new daum.maps.LatLng(lat, lng),
    image: markerImage // 마커이미지 설정
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map_update);
  if( work.length == 4 ){
    var cate=work.substring(0,2);
  }else if( work.length == 5 ){
    var cate = work.substring(0,3);
  }else if( work.length == 6 ){
    var cate = work.substring(0,4);
  }else if( work.length == 8 ){
    var cate = work.substring(0,6);
  }else{
    var cate = work;
  }
  // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

  var content = '<div class="customoverlay">' +
      '<span class="test1 di" target="_blank" c;ass="di">' +
      '<span class="title di">'+cate+'</span>'+
      '</span>' +
      '<span class="test2 di" target="_blank" c;ass="di">' +
      '<span class="cont di">'+company+'</span>'+
      '</span>' +
      '</div>';

  // 커스텀 오버레이가 표시될 위치입니다.
  var position = new daum.maps.LatLng(lat-0.0002, lng);

  // 커스텀 오버레이를 생성합니다
  var customOverlay = new daum.maps.CustomOverlay({
      map: map_update,
      position: position,
      content: content,
      yAnchor: 1
  });
//
//     // 마커를 생성하고 지도에 표시합니다
//     var marker = new daum.maps.Marker({
//         map: map_update,
//         position: new daum.maps.LatLng(lat, lng)
//     });
//
//     // 마커에 클릭이벤트를 등록합니다
//     daum.maps.event.addListener(marker, 'click', function() {
//         // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
//         //infowindow.setContent('<a class="mapTooltip" href="../job/form05.php?no='+no+'"><span class="di PlTlt">'+ no +'</span>'+title+'<br><span class="di plInfo">'+lng+'<br></span></a>');
//         infowindow.setContent('<a class="mapTooltip" href="http://il-bang.com/ilbang_pc/form05.php?no='+no+'"><span class="di PlTlt" style="padding-left:10px; width:90%">'+ title +'</span><br><span class="di plComp" style="padding-left:10px">상호:'+company+'</span> <br><span class="di plPay" style="padding-left:10px">일당:'+pay+'</span> <br><span class="di plAddr" style="padding-left:10px">주소:'+address1+' '+address2+'</span></a>');
//         infowindow.open(map_update, marker);
//
//     });
}
// 정재훈

// 정재훈
// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
searchAddrFromCoords(map_update.getCenter(), displayCenterInfo);



// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
daum.maps.event.addListener(map_update, 'idle', function() {
    searchAddrFromCoords(map_update.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    // geocoder.coord2addr(coords, callback);
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    // geocoder.coord2detailaddr(coords, callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(status, result) {
    if (status === daum.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');
        //infoDiv.innerHTML = result[0].fullName;
    }
}


})

.controller('gujikCtrl', function($scope,$ionicPopup, $localstorage, $state) {
  // 팝업

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
      // 팝업

    $scope.gujikCheck = function() {
        if($scope.kind=="company"){
            $scope.alert('일반 회원만 이용할 수 있습니다.');
        }else{
            $state.go("eeTabs.eeTab1");
        }
    }
})
