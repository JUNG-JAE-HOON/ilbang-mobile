angular.module('locate-controller',[])
.controller('GeoCtrl', function($http, $cordovaGeolocation,$httpParamSerializerJQLike,$localstorage, $scope){
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
$cordovaGeolocation
  .getCurrentPosition(posOptions)
  .then(function (position) {
    var lat  = position.coords.latitude; //위도 값을 가져옵니다.
    var long = position.coords.longitude; //경도 값을 가져옵니다.
    $localstorage.set("lat",lat);
    $localstorage.set("lng",long);


      if($localstorage.get("auto")=="true"){
        $scope.uid        = $localstorage.get("id");
       }else{
         $scope.uid        = sessionStorage.getItem("id");
       }

    var locateParam = {
      latitude: lat,            //위도
      longitude: long,          //경도
      id: $scope.uid
    };


    //전송부분
    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/ionic/http/locate_data.php',
        data: $httpParamSerializerJQLike(locateParam),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {
        // handle success things
    }).error(function (data, status, headers, config) {
        // handle error things
    });
  });
});
