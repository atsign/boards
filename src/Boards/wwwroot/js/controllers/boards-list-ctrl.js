define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('BoardsListCtrl', ['boardsService', '$scope', function (boardsService, $scope) {
            var boardsList = this;

            boardsList.haveLoaded = false;

            boardsList.reloadList = function () {
                boardsService.getBoards().then(function (items) {
                    boardsList.items = items;
                    boardsList.haveLoaded = true;
                });
            };

            boardsList.deleteBoard = function (id, name) {
                if (window.confirm('Are you sure you want to delete "' + name + '"? This will also delete all of its tasks and categories.')) {
                    boardsService.deleteBoard(id)
                        .then(function () {
                            boardsList.reloadList();
                        }, function (err) {
                            alert('Unable to delete "' + name + '." Please try again.');
                            console.log(err);
                        })
                    ;
                }
            };

            boardsList.updateBoard = function (id, name, description) {
                $scope.$parent.$broadcast('openUpdateModal', id, name, description);
            };

            boardsList.reloadList();

            $scope.$on('reloadList', boardsList.reloadList);
        }]);
    ;
});