define(['angular'], function (angular) {
    angular.module('boards-app')
        .directive('singleBoard', function () {
            return {
                templateUrl: '/js/templates/single-board.tpl.html',
                restrict: 'E',
                controller: 'SingleBoardCtrl as boardCtrl',
                scope: {
                    categoryUrl: "@",
                    boardId: "@"
                }
            };
        })
    ;
});