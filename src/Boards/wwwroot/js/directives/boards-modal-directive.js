define(['angular'], function (angular) {
    angular.module('boards-app')
        .directive('boardsModal', function () {
            return {
                templateUrl: 'js/templates/boards-modal.tpl.html',
                restrict: 'A',
                controller: 'BoardsModalCtrl as boardsModal',
                scope: {
                    modalTitle: '=',
                    modalActive: '='
                }
            };
        })
    ;
});