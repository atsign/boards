define(['angular'], function (angular) {
    angular.module('boards-app')
        .directive('phaseModal', function () {
            return {
                templateUrl: '../wwwroot/js/templates/phase-modal.tpl.html',
                restrict: 'A',
                controller: 'PhaseModalCtrl as phaseModal',
                scope: {
                    boardId: "@",
                    phaseModalTitle: '=',
                    phaseModalActive: '=',
                    phaseModalMethod: '=',
                    resetBoard: '&'
                }
            };
        })
    ;
});