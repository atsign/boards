define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('SingleBoardCtrl', function (boardsService, $scope) {
            var boardCtrl = this;

            boardCtrl.categoryUrl = $scope.categoryUrl;
            boardCtrl.hasLoaded = false;

            boardsService.getBoardData($scope.boardId)
                .then(function (data) {
                    boardCtrl.boardData = data;
                    boardCtrl.hasLoaded = true;
                })
            ;
        });
    ;
});