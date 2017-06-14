angular.module('gmDetailMap-controller',[])

.controller('gmDetailMapCtrl', function($scope, $ionicLoading, $http,$compile,$stateParams,$localstorage,$httpParamSerializerJQLike,$state,$timeout,$ionicHistory) {
/*
  $timeout(function () {
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          $log.debug('clearing cache')
      },300)
*/


  console.log($scope.lat+","+$scope.lng);

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


 


  var lat = $scope.lat;
  var lng = $scope.lng;

  if (lat == "" || lng == "" || lat == 'undefind' || lng == 'undefind' ){
    lat = "37.565742";
    lng = "126.977966";
   }


 var mapContainer = document.getElementById('map_detail'), // 지도를 표시할 div
     mapOption = {
         center: new daum.maps.LatLng(lat, lng), // 지도의 중심좌표
         level: 3 // 지도의 확대 레벨
     };

 var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

 // 마커가 표시될 위치입니다
 var markerPosition  = new daum.maps.LatLng(lat, lng);

 // 마커를 생성합니다
 var marker = new daum.maps.Marker({
     position: markerPosition
 });

 // 마커가 지도 위에 표시되도록 설정합니다


      marker.setMap(map);



// 정재훈


// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(status, result) {
    if (status === daum.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');
        //infoDiv.innerHTML = result[0].fullName;
    }
}
$scope.gamengDetail=function(){
  $('.gameng-info-area').toggleClass('gameng-hidden');
  // $('.mapWrap').toggleClass("map-hidden");

}
$scope.fadeOut=function(){
  $('.gameng-info-area').addClass('gameng-hidden');
}

});
