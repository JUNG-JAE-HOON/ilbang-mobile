angular.module('guinModify-controller', [])
.controller('guinModifyCtrl', function($state, $scope, $ionicPopover, $stateParams, $http, $httpParamSerializerJQLike,ionicDatePicker, $state,$ionicPopup, $timeout) {
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

  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
          $scope.selboxData[col] = [{no:"", list_name:'분류'}];

        } else if (col == 'work_2nd') {
          $scope.selboxData[col] = [{no:"", list_name:'희망직종'}];
          $scope.guinForm.work_2nd = "";
        } else if (col == 'area_1st') {
          $scope.selboxData[col] = [{no:"", list_name:'시'}];
          //$scope.guinForm.area_1st = "";
        } else if (col == 'area_2nd'){
          $scope.selboxData[col] = [{no:"", list_name:'구'}];
          $scope.guinForm.area_2nd = "";
        }

        $scope.selboxData[col] = $scope.selboxData[col].concat(data.listData);

    }).error(function (data, status, headers, config) {
        // handle error things
    });
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
        work_2nd: [ ],
        area_1st: [ {no:"", list_name:'시'}],
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

  //$scope.getCategoryList ('work_1st', '0', 'work_type');
  $scope.getCategoryList ('area_1st', '0', 'area_type');

  for (var i=0; i<= 500000; i+=50000) {
    $scope.selboxData.pay.push ({'no':"'"+i+"'", 'list_name': numberWithCommas(i) });
  }




  // 불러오기
  $scope.items = [];


  $scope.getCategoryList2 = function(col, parent_no, type) {



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
          $scope.selboxData[col] = [{no:"", list_name:'분류'}];

        } else if (col == 'work_2nd') {
          $scope.selboxData[col] = [{no:"", list_name:'희망직종'}];
          //$scope.guinForm.work_2nd = "";
        } else if (col == 'area_1st') {
          $scope.selboxData[col] = [{no:"", list_name:'시'}];
          //$scope.guinForm.area_1st = "";
        } else if (col == 'area_2nd'){
          $scope.selboxData[col] = [{no:"", list_name:'구'}];
          //$scope.guinForm.area_2nd = "";
        }

        $scope.selboxData[col] = $scope.selboxData[col].concat(data.listData);

    }).error(function (data, status, headers, config) {
        // handle error things
    });
  }

  var myData = {
    no:  $stateParams.no
  }

  $http({
      method: 'POST',
      url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/loadGuinInfo.php',
      data: $httpParamSerializerJQLike(myData),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).success(function (data, status, headers, config) {
      //alert(JSON.stringify(data.listData));
      $scope.items = data.listData;
      $scope.guinForm.title     = data.listData[0].title     ;
      $scope.guinForm.company   = data.listData[0].company   ;
      //alert(data.listData[0].work_1st);
      //alert(data.listData[0].work_2nd);
      if(data.listData[0].work_1st == "8030") {   // 교육일방
        $scope.guinForm.work_1st  = data.listData[0].work_1st  ;


        $scope.getCategoryList2('work_2nd', $scope.guinForm.work_1st, 'work_type');
        $scope.guinForm.work_2nd  = data.listData[0].work_2nd  ;

      } else {
        $scope.guinForm.work_1st  = data.listData[0].work_2nd  ;
        $scope.guinForm.work_2nd  = ""                         ;
      }
      //$scope.guinForm.work_1st  = data.listData[0].work_2nd  ;
      //$scope.getCategoryList2('work_2nd', $scope.guinForm.work_2nd, 'work_type');

      $scope.guinForm.area_1st  = data.listData[0].area_1st  ;
      $scope.getCategoryList2('area_2nd', $scope.guinForm.area_1st, 'area_type');
      $scope.guinForm.area_2nd  = data.listData[0].area_2nd  ;

      //alert(data.listData[0].sex);
      $scope.guinForm.address   = data.listData[0].address   ;
      $scope.guinForm.manager   = data.listData[0].manager   ;
      $scope.guinForm.sex       = data.listData[0].sex       ;
      var phone = data.listData[0].phone.split("-")          ;
      $scope.guinForm.phone1    = phone[0]                   ;
      $scope.guinForm.phone2    = phone[1]                   ;
      $scope.guinForm.phone3    = phone[2]                   ;
      $scope.guinForm.business   = data.listData[0].business   ;
      $scope.guinForm.people_num = data.listData[0].people_num ;
      $scope.guinForm.pay        = +data.listData[0].pay;
      $scope.guinForm.age_1st    = data.listData[0].age_1st    ;
      $scope.guinForm.age_2nd    = data.listData[0].age_2nd    ;
      $scope.guinForm.career     = data.listData[0].career     ;
      $scope.guinForm.content    = data.listData[0].content    ;
      $scope.guinForm.work_2nd   = data.listData[0].work_2nd   ;
      $scope.guinForm.area_1st   = data.listData[0].area_1st   ;
      $scope.work_date  = data.listData[0].date                ;
      $scope.guinForm.time  = data.listData[0].time            ;


  }).error(function (data, status, headers, config) {

  });
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


  function getAgoDate(yyyy, mm, dd)
  {
   var today = new Date();
   var year = today.getFullYear();
   var month = today.getMonth();
   var day = today.getDate();

   var resultDate = new Date(yyyy+year, month+mm, day+dd);

         year = resultDate.getFullYear();
         month = resultDate.getMonth() + 1;
         day = resultDate.getDate();

         if (month < 10)
             month = "0" + month;
         if (day < 10)
             day = "0" + day;

         return year + "-" + month + "-" + day;
  }

  $scope.updateGuinInfo = function (o) {
    //$scope.items = data.listData;
    //alert(o.work_1st);
    if($scope.work_date == ''){
      $scope.alert('날짜를 선택하세요.');
      return ;
    }
    ///채용공고 수정때 현재날짜보다 뒷 날짜 선택하게
    var name1 = $scope.work_date+'';
    var splitString  = name1.split(",");
    splitString.sort();
    if(splitString[splitString.length-1]<getAgoDate(0,0,0)){
      $scope.alert('날짜를 다시 선택해주세요.');
      return;
    };

    var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/;
    var num_check=/^[0-9]*$/;

    if (o.title== undefined || String(o.title).trim() == "" ){
        $scope.alert("모집 제목을 입력해주세요.");
        return ;
    } else if (special_pattern.test(o.title) == true  ){
        $scope.alert("모집 제목에 특수문자는 입력할 수 없습니다.");
        return ;
    } else if (o.company == undefined || String(o.company).trim() == "" ) {
      $scope.alert("상호 또는 성명을 입력해주세요.");
      return ;
    } else if (special_pattern.test(o.company) == true ) {
      $scope.alert("상호 또는 성명에 특수문자는 입력할 수 없습니다.");
      return ;
    } else if (o.work_1st == "") {
      $scope.alert("특성별을 선택하세요.");
      return ;
    } else if (o.work_1st == "8030" && o.work_2nd == "") {
      $scope.alert("희망직종을 선택해 주세요.");
      return ;
    } else if (o.area_1st == "" || o.area_2nd == "") {
      $scope.alert("희망 근무 지역을 선택하세요.");
      return ;
    } else if (o.address == undefined || o.address == "" ) {
      $scope.alert("상세주소를 입력해주세요.");
      return ;
    } else if (o.manager == undefined || String(o.manager).trim() == "") {
      $scope.alert("관리자 이름을 입력해 주세요.");
      return ;
    } else if (special_pattern.test(o.manager) == true ) {
      $scope.alert("관리자 이름에 특수문자는 입력할 수 없습니다.");
      return ;

    } else if (o.phone1 == undefined || String(o.phone1).trim() == "") {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      return ;
    } else if (!num_check.test(o.phone1)) {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      return ;
    } else if (o.phone2 == undefined || String(o.phone2).trim() == "") {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      return ;
    } else if (!num_check.test(o.phone2)) {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      return ;
    } else if (o.phone3 == undefined || String(o.phone3).trim() == "") {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      return ;
    } else if (!num_check.test(o.phone3)) {
      $scope.alert("전화번호를 올바르게 입력해 주세요.");
      return ;
    } else if (o.business== undefined || String(o.business).trim() == "" ){
      $scope.alert("담당 업무 내용을 입력해주세요.");
      return ;
    } else if (special_pattern.test(o.business) ){
      $scope.alert("담당 업무 내용에 특수문자를 입력할 수 없습니다.");
      return ;
    } else if (o.people_num == "") {
      $scope.alert("모집인원을 선택해 주세요.");
      return ;
    } else if (o.pay == undefined || o.pay == "") {
      $scope.alert("일급을 입력하세요.");
      return ;
    } else if (o.age_1st == "") {
      $scope.alert("최소연령을 선택해 주세요.");
      return ;
    } else if (o.age_2nd == "") {
      $scope.alert("최대연령을 선택해 주세요.");
      return ;
    } else if (o.career == "") {
      $scope.alert("필요경력을 선택해 주세요.");
      return ;
    } else if (o.content == undefined || String(o.content).trim() == "") {
      $scope.alert("상세 모집 내용을 입력해주세요.");
      return ;
    } else if (special_pattern.test(o.content) ){
      $scope.alert("상세 모집 내용에 특수문자를 입력할 수 없습니다.");
      return ;
    }

    if (o.work_1st == "8030"){
      // 교육일방
    } else {
      o.work_2nd = o.work_1st;
      o.work_1st = "8000";
    }


    var myData = {
        'no'        : $stateParams.no,
        'title'     : o.title     ,
        'company'   : o.company   ,
        'work_1st'  : o.work_1st  ,
        'area_1st'  : o.area_1st  ,
        'area_2nd'  : o.area_2nd  ,
        'address'   : o.address   ,
        'manager'   : o.manager   ,
        'phone1'    : o.phone1    ,
        'phone2'    : o.phone2    ,
        'phone3'    : o.phone3    ,
        'business'  : o.business  ,
        'people_num': o.people_num,
        'pay'       : o.pay       ,
        'age_1st'   : o.age_1st   ,
        'age_2nd'   : o.age_2nd   ,
        'career'    : o.career    ,
        'content'   : o.content   ,
        'work_2nd'  : o.work_2nd  ,
        'sex'       : o.sex       ,
        'work_date' : $scope.work_date,
        'time'      : o.time
    }
    /*
    var myData = {
      uid    : $scope.uid,
      page   : $scope.page
    }*/
    //$scope.guinForm.no = $stateParams.no;
    //alert(JSON.stringify(myData));
    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/guin/updateGuinInfo.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

        if(data.result == "0"){
          $scope.alert(data.msg);

        }else if (data.result == "1"){
          $scope.alert(data.msg);
          //alert(data.sql);
          $state.go("erTabs.erTab2");

        }
    }).error(function (data, status, headers, config) {

    });
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
       //$scope.str_work_date =  $scope.unique($scope.work_date).toString();
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



});
