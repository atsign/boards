define(['angular'], function (angular) {
    angular.module('boards-app')
        .directive('taskModal', function () {
            return {
                templateUrl: '/js/templates/task-modal.tpl.html',
                restrict: 'A',
                controller: 'TaskModalCtrl as taskModal',
                scope: {
                    boardId: "@",
                    taskModalTitle: '=',
                    taskModalActive: '=',
                    taskModalMethod: '=',
                    boardCategories: '&',
                    defaultPhaseId: '=',
                    resetBoard: '&'
                }
            };
        })
    ;
});