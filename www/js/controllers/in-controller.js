
angular.module('in-controller',[])
.controller('InCtrl', function($scope, $http, $httpParamSerializerJQLike) {

    $http({
        method: 'POST',
        url: 'http://il-bang.com/ilbang_pc/in/ionic_in.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function (data, status, headers, config) {

         $scope.codeData= data.replace(/\s/gi, '');
    }).error(function (data, status, headers, config) {
        // handle error things
    });


})





.controller('testCtrl', function($scope, $location) {

  var url=location.href;
  var data = url.split("?");

  var data2 = data[1].split("#/");
  alert(data2[0]);
  // for(var i=0; data2.length; i++){
  //      data2[i].split();

  // }

  // $scope.param = $location.search();
  // alert($scope.param["name"]);

  })

