angular.module('payOption-controller', [])

.controller('PaymentOption', function($scope, $ionicActionSheet) {

  $scope.paymentOption = function() {

    $ionicActionSheet.show({
      titleText: '결제방법 선택',
      buttons: [
        { text: '무통장입금' },
        { text: '신용카드' },
        { text: '핸드폰 결제' },
        { text: '문화상품권' },
      ],
      // destructiveText: 'Delete',
      cancelText: '돌아가기',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
  };

    $scope.toggleMenu=function(){
      $('.selectList').toggle('slideDown');
      $(".options").click(function(){
        alert();
      });
    }

});
