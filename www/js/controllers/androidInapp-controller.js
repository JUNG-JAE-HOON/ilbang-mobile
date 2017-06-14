
angular.module('androidInapp-controller',[])
.controller('InAppPurchasesCtrl', function ($scope, $ionicPlatform, $ionicLoading, $ionicPopup,$http,$httpParamSerializerJQLike,$localstorage) {   
 $scope.alert = function(data){
  var confirmPopup = $ionicPopup.confirm({
        cssClass: 'urgentPop',
        title: '<h4 class="fo">구매 알림</h4>',
        template:
        '<ul class="popupUl">'+'<li>'+'<p class="tc">'+data+'</p>'+'</li>'+'</ul>',
        buttons: [{
            text: '확인',
            type: 'button-default'
        }]
    });
  }
  if($localstorage.get("auto")=="true"){
    $scope.uid        = $localstorage.get("id");
    $scope.member_no  = $localstorage.get("no");
    $scope.valid_no   = $localstorage.get("valid_no");
   }else{
     $scope.uid        = sessionStorage.getItem("id");
     $scope.member_no  = sessionStorage.getItem("no");
     $scope.valid_no   = sessionStorage.getItem("valid_no");
   }
    
  var androidProductIds = ["net.saltfactory.il_bang.emergency1buy","net.saltfactory.il_bang.reading1buy","net.saltfactory.il_bang.reading1weekbuy","net.saltfactory.il_bang.reading1monthbuy","net.saltfactory.il_bang.review_delete"]; // <- Add your product Ids here
  var iosProductIds = ["com.il.bang.ios.emergency","com.il.bang.ios.read.1000","com.il.bang.ios.read.10000","com.il.bang.ios.read.30000","com.il.bang.ios.review.delete"];
  var spinner = '<ion-spinner icon="dots" class="spinner-stable"></ion-spinner><br/>';
  $ionicLoading.show({ template: spinner + '구매정보 가져오는중...' });

  if(device.platform == "Android"){     //안드로이드 상품 가져오기
      inAppPurchase
        .getProducts(androidProductIds)
        .then(function (products) {
            $scope.products = products;
            //  console.log(JSON.stringify(products));
            $ionicLoading.hide();
        })
        .catch(function (err) {
            //  console.log(JSON.stringify(err));
            $ionicLoading.hide();
        });
  }else if(device.platform == "iOS"){   //ios 상품 가져오기
    inAppPurchase
      .getProducts(iosProductIds)
      .then(function (products) {
          $scope.products = products;
          //  console.log("controller:"+JSON.stringify(products));
          $ionicLoading.hide();
      })
      .catch(function (err) {
          //  console.log(JSON.stringify(err));
          $ionicLoading.hide();
      });
  }
$scope.buy = function (itemName) {
      if(device.platform == "Android"){    //안드로이드 결제
            var purchaseConfirm = {
                  device: "android",
                  id: $scope.uid,
                  item: itemName
                };

            //구매가능 확인
            $http({
                  method: 'POST',
                  url: 'http://il-bang.com/ilbang_pc/ionic/http/purchaseConfirm.php',
                  data: $httpParamSerializerJQLike(purchaseConfirm),
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {

                  if(data=="구매가능"){
                          $ionicLoading.show({ template: spinner + '구매중...' });
                          inAppPurchase
                                .buy(itemName)
                                .then(function (data) {
                                        //  console.log(JSON.stringify(data));
                                        //  console.log('consuming transactionId: ' + data.transactionId);

                                        //구매정보
                                        var purchaseData = {
                                                device: "android",
                                                id: $scope.uid,
                                                no: $scope.member_no,
                                                valid_no: $scope.valid_no,
                                                packageName: 'net.saltfactory.il_bang',
                                                productId: data.productId,
                                                receipt: JSON.stringify(data.receipt)
                                       };
                                       //구매정보 서버로 전송
                                       $http({
                                                method: 'POST',
                                                url: 'http://il-bang.com/ilbang_pc/ionic/http/purchaseData.php',
                                                data: $httpParamSerializerJQLike(purchaseData),
                                                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                       }).success(function (data, status, headers, config) {

                                                if(data=='ok'){
                                                        //전송 성공
                                                        // console.log('전송 완료');
                                                }else{
                                                        //전송 실패 이유
                                                        $scope.alert(data);
                                                }
                                      });
                                      //아이템 소모
                                      return inAppPurchase.consume(data.type, data.receipt, data.signature);
                              })
                              .then(function () {
                                      //구매 완료
                                      $ionicLoading.hide();
                                      $scope.alert("아이템 구매 완료!");
                                      //console.log('consume done!');

                              })
                              .catch(function (err) {
                                     //구매 실패
                                     $ionicLoading.hide();
                                     if(err.code=="-5"){
                                        $scope.alert("결제를 취소하였습니다.");
                                     }else{
                                        $scope.alert("결제에 실패하셨습니다.<br>"+JSON.stringify(err));
                                     }
                              });
                  }else{
                          //구매 불가
                          $scope.alert(data);
                  }
            });
      } else if(device.platform == "iOS"){

          if(itemName=="net.saltfactory.il_bang.emergency1buy"){
              itemName = "com.il.bang.ios.emergency";
          }else if(itemName == "net.saltfactory.il_bang.reading1buy"){
              itemName = "com.il.bang.ios.read.1000";
          }else if(itemName == "net.saltfactory.il_bang.reading1weekbuy"){
              itemName = "com.il.bang.ios.read.10000";
          }else if(itemName == "net.saltfactory.il_bang.reading1monthbuy"){
              itemName = "com.il.bang.ios.read.30000";
          }else if(itemName == "net.saltfactory.il_bang.review_delete"){
              itemName = "com.il.bang.ios.review.delete";
          }

          var purchaseConfirm = {
                device: "IOS",
                id: $scope.uid,
                item: itemName
              };

          //구매가능 확인
          $http({
                method: 'POST',
                url: 'http://il-bang.com/ilbang_pc/ionic/http/purchaseConfirm.php',
                data: $httpParamSerializerJQLike(purchaseConfirm),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }).success(function (data, status, headers, config) {

                if(data=="구매가능"){
                        $ionicLoading.show({ template: spinner + '구매중...' });
                        inAppPurchase
                              .buy(itemName)
                              .then(function (data) {
                                        // console.log(JSON.stringify(data));
                                      //  console.log('consuming transactionId: ' + data.transactionId);

                                      //구매정보
                                      var purchaseData = {
                                              device: "ios",
                                              id: $scope.uid,
                                              no: $scope.member_no,
                                              valid_no: $scope.valid_no,
                                              packageName: 'com.il.bang.ios',
                                              productId: itemName,
                                              receipt: JSON.stringify(data.receipt),
                                              transactionId:JSON.stringify(data.transactionId)
                                     };
                                    //  alert(JSON.stringify(purchaseData));
                                     //구매정보 서버로 전송
                                     $http({
                                              method: 'POST',
                                              url: 'http://il-bang.com/ilbang_pc/ionic/http/purchaseData.php',
                                              data: $httpParamSerializerJQLike(purchaseData),
                                              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                     }).success(function (data, status, headers, config) {

                                              if(data=='ok'){
                                                      //전송 성공
                                                      // console.log('전송 완료');
                                              }else{
                                                      //전송 실패 이유
                                                      $scope.alert(data);
                                              }
                                    });
                                    //아이템 소모
                                    return inAppPurchase.consume(data.type, data.receipt, data.signature);
                            })
                            .then(function () {
                                    //구매 완료
                                    $ionicLoading.hide();
                                    $scope.alert("아이템 구매 완료!");
                                    //console.log('consume done!');

                            })
                            .catch(function (err) {
                                   //구매 실패
                                   $ionicLoading.hide();
                                   $scope.alert("결제에 실패하셨습니다.<br>"+JSON.stringify(err));

                            });
                }else{
                        //구매 불가
                        $scope.alert(data);
                }
          });

      }
  };
});
