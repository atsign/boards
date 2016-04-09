define(['angular'], function (angular) {
    angular.module('boards-app')
        .directive('boards', function () {
            return {
                templateUrl: 'js/templates/boards.tpl.html',
                restrict: 'E',
                controller: 'BoardsCtrl as boards'
            };
        })

        .controller('BoardsCtrl', function (boardsService) {
            var boards = this;

            boards.haveLoaded = false;

            boardsService.getBoards().then(function (items) {
                boards.items = items;
                boards.haveLoaded = true;
            });
        });
    ;
});