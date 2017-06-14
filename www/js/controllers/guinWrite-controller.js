angular.module('guinWrite-controller', ["checklist-model"])

.controller('GuinFormCtrl', function($scope,$ionicPopup, $ionicModal,$timeout,$http,$httpParamSerializerJQLike,ionicDatePicker, $localstorage,$state,$location,$ionicHistory) {
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
   $scope.alertCount = 0;
   $scope.cmpInfoInsrtYn = false;
   var myData =  {
     member_no   : $scope.member_no
   }

   $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/checkCmpInfoInsertYn.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

      if (data.result == "1"){
        $scope.cmpInfoInsrtYn = true;
        console.log(data.msg);
      } else if (data.result == "0") {
        $scope.cmpInfoInsrtYn = false;
        console.log(data.msg);
      }
    }).error(function (data, status, headers, config) {
        // handle error things
    });

  //성공 메세지 모달 닫기

  $scope.checkLogin = function(data){
    if($scope.uid != null && $scope.uid != 'null' && $scope.uid != undefined){
        if(data=='guin'){
            $state.go("guin");
        }else if(data == 'add-info'){
            $state.go("add-info");
        }else if(data == 'urgentSlct'){
            $state.go("urgentSlct");
        }
    }else{
        $scope.loginAlert();
    }
  }
$scope.end = function(){
    $ionicHistory.goBack();
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
  };
$scope.insertAlert = function(msg) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass:'estiPop',
      title: '<h4 class="fo"><img src="im6g/cloud.png" width="15%"></h4>',
      template:'<div class="tc f12"><span><b>'+msg+'</b></span><br>',

      buttons: [{
        text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
        type: 'button-default',
        onTap: function() {

          $scope.guinForm = {};
          $scope.guinForm.work_1st = "";
          $scope.guinForm.work_2nd = "";
          $scope.guinForm.people_num = "";
          $scope.guinForm.pay = "";
          $scope.guinForm.age_1st = "";
          $scope.guinForm.age_2nd = "";
          $scope.guinForm.area_1st = "";
          $scope.guinForm.area_2nd = "";
          $scope.guinForm.career = "";
          $scope.guinForm.sex = "nothing";
          $scope.guinForm.si = "";
          $scope.guinForm.gu = "";
          $scope.guinForm.lat = "";
          $scope.guinForm.lng = "";
          $scope.guinForm.sample3_postcode = "";

          $scope.closeStep(1);
          $scope.closeStep(2);
          $scope.closeStep(3);
          $scope.removeModal();
          $state.go("erTabs.erTab2");


        }
      }]
    });
};

  $scope.urgentItem = function(close) {
    var confirmPopup = $ionicPopup.confirm({
      cssClass: 'readItemPop',
      title: '<h4 class="">긴급구인 서비스</h4>',
      template:'<ul class="popupUl"><li><p class="di popupTitle">상품이름 :</p><p class="di">1회 이용권</p></li><li><p class="di popupTitle">금액</p><p class="di"><span class="assertive bold">5,000원</span></p></li></ul>',
      buttons: [{
        text: '구매하기',
        type: 'button-default',
        onTap: function() {
          if(close == 'close'){
              $scope.emergencyCloseStep(3);
          }
         $state.go('itemUrgent');
        }
      },{
        text: '취소',
        type: 'button-default'
      }]
    });
    };
  $scope.noticeAlert = function(coment, data){
    var confirmPopup1 = $ionicPopup.confirm({
        cssClass: 'readItemPop',
        title: '<h4 class="">알림</h4>',
        template:
        '<ul class="popupUl">'+'<li>'+'<p class="di popupTitle" style="width:100%;">'+coment+'<br>'+data+'</p>'+'</li>'+'</ul>',
        buttons: [{
            text: '확인',
            type: 'button-default'

        }]
      });
    }


        //////////////////////////////////이력서 선택해서 긴급구인 사용 시작/////////////////////////////


     $scope.al = function(guinNo, guinTitle, guinWdate,guinPay,area1,area2){
       var itemCon = {
         id: $scope.uid,
         type: 'check'
       };

       $http({
            method: 'POST',
            url: 'http://il-bang.com/ilbang_pc/ionic/http/emergencyItemCheck.php',
            data: $httpParamSerializerJQLike(itemCon),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {

          if ((data.result == "0")||(data.result == null)||(data.result == "null")){
            // 아이템 0개
            $scope.urgentItem("no");

          } else if (data.result >"0") {
            //긴급구인 아이템이 0개 이상일때
            var confirmPopup1 = $ionicPopup.confirm({
              cssClass: 'readItemPop',
              title: '<h4 class="">긴급구인 서비스</h4>',
              template:
                  '<ul class="popupUl">'+
                      '<li>'+
                          '<p class="di popupTitle">상품이름 :</p>' +
                          '<p class="di"><span class="assertive bold">긴급구인 1회</span></p>'+
                      '</li>' +
                      '<li>'+
                          '<p class="di popupTitle">금액 :</p>'+
                          '<p class="di"><span class="assertive bold">긴급구인 아이템 1회 차감</span></p>'+
                      '</li>'+
                      '<li>'+
                          '<p class="di popupTitle">이력서 :</p>'+
                          '<p class="di"><span class="assertive bold">'+guinTitle+'</span></p>'+
                      '</li>'+
                      '<li>'+
                          '<p class="di popupTitle">날짜 :</p>'+
                          '<p class="di"><span class="assertive bold">'+guinWdate+'</span></p>'+
                      '</li>'+
                      '<li>'+
                          '<p class="di popupTitle">일당 :</p>'+
                          '<p class="di"><span class="assertive bold">'+guinPay+'</span></p>'+
                      '</li>'+
                          '<p class="di popupTitle">아이템 갯수 :</p>'+
                          '<p class="di"><span class="assertive bold">'+data.result+'</span></p>'+
                      '</li>'+
                  '</ul>',
              buttons: [{
                text: '사용하기',
                type: 'button-default',
                onTap: function() {
                    var itemUseData ={
                       id: $scope.uid,
                       type: "itemConsume",
                       state: 'change',
                       no: guinNo
                    };
                    $http({
                         method: 'POST',
                         url: 'http://il-bang.com/ilbang_pc/ionic/http/emergencyItemCheck.php',
                         data: $httpParamSerializerJQLike(itemUseData),
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).success(function (data, status, headers, config) {

                      if(data.result == "data update success"){


                        var pushData = {
                          latitude   : data.lat,
                          longitude  : data.lng,
                          id         : $scope.uid,
                          no         : guinNo,
                          name       : guinTitle,
                          pay        : guinPay,
                          locate     : area1+" "+area2

                        }
                        $http({
                            method: 'POST',
                            url: 'http://ilbbang.com/fcm.php',
                            data: $httpParamSerializerJQLike(pushData),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).success(function (data, status, headers, config) {
                          var confirmPopup = $ionicPopup.confirm({
                              cssClass: 'readItemPop',
                              title: '<h4 class="">긴급구인 알림</h4>',
                              template:
                              '<ul class="popupUl">'+'<li>'+'<p class="di popupTitle" style="width:100%;">'+'긴급구인 아이템을 사용하셨습니다.<br>주변 구직자에게 알림 메세지 발송과<br>"모든 채용 공고" 상단에 노출됩니다.'+'</p>'+'</li>'+'</ul>',
                              buttons: [{
                                  text: '확인',
                                  type: 'button-default',
                                  onTap: function(){
                                    $state.go("erTabs.erTab2");

                                  }
                              }]
                            });

                        }).error(function (data, status, headers, config) {

                        });


                      }else if(data.result == "data update fail"){
                        noticeAlert("긴급구인 아이템 사용 실패", data.result);

                      }else if(data.result == "아이디 없음"){
                        noticeAlert("아이디 없음", data.result);
                      }
                    }).error(function (data, status, headers, config) {
                        noticeAlert("", data);
                    });
                 }
              },{
                text: '취소',
                type: 'button-default',
             }]

            });
          } else if (data.result == "아이디 없음"){
            //아이템 확인할때
              noticeAlert("아이디 없음", data.result);
          }
        }).error(function (data, status, headers, config) {
            // handle error things
        });
     };


     //////////////////////////////////이력서 선택해서 긴급구인 사용 끝/////////////////////////////


  // 팝업
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

  $scope.checkAge = function(){
    if ($scope.guinForm.age_1st == ""){
      $scope.guinForm.age_2nd = "";
      $scope.alert("최소 연령을 선택하세요.");
    } else if ($scope.guinForm.age_1st > $scope.guinForm.age_2nd ){
        $scope.guinForm.age_2nd = "";
        $scope.alert("최소 연령 보다 작은 나이를 선택 할 수 없습니다.");
    }
  }



  $scope.unique =  function(array) {

	var result = [];
	$.each(array, function(index, element) {     // 배열의 원소수만큼 반복
		if ($.inArray(element, result) == -1) {  // result 에서 값을 찾는다.  //값이 없을경우(-1)
			result.push(element);                // result 배열에 값을 넣는다.
		}
	 });
	return result;
  }

  $scope.selectDelegate = function(guin_no) {
      var myData =  {
        no    : guin_no,
        uid   : $scope.uid

      }

      $http({
           method: 'POST',
           url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/selectDelegate.php',
           data: $httpParamSerializerJQLike(myData),
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       }).success(function (data, status, headers, config) {

         if (data.result == "0"){
           $scope.alert(data.msg);
           //alert(data.sql);
         } else if (data.result == "1") {
           $scope.alert(data.msg);
           $scope.page = 0;
           $scope.myGuinList = [];
           $scope.loadMore();
         }
           //$scope.$broadcast('scroll.infiniteScrollComplete');
       }).error(function (data, status, headers, config) {
           // handle error things
       });
  }

  $scope.delGuinForm = function(guin_no) {

    var myData =  {
      no    : guin_no
    }

    $http({
         method: 'POST',
         url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/delGuinForm.php',
         data: $httpParamSerializerJQLike(myData),
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).success(function (data, status, headers, config) {

       if (data.result == "0"){
         $scope.alert(data.msg);
         //alert(data.sql);
       } else if (data.result == "1") {
         $scope.alert(data.msg);
         $scope.page = 0;
         $scope.myGuinList = [];
         $scope.loadMore();
       }
         //$scope.$broadcast('scroll.infiniteScrollComplete');
     }).error(function (data, status, headers, config) {
         // handle error things
     });

  };

  $scope.jusoSearch = function() {
    document.getElementById('daumIframe').src += '';
    $scope.juso_show = true;
    var setInter = setInterval(function() {
      Api.getApiData()
      .then(function(result) {
        console.log('Got some data:'+result);
        // $scope.address = result.data;
        // $scope.juso_show = false;
      })
    },1000);

  }
  // 팝업
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
$scope.loginAlert = function(){
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


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  var formStep=['templates/guin/form/step1.html','templates/guin/form/step2.html','templates/guin/form/step3.html'];

  if ($scope.uid ==  undefined ) {
    $scope.noMoreItemsAvailable = true;
    // alert('로그인 하세요.');
    $scope.loginAlert();
    return ;
  }

  $scope.selboxData = {
        work_1st: [ {no:"", list_name:'특성별'}
                  ,{no:"8001", list_name:'건설일방'}
                  ,{no:"8033", list_name:'서비스일방'}
                  ,{no:"8007", list_name:'서빙일방'}
                  ,{no:"8009", list_name:'백화점/마트일방'}
                  ,{no:"8023", list_name:'파출일방'}
                  ,{no:"8028", list_name:'물류일방'}
                  ,{no:"8035", list_name:'유통일방'}
                  ,{no:"8036", list_name:'운수일방'}
                  ,{no:"8002", list_name:'전문일방'}
                  ,{no:"8026", list_name:'IT일방'}
                  ,{no:"8003", list_name:'배달일방'}
                  ,{no:"8027", list_name:'마케팅일방'}
                  ,{no:"8008", list_name:'행사일방'}
                  ,{no:"8014", list_name:'가사일방'}
                  ,{no:"8024", list_name:'청소일방'}
                  ,{no:"8030", list_name:'교육일방'}
                  ,{no:"8032", list_name:'생산일방'}
                  ,{no:"8017", list_name:'봉사일방'}
                  ,{no:"8011", list_name:'농촌일방'}
                  ,{no:"8029", list_name:'디자인일방'}
                  ,{no:"8010", list_name:'호텔일방'}
                  ,{no:"8020", list_name:'조선해양일방'}
                  ,{no:"8005", list_name:'방송일방'}
                  ,{no:"8031", list_name:'회계일방'}
                  // ,{no:"8021", list_name:'외국인일방'}
                  ,{no:"8038", list_name:'요양일방'}
                  ,{no:"8025", list_name:'홍보일방'}
                  ,{no:"8004", list_name:'간병일방'}],
        area_1st: [  {no:""  , list_name:'시'}
                    ,{no:"1"  , list_name:'서울'}
                    ,{no:"907", list_name:'인천'}
                    ,{no:"1164", list_name:'광주'}
                    ,{no:"1420", list_name:'대전'}
                    ,{no:"7700", list_name:'세종'}
                    ,{no:"1631", list_name:'대구'}
                    ,{no:"1923", list_name:'부산'}
                    ,{no:"2314", list_name:'울산'}
                    ,{no:"2422", list_name:'경기'}
                    ,{no:"3312", list_name:'강원'}
                    ,{no:"3641", list_name:'충남'}
                    ,{no:"3950", list_name:'충북'}
                    ,{no:"4219", list_name:'전남'}
                    ,{no:"4687", list_name:'전북'}
                    ,{no:"5128", list_name:'경남'}
                    ,{no:"5709", list_name:'경북'}
                    ,{no:"6296", list_name:'제주'}
                    ,{no:"7335", list_name:'해외'}
                  ],

        work_2nd: [
                ],
        //area_1st: [ {no:"", list_name:'시'}],
        area_2nd: [ {no:"", list_name:'구'}],


      people_num: [ {no:"", list_name:'모집인원'},
                    {no:"1", list_name:'1명'},
                    {no:"2", list_name:'2명'},
                    {no:"3", list_name:'3명'},
                    {no:"4", list_name:'4명'},
                    {no:"5", list_name:'5명'},
                    {no:"6", list_name:'6명'},
                    {no:"7", list_name:'7명'},
                    {no:"8", list_name:'8명'},
                    {no:"9", list_name:'9명'},
                    {no:"10", list_name:'10명'}
                  ],
             pay: [ {no:"", list_name:'일급'}
                  ],
         age_1st: [ {no:"", list_name:'최소연령선택'},
                    {no:"20", list_name:'20대 부터'},
                    {no:"30", list_name:'30대 부터'},
                    {no:"40", list_name:'40대 부터'},
                    {no:"50", list_name:'50대 부터'},
                    {no:"60", list_name:'60대 부터'},
                    {no:"70", list_name:'70대 부터'},
                    {no:"80", list_name:'80대 부터'},
                    {no:"90", list_name:'90대 부터'}
                    ],

         age_2nd: [ {no:"", list_name:'최대연령선택'},
                    {no:"30", list_name:'30대 까지'},
                    {no:"40", list_name:'40대 까지'},
                    {no:"50", list_name:'50대 까지'},
                    {no:"60", list_name:'60대 까지'},
                    {no:"70", list_name:'70대 까지'},
                    {no:"80", list_name:'80대 까지'},
                    {no:"90", list_name:'90대 까지'}
                  ],
         career : [ {no:""  , list_name:'필요경력'},
                    {no:"0" , list_name:'제한없음'},
                    {no:"1" , list_name:'1년 미만'},
                    {no:"3" , list_name:'3년 미만'},
                    {no:"5" , list_name:'5년 미만'},
                    {no:"6" , list_name:'5년 이상'}
         ]


  }

  $scope.myGuinList = [];
  $scope.guinForm = {};
  $scope.guinForm.work_1st = "";
  $scope.guinForm.work_2nd = "";
  $scope.guinForm.people_num = "";
  $scope.guinForm.pay = "";
  $scope.guinForm.age_1st = "";
  $scope.guinForm.age_2nd = "";
  $scope.guinForm.area_1st = "";
  $scope.guinForm.area_2nd = "";
  $scope.guinForm.career = "";
  $scope.guinForm.sex = "nothing";
  $scope.guinForm.si = "";
  $scope.guinForm.gu = "";
  $scope.guinForm.lat = "";
  $scope.guinForm.lng = "";
  $scope.guinForm.sample3_postcode = "";
  $scope.guinForm.time = "1";

  $scope.changeWork_1st = function() {
    $scope.getCategoryList('work_2nd', $scope.guinForm.work_1st, 'work_type');
  }

  $scope.changeArea_1st = function() {
    if($scope.guinForm.area_1st == "") {
      $scope.guinForm.area_2nd = "";
    }
    $scope.getCategoryList('area_2nd', $scope.guinForm.area_1st, 'area_type');
  }

  $scope.getCategoryList = function(col, parent_no, type) {


    if (col == 'work_2nd' && parent_no == "" ){
      $scope.selboxData[col] = [{no:"", list_name:'희망직종'}];
      $scope.guinForm.work_2nd = "";
      return;
    } else if (col == 'area_2nd' && parent_no == "") {
        $scope.selboxData[col] = [{no:"", list_name:'구'}];
        $scope.guinForm.area_2nd = "";
        return;
    }

    var myData = {
      'parent_no' : parent_no,
      'type'      : type
    }

   $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/getCategoryList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        if (col == 'work_1st') {
          //$scope.selboxData[col] = [{no:"", list_name:'분류'}];

        } else if (col == 'work_2nd') {
          $scope.selboxData[col] = [{no:"", list_name:'희망직종'}];
          $scope.guinForm.work_2nd = "";
        } else if (col == 'area_1st') {
          $scope.selboxData[col] = [{no:"", list_name:'시'}];
          $scope.guinForm.area_1st = "";
        } else if (col == 'area_2nd'){
          $scope.selboxData[col] = [{no:"", list_name:'구'}];
          $scope.guinForm.area_2nd = "";
        }
        if (col == 'area_2nd') {
          $scope.selboxData[col].push({no:'10001', list_name:'전체'});
        }
        $scope.selboxData[col] = $scope.selboxData[col].concat(data.listData);
        if (col == 'area_1st') {
          $scope.selboxData[col].splice($scope.selboxData[col].length-2,2);

        }
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }



  //$scope.getCategoryList ('work_1st', '0', 'work_type');
  //$scope.getCategoryList ('area_1st', '0', 'area_type');
  //$scope.getCategoryList ('work_2nd', '8000', 'work_type');


  for (var i=0; i<= 500000; i+=50000) {
    $scope.selboxData.pay.push ({'no':"'"+i+"'", 'list_name': numberWithCommas(i) });
  }

  $ionicModal.fromTemplateUrl('templates/guin/form/step1.html', {
    id:1,
    scope: $scope,
    animation: 'slide-in-right'
  }).then(function(modal) {
    $scope.modalStep1 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/guin/form/step2.html', {
    id:2,
    scope: $scope,
    animation: 'slide-in-right'
  }).then(function(modal) {
    $scope.modalStep2 = modal;
  });
  $ionicModal.fromTemplateUrl('templates/guin/form/step3.html', {
    id:3,
    scope: $scope,
    animation: 'slide-in-right'
  }).then(function(modal) {
    $scope.modalStep3 = modal;
  });
  $scope.createContact = function(u) {
    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    $scope.modal.hide();
  };



  $scope.openStep = function(index) {
    switch (index) {
      case 1:
          $scope.modalStep1.show();
        break;
      case 2:
            $scope.modalStep2.show();
          break;
      case 3:
            $scope.modalStep3.show();
          break;
    }
  };

  $scope.closeStep = function(index) {
    switch (index) {
      case 1:
          $scope.modalStep1.hide();
        break;
      case 2:
            $scope.modalStep2.hide();
          break;
      case 3:
            $scope.modalStep3.hide();
          break;
    }
  };


  String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/gi, "");
    }

  $scope.formStep1 = function(u) {

    var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    var num_check=/^[0-9]*$/

    if (u.title== undefined || String(u.title).trim() == "" ){
        $scope.alert("모집 제목을 입력해주세요.");
        $timeout(function() {
                  document.getElementById("title").focus();
        },750);
        return ;
    } else if (special_pattern.test(u.title) == true  ){
        $scope.alert("모집 제목에 특수문자는 입력할 수 없습니다.");
        $timeout(function() {
                  document.getElementById("title").select();
        },750);
        return ;

    } else if (u.company == undefined || String(u.company).trim() == "" ) {
      $scope.alert("상호 또는 성명을 입력해주세요.");
      $timeout(function() {
                document.getElementById("company").focus();
       },750);
      return ;
    } else if (special_pattern.test(u.company) == true ) {
      $scope.alert("상호 또는 성명에 특수문자는 입력할 수 없습니다.");
      $timeout(function() {
                document.getElementById("company").select();
       },750);
      return ;
    } else if (u.work_1st == "") {
      $scope.alert("특성별을 선택하세요.");
      return ;
    } else if (u.work_1st == "8030" && u.work_2nd == "") {
      $scope.alert("희망직종을 선택해 주세요.");
      return ;
    } else if (u.area_1st == "" || u.area_2nd == "") {
      $scope.alert("희망 근무 지역을 선택하세요.");
      return ;
    } else if (u.address == undefined || u.address == "" ) {
      $scope.alert("상세주소를 입력해주세요.");
      return ;
    } else if (u.manager == undefined || String(u.manager).trim() == "") {
      $scope.alert("관리자 이름을 입력해 주세요.");
      $timeout(function() {
                document.getElementById("manager").focus();
      },750);
      return ;
    } else if (special_pattern.test(u.manager) == true ) {
      $scope.alert("관리자 이름에 특수문자는 입력할 수 없습니다.");
      $timeout(function() {
                document.getElementById("manager").select();
       },750);
      return ;

    } else if (u.phone1 == undefined || String(u.phone1).trim() == "") {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      $timeout(function() {
                document.getElementById("phone1").focus();
      },750);
      return ;
    } else if (!num_check.test(u.phone1)) {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      $timeout(function() {
                document.getElementById("phone1").select();
      },750);
      return ;
    } else if (u.phone2 == undefined || String(u.phone2).trim() == "") {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      $timeout(function() {
                document.getElementById("phone2").focus();
      },750);
      return ;
    } else if (!num_check.test(u.phone2)) {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      $timeout(function() {
                document.getElementById("phone2").select();
      },750);
      return ;
    } else if (u.phone3 == undefined || String(u.phone3).trim() == "") {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      $timeout(function() {
                document.getElementById("phone3").focus();
      },750);
      return ;
     } else if (!num_check.test(u.phone3)) {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      $timeout(function() {
                document.getElementById("phone3").select();
      },750);
      return ;
    }
    $scope.guinForm.title     = u.title     ;
    $scope.guinForm.company   = u.company   ;
    $scope.guinForm.work_1st  = u.work_1st  ;
    $scope.guinForm.work_2nd  = u.work_2nd  ;
    $scope.guinForm.addresss  = u.address   ;
    $scope.guinForm.manager   = u.manager   ;
    $scope.guinForm.phone1    = u.phone1    ;
    $scope.guinForm.phone2    = u.phone2    ;
    $scope.guinForm.phone3    = u.phone3    ;
    $(".cont1").hide();
    $(".cont2").show();

    //$scope.date();
  };

  $scope.goStep3 = function(){
    if($scope.work_date == ""){
      $scope.alert("날짜를 선택해 주세요.");
      return ;
    }
    $(".cont2").hide();
    $(".cont3").show();
  }
  $scope.exitGuin = function(){
    $ionicHistory.goBack();
  }

  $scope.preGoStep1 =function(){
    $(".cont2").hide();
    $(".cont1").show();
  }
  $scope.preGoStep2 =function(){
    $(".cont3").hide();
    $(".cont2").show();
  }



  $scope.formStep1Back = function(u) {
    $scope.closeStep(2);
    $scope.openStep(1);
  };
  $scope.formStep2 = function(u) {
    //alert(typeof($scope.work_date));
    //alert($scope.work_date);
    //alert($scope.unique($scope.work_date));
    //$scope.work_date = $scope.unique($scope.work_date);
    if($scope.work_date == ""){
      $scope.alert("날짜를 선택해 주세요.");
      return ;
    }
    $scope.closeStep(2);
    $scope.openStep(3);
  };
  $scope.formStep2Back = function(u) {
    $scope.closeStep(3);
    $scope.openStep(2);
  };
  $scope.formStep3 = function(u) {
  var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;


 if (u.business== undefined || String(u.business).trim() == "" ){
   $scope.alert("담당 업무 내용을 입력해주세요.");
   $timeout(function() {
             document.getElementById("business").focus();
   },750);
   return ;
 } else if (special_pattern.test(u.business) ){
   $scope.alert("담당 업무 내용에 특수문자를 입력할 수 없습니다.");
   $timeout(function() {
             document.getElementById("business").select();
   },750);
   return ;
 } else if (u.people_num == "") {
   $scope.alert("모집인원을 선택해 주세요.");
   return ;
 } else if (u.pay == "") {
   $scope.alert("일급을 입력하세요.");
   return ;
 } else if (u.age_1st == "") {
   $scope.alert("최소연령을 선택해 주세요.");
   return ;
 } else if (u.age_2nd == "") {
   $scope.alert("최대연령을 선택해 주세요.");
   return ;
 } else if (u.career == "") {
   $scope.alert("필요경력을 선택해 주세요.");
   return ;
 } else if (u.content == undefined || String(u.content).trim() == "") {
   $scope.alert("상세 모집 내용을 입력해주세요.");
   $timeout(function() {
           document.getElementById("content").focus();
   },750);
   return ;
 } else if (special_pattern.test(u.content) ){
   $scope.alert("상세 모집 내용에 특수문자를 입력할 수 없습니다.");
   $timeout(function() {
             document.getElementById("content").select();
   },750);
   return ;
 }

 $scope.guinForm.business   = u.business   ;
 $scope.guinForm.people_num = u.people_num ;
 $scope.guinForm.pay        = u.pay        ;
 $scope.guinForm.age_1st    = u.age_1st    ;
 $scope.guinForm.age_2nd    = u.age_2nd    ;
 $scope.guinForm.career     = u.career     ;
 $scope.guinForm.content    = u.content    ;

 //alert(JSON.stringify($scope.guinForm));

 //alert(JSON.stringify($scope.guinForm));

var foreign1;
if($scope.guinForm.foreign) {
  foreign1 = 1;
}else {
  foreign1 = 0;
}
 var myData = {
     company   : $scope.guinForm.company  ,
     title     : $scope.guinForm.title    ,
     business  : $scope.guinForm.business ,
     area_1st  : $scope.guinForm.area_1st ,
     area_2nd  : $scope.guinForm.area_2nd ,
     work_1st  : $scope.guinForm.work_1st ,
     work_2nd  : $scope.guinForm.work_2nd ,
     foreign   : foreign1                 ,
     //si        : $scope.guinForm.si ,
     //gu         : $scope.gu inForm.gu ,
     age_1st   : $scope.guinForm.age_1st  ,
     age_2nd   : $scope.guinForm.age_2nd  ,
     lat       :  $localstorage.get('lat')              ,  //
     lng       :  $localstorage.get('lng')               ,  //
     sex       : $scope.guinForm.sex      ,
     career    : $scope.guinForm.career   ,
     pay       : $scope.guinForm.pay      ,
     content   : $scope.guinForm.content  ,
     people_num: $scope.guinForm.people_num,
     address   : $scope.guinForm.addresss  , //
     //address   : $scope.guinForm.sample3_address,
     time      : $scope.guinForm.time      ,  //
     member_no : $scope.member_no          ,
     valid_no  : $scope.valid_no           ,
     uid       : $scope.uid                ,
     manager   : $scope.guinForm.manager  ,
     phone    : $scope.guinForm.phone1 +'-'+ $scope.guinForm.phone2 +'-'+ $scope.guinForm.phone3,
     work_date : $scope.work_date          ,
     time   : $scope.guinForm.time
  }

 //alert(JSON.stringify(myData));
 /*
var myData = {
     title     : $scope.guinForm.title,
     company   : $scope.guinForm.company    ,
     work_1st  : $scope.guinForm.work_1st   ,
     work_2nd  : $scope.guinForm.work_2nd   ,
     address   : $scope.guinForm.addresss   ,
     manager   : $scope.guinForm.manager    ,
     phone1    : $scope.guinForm.phone1     ,
     phone2    : $scope.guinForm.phone2     ,
     phone3    : $scope.guinForm.phone3     ,
     business    : $scope.guinForm.business  ,
     people_num  : $scope.guinForm.people_num  ,
     pay         : $scope.guinForm.pay         ,
     age_1st     : $scope.guinForm.age_1st     ,
     age_2nd     : $scope.guinForm.age_2nd     ,
     areer       : $scope.guinForm.career      ,
     content     : $scope.guinForm.content
 }
 */
//alert(JSON.stringify(myData));



 $http({
     method: 'POST',
     url: 'http://il-bang.com/ilbang_pc/ionic/http/insertGuinForm.php',
     data: $httpParamSerializerJQLike(myData),
     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
 }).success(function (data, status, headers, config) {

            if (data.result == "0"){
                   noti(data.msg);
                       //alert(data.sql)  ;
            } else if (data.result == "1") {
                   noti(data.msg);
                      //alert(data.sql);
                   //
                  //  console.log("no:"+data.no);
                   var insertFcmData = {
                      uid: $scope.uid,
                      state: 'guin',
                      area_1st: $scope.guinForm.area_1st,
                      area_2nd: $scope.guinForm.area_2nd,
                      work_2nd: $scope.guinForm.work_2nd,
                      age_1st: $scope.guinForm.age_1st,
                      age_2nd: $scope.guinForm.age_2nd,
                      no:data.no
                   }
                  //  var insertFcmData = {
                  //     uid: $scope.uid,
                  //     state: 'guin',
                  //     area_1st: '1',
                  //     area_2nd: '127',
                  //     work_2nd: '8004',
                  //     age_1st: '20',
                  //     age_2nd: '30',
                  //     no:data.no
                   //
                  //  }

                    $http({
                         method: 'POST',
                         url: 'http://ilbbang.com/insertDataFcm.php',
                         data: $httpParamSerializerJQLike(insertFcmData),
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                     }).success(function (data, status, headers, config) {
                      //  console.log(data);
                     }).error(function (data, status, headers, config) {
                         // handle error things
                     });


                   $scope.guinForm = {};
                   $scope.myGuinList = [];
                   $scope.guinForm = {};
                   $scope.guinForm.work_1st = "";
                   $scope.guinForm.work_2nd = "";
                   $scope.guinForm.people_num = "";
                   $scope.guinForm.pay = "";
                   $scope.guinForm.age_1st = "";
                   $scope.guinForm.age_2nd = "";
                   $scope.guinForm.area_1st = "";
                   $scope.guinForm.area_2nd = "";
                   $scope.guinForm.career = "";
                   $scope.guinForm.sex = "nothing";
                   $scope.guinForm.si = "";
                   $scope.guinForm.gu = "";
                   $scope.guinForm.lat = "";
                   $scope.guinForm.lng = "";
                   $scope.guinForm.sample3_postcode = "";
                   $scope.work_date = "";
                  //  $scope.closeStep(1);
                  //  $scope.closeStep(2);
                  //  $scope.closeStep(3);
                  $(".cont3").hide();
                  $(".cont1").show();
                   $state.go("erTabs.erTab2");
            }
 }).error(function (data, status, headers, config) {
     // handle error things
 });

};
////////////////////    긴급구인 시작     /////////////////////
$ionicModal.fromTemplateUrl('templates/guin/form/emergency-step1.html', {
id:4,
scope: $scope,
animation: 'slide-in-right'
}).then(function(modal) {
$scope.modalEmergencyStep1 = modal;
});

$ionicModal.fromTemplateUrl('templates/guin/form/emergency-step2.html', {
id:5,
scope: $scope,
animation: 'slide-in-right'
}).then(function(modal) {
$scope.modalEmergencyStep2 = modal;
});
$ionicModal.fromTemplateUrl('templates/guin/form/emergency-step3.html', {
id:6,
scope: $scope,
animation: 'slide-in-right'
}).then(function(modal) {
$scope.modalEmergencyStep3 = modal;
});




$scope.emergencyOpenStep = function(index) {
  switch (index) {
    case 1:
        $scope.modalEmergencyStep1.show();
      break;
    case 2:
          $scope.modalEmergencyStep2.show();
        break;
    case 3:
          $scope.modalEmergencyStep3.show();
        break;
  }
};

$scope.emergencyCloseStep = function(index) {
  switch (index) {
    case 1:
        $scope.modalEmergencyStep1.hide();
      break;
    case 2:
          $scope.modalEmergencyStep2.hide();
        break;
    case 3:
          $scope.modalEmergencyStep3.hide();
        break;
  }
};




$scope.createContact1 = function(u) {
$scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
$scope.modal.hide();
};

String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/gi, "");
}

$scope.emergencyFormStep1 = function(u) {

var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
var num_check=/^[0-9]*$/

if (u.title== undefined || String(u.title).trim() == "" ){
    $scope.alert("모집 제목을 입력해주세요.");
    $timeout(function() {
              document.getElementById("title").focus();
    },750);
    return ;
} else if (special_pattern.test(u.title) == true  ){
    $scope.alert("모집 제목에 특수문자는 입력할 수 없습니다.");
    $timeout(function() {
              document.getElementById("title").select();
    },750);
    return ;

} else if (u.company == undefined || String(u.company).trim() == "" ) {
  $scope.alert("상호 또는 성명을 입력해주세요.");
  $timeout(function() {
            document.getElementById("company").focus();
   },750);
  return ;
} else if (special_pattern.test(u.company) == true ) {
  $scope.alert("상호 또는 성명에 특수문자는 입력할 수 없습니다.");
  $timeout(function() {
            document.getElementById("company").select();
   },750);
  return ;
} else if (u.work_1st == "") {
  $scope.alert("특성별을 선택해 주세요.");
  return ;
} else if (u.work_1st == "8030" && u.work_2nd == "") {
  $scope.alert("희망직종을 선택해 주세요.");
  return ;
} else if (u.area_1st == "" || u.area_2nd == "") {
  $scope.alert("희망 근무 지역을 선택하세요.");
  return ;
} else if (u.address == undefined || u.address == "" ) {
  $scope.alert("상세주소를 입력해주세요.");
  return ;
// }
// else if (u.area_1st == "") {
//   $scope.alert("시를 선택하세요.");
//   return ;
// } else if (u.area_2nd == "") {
//   $scope.alert('구를 선택하세요.');
//   return ;
} else if (u.manager == undefined || String(u.manager).trim() == "") {
  $scope.alert("관리자 이름을 입력해 주세요.");
  $timeout(function() {
            document.getElementById("manager").focus();
  },750);
  return ;
} else if (special_pattern.test(u.manager) == true ) {
  $scope.alert("관리자 이름에 특수문자는 입력할 수 없습니다.");
  $timeout(function() {
            document.getElementById("manager").select();
   },750);
  return ;

} else if (u.phone1 == undefined || String(u.phone1).trim() == "") {
  $scope.alert("전화번호를 올바르게 입력해 주세요.");
  $timeout(function() {
            document.getElementById("phone1").focus();
  },750);
  return ;
} else if (!num_check.test(u.phone1)) {
  $scope.alert("전화번호를 올바르게 입력해 주세요.");
  $timeout(function() {
            document.getElementById("phone1").select();
  },750);
  return ;
} else if (u.phone2 == undefined || String(u.phone2).trim() == "") {
  $scope.alert("전화번호를 올바르게 입력해 주세요.");
  $timeout(function() {
            document.getElementById("phone2").focus();
  },750);
  return ;
} else if (!num_check.test(u.phone2)) {
  $scope.alert("전화번호를 올바르게 입력해 주세요.");
  $timeout(function() {
            document.getElementById("phone2").select();
  },750);
  return ;
} else if (u.phone3 == undefined || String(u.phone3).trim() == "") {
  $scope.alert("전화번호를 올바르게 입력해 주세요.");
  $timeout(function() {
            document.getElementById("phone3").focus();
  },750);
  return ;
 } else if (!num_check.test(u.phone3)) {
  $scope.alert("전화번호를 올바르게 입력해 주세요.");
  $timeout(function() {
            document.getElementById("phone3").select();
  },750);
  return ;
}
$scope.guinForm.title     = u.title     ;
$scope.guinForm.company   = u.company   ;
$scope.guinForm.work_1st  = u.work_1st  ;
$scope.guinForm.work_2nd  = u.work_2nd  ;
$scope.guinForm.addresss  = u.address   ;
$scope.guinForm.manager   = u.manager   ;
$scope.guinForm.phone1    = u.phone1    ;
$scope.guinForm.phone2    = u.phone2    ;
$scope.guinForm.phone3    = u.phone3    ;
$scope.guinForm.time = "1";
$(".cont1").hide();
$(".cont2").show();

};



$scope.goEmergencyStep3 = function(){
  if($scope.work_date == ""){
    $scope.alert("날짜를 선택해 주세요.");
    return ;
  }
  $(".cont2").hide();
  $(".cont3").show();
}
$scope.exitEmergencyGuin = function(){
  $ionicHistory.goBack();
}

$scope.preEmerGoStep1 =function(){
  $(".cont2").hide();
  $(".cont1").show();
}
$scope.preEmerGoStep2 =function(){
  $(".cont3").hide();
  $(".cont2").show();
}


$scope.emergencyFormStep1Back = function(u) {
$scope.emergencyCloseStep(2);
$scope.emergencyOpenStep(1);
};
$scope.emergencyFormStep2 = function(u) {
//alert(typeof($scope.work_date));
//alert($scope.work_date);
//alert($scope.unique($scope.work_date));
$scope.work_date = $scope.unique($scope.work_date);
$scope.emergencyCloseStep(2);
$scope.emergencyOpenStep(3);
};
$scope.emergencyFormStep2Back = function(u) {
$scope.emergencyCloseStep(3);
$scope.emergencyOpenStep(2);
};

  $scope.emergencyFormStep3 = function(u) {
    var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;


    if (u.business== undefined || String(u.business).trim() == "" ){
      $scope.alert("담당 업무 내용을 입력해주세요.");
      $timeout(function() {
                document.getElementById("business").focus();
      },750);
      return ;
    } else if (special_pattern.test(u.business) ){
      $scope.alert("담당 업무 내용에 특수문자를 입력할 수 없습니다.");
      $timeout(function() {
                document.getElementById("business").select();
      },750);
      return ;
    } else if (u.people_num == "") {
      $scope.alert("모집인원을 선택해 주세요.");
      return ;
    } else if (u.pay == "") {
      $scope.alert("일급을 선택해 주세요.");
      return ;
    } else if (u.age_1st == "") {
      $scope.alert("최소연령을 선택해 주세요.");
      return ;
    } else if (u.age_2nd == "") {
      $scope.alert("최대연령을 선택해 주세요.");
      return ;
    } else if (u.career == "") {
      $scope.alert("필요경력을 선택해 주세요.");
      return ;
    } else if (u.content == undefined || String(u.content).trim() == "") {
      $scope.alert("상세 모집 내용을 입력해주세요.");
      $timeout(function() {
              document.getElementById("content").focus();
      },750);
      return ;
    } else if (special_pattern.test(u.content) ){
      $scope.alert("상세 모집 내용에 특수문자를 입력할 수 없습니다.");
      $timeout(function() {
                document.getElementById("content").select();
      },750);
      return ;
    }

    var itemCon = {
      id: $scope.uid,
      type: 'check'
    };

    $http({
         method: 'POST',
         url: 'http://il-bang.com/ilbang_pc/ionic/http/emergencyItemCheck.php',
         data: $httpParamSerializerJQLike(itemCon),
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).success(function (data, status, headers, config) {
       console.log("dz"+JSON.stringify(data));
       if ((data.result == "0")||(data.result == null)||(data.result == "null")){
         // 아이템 0개
         $scope.urgentItem("close");

       } else if (data.result > "0") {
         var confirmPopup1 = $ionicPopup.confirm({
           cssClass: 'readItemPop',
           title: '<h4 class="">긴급구인 서비스</h4>',
           template:
            '<ul class="popupUl">'+
              '<li>'+
                  '<p class="di popupTitle">상품이름 :</p>'+
                  '<p class="di">긴급구인 1회 이용권</p>'+
              '</li>' +
              '<li>'+
                  '<p class="di popupTitle">금액</p>'+
                  '<p class="di"><span class="assertive bold">5,000원</span></p>'+
              '</li>'+
              '<li>'+
                  '<p class="di popupTitle">아이템 갯수</p>'+
                  '<p class="di"><span class="assertive bold">'+data.result+'</span></p>'+
              '</li>'+
            '</ul>',
           buttons: [{
             text: '사용하기',
             type: 'button-default',
             onTap: function() {

                   var itemUseData ={
                      id: $scope.uid,
                      type: "itemConsume",

                   };
                   $http({
                        method: 'POST',
                        url: 'http://il-bang.com/ilbang_pc/ionic/http/emergencyItemCheck.php',
                        data: $httpParamSerializerJQLike(itemUseData),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                   }).success(function (data, status, headers, config) {
                     console.log(JSON.stringify(data));
                     console.log(data);
                   if(data.result == "data update success"){


                   $scope.guinForm.business   = u.business   ;
                   $scope.guinForm.people_num = u.people_num ;
                   $scope.guinForm.pay        = u.pay        ;
                   $scope.guinForm.age_1st    = u.age_1st    ;
                   $scope.guinForm.age_2nd    = u.age_2nd    ;
                   $scope.guinForm.career     = u.career     ;
                   $scope.guinForm.content    = u.content    ;

                   //alert(JSON.stringify($scope.guinForm));

                   //alert(JSON.stringify($scope.guinForm));
                   var foreign1;
                   if($scope.guinForm.foreign) {
                     foreign1 = 1;
                   }else {
                     foreign1 = 0;
                   }

                   var myData = {
                       company   : $scope.guinForm.company  ,
                       title     : $scope.guinForm.title    ,
                       business  : $scope.guinForm.business ,
                       area_1st  : $scope.guinForm.area_1st ,
                       area_2nd  : $scope.guinForm.area_2nd ,
                       work_1st  : $scope.guinForm.work_1st ,
                       work_2nd  : $scope.guinForm.work_2nd ,
                       age_1st   : $scope.guinForm.age_1st  ,
                       age_2nd   : $scope.guinForm.age_2nd  ,
                       foreign   : foreign1,
                       lat       : $localstorage.get('lat')      ,  //
                       lng       : $localstorage.get('lng')      ,  //
                       sex       : $scope.guinForm.sex      ,
                       career    : $scope.guinForm.career   ,
                       pay       : $scope.guinForm.pay      ,
                       content   : $scope.guinForm.content  ,
                       people_num: $scope.guinForm.people_num,
                       address   : $scope.guinForm.addresss  , //
                       time      : $scope.guinForm.time      ,  //
                       member_no : $scope.member_no          ,
                       valid_no  : $scope.valid_no           ,
                       uid       : $scope.uid                ,
                       manager   : $scope.guinForm.manager  ,
                       phone     : $scope.guinForm.phone1 +'-'+ $scope.guinForm.phone2 +'-'+ $scope.guinForm.phone3,
                       work_date : $scope.work_date          ,
                       time      : $scope.guinForm.time      ,
                       emergency : '1'
                    }

                   //alert(JSON.stringify(myData));
                   /*
                  var myData = {
                       title     : $scope.guinForm.title,
                       company   : $scope.guinForm.company    ,
                       work_1st  : $scope.guinForm.work_1st   ,
                       work_2nd  : $scope.guinForm.work_2nd   ,
                       address   : $scope.guinForm.addresss   ,
                       manager   : $scope.guinForm.manager    ,
                       phone1    : $scope.guinForm.phone1     ,
                       phone2    : $scope.guinForm.phone2     ,
                       phone3    : $scope.guinForm.phone3     ,
                       business    : $scope.guinForm.business  ,
                       people_num  : $scope.guinForm.people_num  ,
                       pay         : $scope.guinForm.pay         ,
                       age_1st     : $scope.guinForm.age_1st     ,
                       age_2nd     : $scope.guinForm.age_2nd     ,
                       areer       : $scope.guinForm.career      ,
                       content     : $scope.guinForm.content
                   }
                   */
                   //alert(JSON.stringify(myData));



                   $http({
                       method: 'POST',
                       url: 'http://il-bang.com/ilbang_pc/ionic/http/insertGuinForm.php',
                       data: $httpParamSerializerJQLike(myData),
                       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                   }).success(function (data, status, headers, config) {

                      //noti(data.result);

                       if (data.result == "0"){
                         //alert(data.sql)  ;
                       } else if (data.result == "1") {

                         var pushData = {
                           latitude   : $localstorage.get('lat'),
                           longitude  : $localstorage.get('lng'),
                           id         : $scope.uid,
                           locate     : $scope.guinForm.area_1st+" "+$scope.guinForm.area_2nd,
                           guinTitle       : $scope.guinForm.title,
                           guinNo         : data.no,
                           guinPay        : $scope.guinForm.pay
                         }
                         $http({
                             method: 'POST',
                             url: 'http://ilbbang.com/fcm.php',
                             data: $httpParamSerializerJQLike(pushData),
                             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                         }).success(function (data, status, headers, config) {



                         }).error(function (data, status, headers, config) {

                         });


                         $scope.guinForm = {};
                         $(".cont3").hide();
                         $(".cont1").show();
                         $state.go("erTabs.erTab2");


                       }
                   }).error(function (data, status, headers, config) {

                   });

                 }else if(data.result == "data update fail"){
                      noticeAlert("아이템 사용 실패",data.result);

                 }else if(data.result == "아이디 없음"){
                      noticeAlert("아이디가 없습니다.",data.result);
                 }
               }).error(function (data, status, headers, config) {
                    noticeAlert("",data);
              });


              }
           },{
             text: '취소',
             type: 'button-default',
          }]
         });
       } else if (data.result == "아이디 없음"){
         //아이템 확인할때
         noticeAlert("아이디가 없습니다.",data.result);
       }
     }).error(function (data, status, headers, config) {

     });

  };



///////////////////     긴급구인 끝   /////////////////////
///////////////////긴급구인용 이력서 리스트 시작 /////////////////////
$scope.loadEmergencyMore = function() {
  // 내 이력서 리스트
  //$scope.uid = 'lanxpan'; test
  $scope.page = $scope.page +1;

  var myData = {
    uid    : $scope.uid,
    page   : $scope.page
  }

  //alert(JSON.stringi  fy(myData));


 $http({
      method: 'POST',
      url: 'http://il-bang.com/ilbang_pc/ionic/http/getEmergencyMyGuinList.php',
      data: $httpParamSerializerJQLike(myData),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function (data, status, headers, config) {

      //console.log(JSON.stringify(data.listData));
      //alert(JSON.stringify(data.listData));
      $scope.myGuinList = $scope.myGuinList.concat(data.listData);
      $scope.noMoreItemsAvailable = false;

      if (data.paging.page >= data.paging.allPage) {
         $scope.noMoreItemsAvailable = true;
      }
      if(data.paging.allPost < 1 || data.paging.allPost == undefined || data.paging.allPost == null){
        var confirmPopup = $ionicPopup.confirm({
          cssClass:'estiPop',
          title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
          template:'<div class="tc f12"><span><b>작성해 놓은 채용 공고가 없습니다.<br> 채용 공고 작성 후 확인하시거나 바로 주세요.</b></span><br>',

          buttons: [{
            text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
            type: 'button-default',
            onTap: function() {
             $ionicHistory.goBack();
            }
          }]
        });
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
      //$scope.$broadcast('scroll.infiniteScrollComplete');
  }).error(function (data, status, headers, config) {
      // handle error things
  });
}
///////////////////긴급구인용 이력서 리스트 끝 /////////////////////




  $scope.test = function() {
    alert($scope.guinTitle);
  }


  $scope.page = 0;

  $scope.loadMore = function() {
    // 내 이력서 리스트
    //$scope.uid = 'lanxpan'; test
    $scope.page = $scope.page +1;

    var myData = {
      uid    : $scope.uid,
      page   : $scope.page
    }

    //alert(JSON.stringi  fy(myData));


   $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/getMyGuinList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

        //alert(JSON.stringify(data.listData));
        //alert(JSON.stringify(data.listData));
        $scope.myGuinList = $scope.myGuinList.concat(data.listData);
        $scope.noMoreItemsAvailable = false;

        if (data.paging.page >= data.paging.allPage) {
           $scope.noMoreItemsAvailable = true;
        }
        $scope.allPost = data.paging.allPost;
        if(data.paging.allPost == 0){
          if($scope.alertCount == 0){
            var confirmPopup = $ionicPopup.confirm({
              cssClass:'estiPop',
              title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
              template:'<div class="tc f12"><span><b>'+"작성한 채용 공고가 없습니다.<br>채용 공고를 작성하시겠습니까?"+'</b></span><br>',

              buttons: [{
                text: '나중에 하기',
                type: 'button-default'
              },{
                text: '작성하기',
                type: 'button-default',
                onTap: function() {
                  if ($scope.cmpInfoInsrtYn) {
                    $scope.gujikForm = {};
                    $state.go("guin");
                  } else {
                    $state.go("add-info");
                  }
                }
              }]
            });
            $scope.alertCount = 1;
          }
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
        //$scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }



  var d = new Date();
   var select_Date=[];
$scope.work_date = [];
   var ipObj1 = {


     callback: function (val) {  //Mandatory
        $scope.work_date = [];
        if(val.length>0){
        for(var i=0; i<val.length; i++){
       var date = new Date(val[i]);
       var year = date.getFullYear();
       var month = new String(date.getMonth()+1);
       var day = new String(date.getDate());
       console.log("날짜:",year+"년"+month+"월"+day+"일");
       select_Date.push(year+"년"+month+"월"+day+"일");
      $scope.work_date.push(year+"-"+month+"-"+day);
       }
      }

     },

     from: new Date(d.getFullYear(), d.getMonth(), d.getDate()), //Optional
     to: new Date(d.getFullYear(), d.getMonth()+1, d.getDate()), //Optional
     inputDate: new Date(),      //Optional
     mondayFirst: false,          //Optional
     disableWeekdays: [7],       //Optional
     dateFormat: 'dd MMMM yyyy',
     showTodayButton: false,
     closeOnSelect: false,       //Optional
     templateType: 'modal'       //Optional
   };

   $scope.openDatePicker = function(){
     ionicDatePicker.openDatePicker(ipObj1);
   };

})
.controller('jusoCtrl', function ($scope,$ionicPopup,$ionicModal,ionicDatePicker, $state) {


   var element_wrap="";
   var geocoder = "";

   function foldDaumPostcode() {
       // iframe을 넣은 element를 안보이게 한다.
       element_wrap.style.display = 'none';
   }

   $scope.sample3_execDaumPostcode = function() {
       // 현재 scroll 위치를 저장해놓는다.
       $(function() { $("#postcodify").postcodify({
            insertPostcode5 : "#postcode",
            insertAddress : "#address",
            insertDetails : "#details",
            insertExtraInfo : "#extra_info",
            hideOldAddresses : false
        }); });
        element_wrap = document.getElementById('wrap');
        geocoder = new daum.maps.services.Geocoder();

       var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

        new daum.Postcode({
            oncomplete: function(data) {
               // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

               // 각 주소의 노출 규칙에 따라 주소를 조합한다.
               // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
               var fullAddr = data.address; // 최종 주소 변수
               var extraAddr = ''; // 조합형 주소 변수
               var sido= data.sido;
               var sigungu = data.sigungu;

               $scope.guinForm.si = data.sido;
               $scope.guinForm.gu = data.sigungu;
               // 기본 주소가 도로명 타입일때 조합한다.
               if(data.addressType === 'R'){
                   //법정동명이 있을 경우 추가한다.
                   if(data.bname !== ''){
                       extraAddr += data.bname;
                   }
                   // 건물명이 있을 경우 추가한다.
                   if(data.buildingName !== ''){
                       extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                   }
                   // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                   fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
               }

               // 우편번호와 주소 정보를 해당 필드에 넣는다.
               $scope.guinForm.sample3_postcode= data.zonecode; //5자리 새우편번호 사용
               $scope.guinForm.sample3_address= fullAddr;

               // 주소로 좌표를 검색
               geocoder.addr2coord(fullAddr, function(status, result) {
                   // 정상적으로 검색이 완료됐으면
                   if (status === daum.maps.services.Status.OK) {
                     console.log(result.addr[0].lat);
                    console.log(result.addr[0].lng);
                     $scope.guinForm.lat=result.addr[0].lat;
                     $scope.guinForm.lng =result.addr[0].lng;
                   }
              });

               // iframe을 넣은 element를 안보이게 한다.
               // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
               element_wrap.style.display = 'none';

               // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
               document.body.scrollTop = currentScroll;


           },
           // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
           onresize : function(size) {
               element_wrap.style.height = size.height+'px';

           },
           width : '100%',
           height : '100%'
       }).embed(element_wrap);
       // iframe을 넣은 element를 보이게 한다.
       element_wrap.style.display = 'block';
    }


      $scope.page = 0;
      $scope.myGuinList = [];
      $scope.loadMore();


})
