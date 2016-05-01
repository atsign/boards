define(['angular'], function (angular) {
    angular.module('boards-app')
        .service('categoriesService', function ($http) {
            var categoriesService = this;

            categoriesService.getCategoriesForBoard = function (boardId) {
                return $http.get('/api/boards/' + boardId + '/categories')
                    .then(function (results) {
                        return results.data;
                    })
                ;
            };

            categoriesService.deleteCategory = function (categoryId, boardId) {
                return $http.delete('/api/boards/' + boardId + '/categories/' + categoryId);
            };

            categoriesService.addCategory = function (name, colorCode, boardId) {
                return $http.post('/api/boards/' + boardId + '/categories', {
                    name: name,
                    colorCode: colorCode
                }).then(function (results) {
                    return results.data;
                });
            };

            categoriesService.updateBoard = function (categoryId, name, colorCode, boardId) {
                return $http.put('/api/boards/' + boardId + '/categories', {
                    id: categoryId,
                    name: name,
                    colorCode: colorCode
                }).then(function (results) {
                    return results.data;
                });
            };
        })
    ;
});