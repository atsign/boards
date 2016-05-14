define(['angular'], function (angular) {
    angular.module('boards-app')
        .directive('phase', function () {
            return {
                templateUrl: '/js/templates/phase.tpl.html',
                restrict: 'A',
                controller: 'PhaseCtrl as phaseCtrl',
                scope: {
                    item: '&',
                    boardId: '@'
                }
            };
        })
    ;
});