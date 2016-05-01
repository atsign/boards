define(['angular'], function (angular) {
    angular.module('boards-app')
        .directive('boardsList', function () {
            return {
                templateUrl: '/js/templates/boards-list.tpl.html',
                restrict: 'E',
                controller: 'BoardsListCtrl as boardsList'
            };
        })
    ;
});