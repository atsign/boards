define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('SingleBoardCtrl', function (boardsService, $scope) {
            var boardCtrl = this;

            boardCtrl.categoryUrl = $scope.categoryUrl;
            boardCtrl.hasLoaded = false;
            boardCtrl.boardId = $scope.boardId;

            boardCtrl.updateBoardData = function () {
                boardCtrl.hasLoaded = false;

                boardsService.getBoardData(boardCtrl.boardId)
                    .then(function (data) {
                        boardCtrl.boardData = data;
                        boardCtrl.hasLoaded = true;
                    })
                ;
            };

            boardCtrl.updateBoardData();

            $scope.updateBoardData = boardCtrl.updateBoardData;
        });
    ;
});