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

            categoriesList.deleteCategory = function (categoryId, name) {
                if (window.confirm("Are you sure you want to delete the '" + name + "' category?")) {
                    categoriesService.deleteCategory(categoryId, boardId)
                        .then(function () {
                            categoriesList.reloadList();
                        })
                        .catch(function (err) {
                            alert('Unable to delete "' + name + '." Please try again.');
                            console.log(err);
                        })
                    ;
                }
            };

            categoriesList.reloadList();
        })
    ;
});