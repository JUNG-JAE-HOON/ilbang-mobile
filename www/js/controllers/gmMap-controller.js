angular.module('gmMap-controller',[])

.controller('gmMapCtrl', function($scope, $ionicLoading, $http,$compile,$stateParams,$localstorage,$httpParamSerializerJQLike,$state) {

  $scope.goBack=function(){
    $state.go("gameng");
  }


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

   var myData = {
     lat  : $localstorage.get('lat'),
     lng  : $localstorage.get('lng'),
   }

   $http({
       method: 'POST',
       url: 'http://il-bang.com/ilbang_pc/ionic/http/affiliate/allAffiliateList.php',
       data: $httpParamSerializerJQLike(myData),
       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
   }).success(function (data, status, headers, config) {
         gamengList(data.listData);

         $scope.mapScreenMove();

   }).error(function (data, status, headers, config) {
       // handle error things
   });
 



   var lat =37.5615367;
   var lng = 126.9795475;


 // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
 var infowindow = new daum.maps.InfoWindow({zIndex:1});
 var mapContainer = document.getElementById('map_update'), // 지도를 표시할 div
     mapOption = {
         // center: new daum.maps.LatLng(lat, lng), // 지도의 중심좌표
          center: new daum.maps.LatLng(lat, lng),
         level: 4 // 지도의 확대 레벨
     };
      // 지도를 생성합니다
var map_update = new daum.maps.Map(mapContainer, mapOption);


$scope.mapScreenMove = function(){

  console.log($localstorage.get('lat'));
    if($localstorage.get('lat')!=undefined){
    map_update.setCenter(new daum.maps.LatLng($localstorage.get('lat'), $localstorage.get('lng')));
    map_update.setLevel(3);
    }else{
      console.log("없다 좌표");
    }
}

      function gamengList (data){

       //console.log(JSON.stringify(data));

       var bounds = new daum.maps.LatLngBounds();

       for (var i=0; i<data.length; i++ ){
         // alert(data.no[i]+'='+data.subject[i]+'='+data.lat[i]+'='+data.lng[i]);
         if(data[i].lat !="" ){
         //console.log(data[i].work_join_list_no+","+data[i].lat+","+data[i].lng);
          displayMarker(data[i].name,data[i].lat, data[i].lng, data[i].address,data[i].phone, data[i].discount_rate,data[i].img_url);
            bounds.extend(new daum.maps.LatLng(data[i].lat, data[i].lng));
          }

       }

       map_update.setBounds(bounds);


 }

 // 지도에 마커를 표시하는 함수입니다
 function displayMarker(name,lat,lng,address,phone, discount_rate,img_url) {
   var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
     imageSize = new daum.maps.Size(0,0), // 마커이미지의 크기입니다
     imageOprion = {offset: new daum.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
 //
 // // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
 var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOprion),
     markerPosition = new daum.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다
 //
   var marker = new daum.maps.Marker({
     position: new daum.maps.LatLng(lat, lng),
     image: markerImage // 마커이미지 설정
   });

   // 마커가 지도 위에 표시되도록 설정합니다
   marker.setMap(map_update);

   // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

   var content = '<div class="customoverlay">' +
       '<span class="test1 di" target="_blank" class="di" style="border-radius:5px !important">' +
       '<span class="title di" onclick="gamengInfo(\''+name+'\',\''+phone+'\',\''+address+'\',\''+discount_rate+'\',\''+img_url+'\')" >'+name+'</a></span>'+
       '</span>' +
      //  '<span class="test2 di" target="_blank" class="di">' +
      //  '<span class="cont di">'+phone+'</span>'+
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

 }

 // 정재훈
 // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
 searchAddrFromCoords(map_update.getCenter(), displayCenterInfo);



 // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
 daum.maps.event.addListener(map_update, 'bounds_changed', function() {
   $scope.mapResize();
 });

 $scope.mapResize= function(){
           var mapHeight =$('.mapWrap').height();
           var winHeight = $(window).height();
           if(mapHeight!=winHeight){

               $('.mapWrap').height(100+"%");
           }
 }

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
});
