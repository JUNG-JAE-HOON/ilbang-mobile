angular.module('gujikWrite-controller', [])

.controller('GujikFormCtrl', function($state, $scope,$ionicPopup, $localstorage,$ionicModal,$httpParamSerializerJQLike, $http, ionicDatePicker, $timeout ,$ionicHistory ) {
  //경고 메세지
  $scope.time = "1";
  $scope.loginAlertCount = 0;


  $scope.insertAlert = function(msg) {
      var confirmPopup = $ionicPopup.confirm({
        cssClass:'estiPop',
        title: '<h4 class="fo"><img src="img/cloud.png" width="15%"></h4>',
        template:'<div class="tc f12"><span><b>'+msg+'</b></span><br>',

        buttons: [{
          text: '<div class="bar-ilbang"><img src="img/pop_ok.png" width="10%"></div>',
          type: 'button-default',
          onTap: function() {
           $scope.gujikForm = {};
           $state.go("eeTabs.eeTab2");

          }
        }]
      });
  };


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



  $scope.unique =  function(array) {

	var result = [];
	$.each(array, function(index, element) {     // 배열의 원소수만큼 반복
		if ($.inArray(element, result) == -1) {  // result 에서 값을 찾는다.  //값이 없을경우(-1)
			result.push(element);                // result 배열에 값을 넣는다.
		}
	 });
	return result;
  }


  $scope.gujikForm = {};
  $scope.guList = [{guNo:"", guName:"구"}];
  $scope.gujikForm.title    = "";//프로필 제목을 선택하세요.
  $scope.gujikForm.work_1st = "";
  $scope.gujikForm.work_2nd = "";
  $scope.gujikForm.area_2nd = "";
  $scope.gujikForm.area_1st = "";
  $scope.gujikForm.pay = "";
  $scope.gujikForm.career = "";
  $scope.gujikForm.content = "";
  $scope.gujikForm.open = "yes";
  $scope.gujikForm.time = "1";

  String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/gi, "");
  }

  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  $scope.changeWork_1st = function(){
    $scope.getCategoryList('work_2nd', $scope.gujikForm.work_1st, 'work_type');
  }

  $scope.getCategoryList = function(col, parent_no, type) {

    if (parent_no == "" ){
      $scope.selboxData[col] = [{no:"", list_name:'희망직종'}];
      $scope.gujikForm.work_2nd = "";
      return;
    }else if (col == 'area_2nd' && parent_no == "") {
        $scope.guList = [{guNo:"", guName:'구'}];
        $scope.gujikForm.area_2nd = "";
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
          $scope.gujikForm.work_2nd = "";
        }

        $scope.selboxData[col] = $scope.selboxData[col].concat(data.listData);

    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }

  //$scope.getCategoryList ('work_1st', '0', 'work_type');
//$scope.getCategoryList ('work_2nd', '8000', 'work_type');

  $scope.selboxData = {
        title:    [ "프로필 제목을 선택하세요.",
                    "취업대란! 오히려 제게는 기회입니다." ,
                    "새싹을 틔울 수 있는 씨앗이 되겠습니다.",
                    "백만불짜리 열정으로 능력을 보여드리겠습니다",
                    "내일을 향한 작은 준비들"
                   ],
                   area_1st: [  {number:""  , value:'시'}
                               ,{number:"1"  , value:'서울'}
                               ,{number:"907", value:'인천'}
                               ,{number:"1164", value:'광주'}
                               ,{number:"1420", value:'대전'}
                               ,{number:"7700", value:'세종'}
                               ,{number:"1631", value:'대구'}
                               ,{number:"1923", value:'부산'}
                               ,{number:"2314", value:'울산'}
                               ,{number:"2422", value:'경기'}
                               ,{number:"3312", value:'강원'}
                               ,{number:"3641", value:'충남'}
                               ,{number:"3950", value:'충북'}
                               ,{number:"4219", value:'전남'}
                               ,{number:"4687", value:'전북'}
                               ,{number:"5128", value:'경남'}
                               ,{number:"5709", value:'경북'}
                               ,{number:"6296", value:'제주'}
                               ,{number:"7335", value:'해외'}
                             ],
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
                  ,{no:"8004", list_name:'간병일방'}
                ],
        work_2nd: [ //{no:"", list_name:'희망직종'}

                ],
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
             pay: [ {no:"", list_name:'일당'}
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
         career : [ {no:""  , list_name:'경력사항'},
                    {no:"0" , list_name:'신입'},
                    {no:"1" , list_name:'1년 미만'},
                    {no:"3" , list_name:'3년 미만'},
                    {no:"5" , list_name:'5년 미만'},
                    {no:"6" , list_name:'5년 이상'}
         ],


  }

  for (var i=0; i<= 500000; i+=50000) {
    $scope.selboxData.pay.push ({'no':"'"+i+"'", 'list_name': numberWithCommas(i) });
  }

  $scope.siSelect = function(siNo,siName) {

    if ($scope.gujikForm.area_1st == "") {
      $scope.guList = [];
      $scope.guList.push({'guNo':"",'guName':"구"});
      $scope.gujikForm.area_2nd = "";
      return ;
    }

    var myData = {
      'siNo': $scope.gujikForm.area_1st
    }
    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/getGuList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).success(function (data, status, headers, config) {
       $scope.guList = [  {'guNo':"10001",'guName':"전체"}];
       $scope.guList = $scope.guList.concat(data.listData);
       $scope.gujikForm.area_2nd = $scope.guList[0].guNo;
    }).error(function (data, status, headers, config) {
        // handle error things
    });

  }


  $scope.goGujikStep3 = function(){
    if($scope.work_date == ""){
      $scope.alert("날짜를 선택해 주세요.");
      return ;
    }
    $(".cont2").hide();
    $(".cont3").show();
  }
  $scope.exitGujik = function(){
    $ionicHistory.goBack();
  }

  $scope.preGujikGoStep1 =function(){
    $(".cont2").hide();
    $(".cont1").show();
  }
  $scope.preGujikGoStep2 =function(){
    $(".cont3").hide();
    $(".cont2").show();
  }

  $scope.formStep1 = function(u) {

    if (u.title == ""){
      $scope.alert("프로필 제목을 선택하세요.");
      return ;
    } else if (u.area_1st == "") {
      $scope.alert("희망 근무 지역을 선택하세요.");
      return ;
    } else if (u.work_1st == "") {
      $scope.alert("특성별을 선택하세요.");
      return ;
    } else if (u.work_1st == "8030" && u.work_2nd == "") {
      $scope.alert("희망 직종을 선택하세요.");
      return ;
    } else if (u.pay == "") {
      $scope.alert("일당을 선택하세요.");
      return ;
    }
    $(".cont1").hide();
    $(".cont2").show();

  };



  $scope.formStep3 = function(u) {

    if ($scope.gujikForm.career == ""){
      $scope.alert("경력 사항을 선택하세요.");
      return ;
    } else if (String($scope.gujikForm.content).trim() == "") {
      $scope.alert("자기소개서를 입력하세요.");
      $timeout(function() {
                document.getElementById("content").select();
       },750);
      return ;
    }
    $scope.gujikForm.uid = $scope.uid;
    $scope.gujikForm.work_date = $scope.work_date;
    //alert(JSON.stringify($scope.gujikForm));
    $scope.gujikForm.lat = $localstorage.get('lat');
    $scope.gujikForm.lng = $localstorage.get('lng');

    //alert($scope.gujikForm.lat);
    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/insertGujikForm.php',
        data: $httpParamSerializerJQLike($scope.gujikForm),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

        // true 가 오는지 숫자 1이 오는지 확인 안함 나중에 바꿔야함.
        if(data.result == '0'){
          $scope.alert(data.msg);
          //alert(data.sql);
        } else {
          $scope.insertAlert(data.msg);

          var insertFcmData = {
             uid: $scope.uid,
             state: 'gujik',
             area_1st: $scope.guinForm.area_1st,
             area_2nd: $scope.guinForm.area_2nd,
             work_2nd: $scope.guinForm.work_2nd,
             age_1st: $scope.guinForm.age_1st,
             age_2nd: $scope.guinForm.age_2nd
          }
           $http({
                method: 'POST',
                url: 'http://ilbbang.com/insertDataFcm.php',
                data: $httpParamSerializerJQLike(insertFcmData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                // console.log(data);
            }).error(function (data, status, headers, config) {
                // handle error things
            });



        }

    }).error(function (data, status, headers, config) {
        // handle error things
    });

  };

  $scope.page = 0;
  $scope.myGujikList = [];
  $scope.loadMore = function() {
    // 내 이력서 리스트

    $scope.page = $scope.page +1;

    var myData = {
      uid    : $scope.uid,
      page   : $scope.page
    }

   $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/getMyGujikList.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

        //alert(JSON.stringify(data.listData));
        $scope.myGujikList = $scope.myGujikList.concat(data.listData);
        $scope.noMoreItemsAvailable = false;
        //alert(data.paging.page);
        // alert(data.paging.allPage);
        if (data.paging.page >= data.paging.allPage) {
           $scope.noMoreItemsAvailable = true;
        }
        $scope.allPost = data.paging.allPost;

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $(".cont3").hide();
        $(".cont1").show();
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
