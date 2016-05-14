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
                        boardCtrl.taskData = data.taskData;
                        boardCtrl.categories = data.categories;
                        boardCtrl.defaultPhaseId = data.taskData[0].phase.id;
                        boardCtrl.hasLoaded = true;
                    })
                ;
            };

            boardCtrl.newTaskClicked = function () {
                boardCtrl.taskModalActive = true;
                boardCtrl.taskModalTitle = "Add a Task";
                boardCtrl.taskModalMethod = "new";
            };

            boardCtrl.updateBoardData();

            $scope.updateBoardData = boardCtrl.updateBoardData;
            $scope.openTaskModal = boardCtrl.openTaskModal;
        });
    ;
});