angular.module('gujikModify-controller', [])
.controller('gujikModifyCtrl', function($state, $scope,$ionicPopup, $ionicPopover, $http, $httpParamSerializerJQLike, $stateParams, ionicDatePicker) {
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

    $scope.gujikForm = {};
    //$scope.guList = [{guNo:"", guName:"전지역"}];
    $scope.gujikForm.title    = "프로필 제목을 선택하세요.";
    $scope.gujikForm.work_1st = "";
    $scope.gujikForm.work_2nd = "";
    $scope.gujikForm.area_2nd = "";
    $scope.gujikForm.area_1st = "";
    $scope.gujikForm.pay = "";
    $scope.gujikForm.career = "";
    $scope.gujikForm.content = "";
    //$scope.gujikForm.open = "yes";

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

          title:    [ "프로필 제목을 선택하세요.",
                      "취업대란! 오히려 제게는 기회입니다." ,
                      "새싹을 틔울 수 있는 씨앗이 되겠습니다.",
                      "백만불짜리 열정으로 능력을 보여드리겠습니다",
                      "내일을 향한 작은 준비들"
                     ],
                     //work_1st: [ {no:"", list_name:'분류'}],
                     work_2nd: [ {no:"", list_name:'희망직종'}],
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

    $scope.getCategoryList = function(col, parent_no, type) {

      if (parent_no == "" && col == 'work_2nd'){
        $scope.selboxData[col] = [{no:"", list_name:'희망직종'}];
        $scope.gujikForm.work_2nd = "";
        return;
      } else if (parent_no == "" && col == 'area_2nd') {
        $scope.selboxData[col] = [{no:"", list_name:'구'}];
        $scope.gujikForm.work_2nd = "";
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
            $scope.gujikForm.work_2nd = "";
          }

          $scope.selboxData[col] = $scope.selboxData[col].concat(data.listData);

      }).error(function (data, status, headers, config) {
          // handle error things
      });
    }

    $scope.changeArea_1st = function() {
      //if($scope.gujikForm.area_1st == "") {
      //  $scope.gujikForm.area_2nd = "";
      //}
      $scope.gujikForm.area_2nd  = "";
      $scope.selboxData["area_2nd"] = [{'no':"",'list_name':'구'}];

      $scope.getCategoryList('area_2nd', $scope.gujikForm.area_1st, 'area_type');
    }

    $scope.changeWork_1st = function(){
      //alert('d';
      $scope.getCategoryList('work_2nd', $scope.gujikForm.work_1st, 'work_type');
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    for (var i=0; i<= 500000; i+=50000) {
      $scope.selboxData.pay.push ({'no':"'"+i+"'", 'list_name': numberWithCommas(i) });
    }

    //$scope.getCategoryList ('work_1st', '0', 'work_type');
    $scope.getCategoryList ('area_1st', '0', 'area_type');

    $scope.siSelect = function(siNo,siName) {

      if ($scope.gujikForm.area_1st == "") {
        $scope.guList = [];
        $scope.guList.push({'guNo':"",'guName':"전지역"});
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
         $scope.guList = [];
         $scope.guList = $scope.guList.concat(data.listData);
         $scope.gujikForm.area_2nd = $scope.guList[0].guNo;
      }).error(function (data, status, headers, config) {
          // handle error things
      });

    }


    var myData = {
      no:  $stateParams.no
    }

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/loadGujikInfo.php',
        data: $httpParamSerializerJQLike(myData),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        //alert(JSON.stringify(data.listData));
        $scope.gujikForm.title     = data.listData[0].title     ;
        $scope.gujikForm.area_1st  = data.listData[0].area_1st  ;
        $scope.getCategoryList2('area_2nd', $scope.gujikForm.area_1st, 'area_type');
        //$scope.gujikForm.work_1st  = data.listData[0].work_1st  ;



        //$scope.getCategoryList2('work_2nd', $scope.gujikForm.work_1st, 'work_type');

        if(data.listData[0].work_1st == "8030") {   // 교육일방
          $scope.gujikForm.work_1st  = data.listData[0].work_1st  ;
          $scope.getCategoryList2('work_2nd', $scope.gujikForm.work_1st, 'work_type');
          $scope.gujikForm.work_2nd  = data.listData[0].work_2nd  ;
        } else {
          $scope.gujikForm.work_1st  = data.listData[0].work_2nd  ;
          $scope.gujikForm.work_2nd  = ""                         ;
        }

        $scope.gujikForm.pay       = "'"+data.listData[0].pay+"'" ;
        $scope.gujikForm.career    = data.listData[0].career     ;
        $scope.gujikForm.content   = data.listData[0].content    ;
        $scope.gujikForm.time      = data.listData[0].time       ;
        $scope.gujikForm.area_2nd  = data.listData[0].area_2nd  ;
        $scope.gujikForm.work_2nd  = data.listData[0].work_2nd  ;
        $scope.work_date = data.listData[0].date  ;

    }).error(function (data, status, headers, config) {

    });


    $scope.updateGuinInfo = function (o) {
      //$scope.items = data.listData;

      if (o.title == ""){
        $scope.alert("프로필 제목을 입력하세요.");
        return ;
      } else if (o.area_1st == "") {
        $scope.alert("희망 근무 지역을 선택하세요.");
        return ;
      } else if (o.area_2nd == "") {
        $scope.alert("희망 근무 지역을 선택하세요.");
        return ;
      } else if (o.work_1st == "") {
        $scope.alert("특성별을 선택하세요.");
        return ;
      } else if (o.work_1st == "8030" && o.work_2nd == "") {
        $scope.alert("희망 직종을 선택하세요.");
        return ;
      } else if (o.pay == "") {
        $scope.alert("일당을 선택하세요.");
        return ;

      } else if ($scope.work_date == undefined || $scope.work_date == "") {
        $scope.alert("희망 근무일자를 선택하세요");
        return ;

      } else if ($scope.gujikForm.career == ""){
        $scope.alert("경력 사항을 선택하세요.");
        return ;
      } else if (String($scope.gujikForm.content).trim() == "") {
        $scope.alert("자기소개서를 입력하세요.");
        return ;
      }


      if (o.work_1st == "8030"){
        // 교육일방
      } else {
        o.work_2nd = o.work_1st;
        o.work_1st = "8000";
      }



      var myData = {
          'no'          : $stateParams.no ,
          'title'       : o.title         ,
          'area_1st'    : o.area_1st      ,
          'area_2nd'    : o.area_2nd      ,
          'work_1st'    : o.work_1st      ,
          'work_2nd'    : o.work_2nd      ,
          'pay'         : o.pay           ,
          'content'     : o.content       ,
          'time'        : o.time          ,
          'career'      : o.career        ,
          'work_date'   : $scope.work_date
      }
      /*
      var myData = {
        uid    : $scope.uid,
        page   : $scope.page
      }*/
      //$scope.guinForm.no = $stateParams.no;
      //alert(JSON.stringify(myData)) ;
      $http({
          method: 'POST',
          url: 'http://il-bang.com/ilbang_pc/ionic/http/gujik/updateGujikInfo.php',
          data: $httpParamSerializerJQLike(myData),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {

          if(data.result == "0"){
            $scope.alert(data.msg);
            //alert(data.sql);
          }else if (data.result == "1"){
            $scope.alert(data.msg);
            //alert(data.sql);
            $state.go("eeTabs.eeTab2");

          }
      }).error(function (data, status, headers, config) {

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
