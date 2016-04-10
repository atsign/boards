define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('BoardsListCtrl', function (boardsService, $scope) {
            var boardsList = this;

            boardsList.haveLoaded = false;

            boardsList.reloadList = function () {
                boardsService.getBoards().then(function (items) {
                    boardsList.items = items;
                    boardsList.haveLoaded = true;
                });
            };

            boardsList.reloadList();

            $scope.$on('reloadList', boardsList.reloadList);
        });
    ;
});