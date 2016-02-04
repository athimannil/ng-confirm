angular.module('ui.bootstrap.demo', ['ui.bootstrap', 'ngConfirm']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function($scope, $uibModal, $log) {
  $scope.callme = function(){
    alert("hellomate");
  };
});