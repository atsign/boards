define(['angular'], function (angular) {
    angular.module('boards-app')
        .directive('categoriesList', function () {
            return {
                templateUrl: '/js/templates/categories-list.tpl.html',
                restrict: 'E',
                controller: 'CategoriesListCtrl as categoriesList',
                scope: {
                    boardId: "@"
                }
            };
        })
    ;
});