// 체크박스
angular.module('ilbang.controllers').directive('checkBox',function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/check-box/check-box-hor.html',
        transclude: true
    };
});
angular.module('ilbang.controllers').directive('checkKind',function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/check-box/check-kind.html',
        transclude: true
    };
});
// 버튼
angular.module('ilbang.controllers').directive('button1',function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/button/button-block.html',
        transclude: true
    };
});
angular.module('ilbang.controllers').directive('buttonKind',function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/button/button-kind.html',
        transclude: true
    };
});
angular.module('ilbang.controllers').directive('checkModalC',function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/check-box/check-modal-c.html',
        transclude: true
    };
});
