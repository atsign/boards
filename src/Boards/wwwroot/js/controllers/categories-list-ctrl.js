define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('CategoriesListCtrl', function (categoriesService, $scope) {
            var categoriesList = this;
            var boardId = $scope.boardId;

            categoriesList.haveLoaded = false;

            categoriesList.reloadList = function () {
                categoriesService.getCategoriesForBoard(boardId).then(function (items) {
                    categoriesList.items = items;
                    categoriesList.haveLoaded = true;
                });
            };

            categoriesList.reloadList();
        })
    ;
});