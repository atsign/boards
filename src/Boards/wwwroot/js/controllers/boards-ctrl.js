define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('BoardsCtrl', function () {
            var boardsCtrl = this;

            boardsCtrl.modalActive = false;

            boardsCtrl.newBoardClicked = function () {
                boardsCtrl.modalTitle = "Add a Board";
                boardsCtrl.modalActive = true;
            };
        });
    ;
});