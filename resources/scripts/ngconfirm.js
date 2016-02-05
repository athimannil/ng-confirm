angular.module('ngConfirm', [])
  .directive('ngConfirm', function($uibModal, $parse) {
    return {
      // So the link function is run before ngClick's, which has priority 0
      priority: -1,
      link: function(scope, element, attrs) {
        element.on('click', function(e) {
          // Don't run ngClick's handler
          e.stopImmediatePropagation();
          $uibModal.open({
            template: "<div class='modal-header'><h4 class='modal-title'>{{ngTitle}}</h4></div><div class='modal-body'><p>{{ngMessage}}</p></div><div class='modal-footer'><button class='btn btn-link' ng-click='no()'>Cancel</button><button class='btn' ng-class='ngButton' ng-click='yes()'>{{ngButtonText}}</button></div>",
            controller:   function($scope, $uibModalInstance, message) {
                $scope.ngTitle = message.ngConfirmTitle ? message.ngConfirmTitle : 'Delete'; // modal title
                $scope.ngMessage = message.ngConfirm ? message.ngConfirm : 'Are you sure you want to delete ?'; // delete dialogue message
                $scope.ngButton = message.ngConfirmType ? 'btn-' + message.ngConfirmType : 'btn-danger'; // button type
                $scope.ngButtonText = message.ngConfirmButton ? message.ngConfirmButton : 'Delete'; // button text
                $scope.yes = function() {
                  $uibModalInstance.close();
                };
                $scope.no = function() {
                  $uibModalInstance.dismiss();
                };
              },
            size: 'sm',
            resolve: {
              message: function() {
                return attrs;
              }
            }
          }).result.then(function() {
            // Pass original click as '$event', just like ngClick
            $parse(attrs.ngClick)(scope, {
              $event: e
            });
          });
        });
      }
    };
  });