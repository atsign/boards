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
/*
            boardsService.addBoard = function (name, description) {
                return $http.post('/api/boards', {
                    name: name,
                    description: description
                }).then(function (results) {
                    return results.data;
                });
            };

            boardsService.updateBoard = function (id, name, description) {
                return $http.put('/api/boards', {
                    id: id,
                    name: name,
                    description: description
                }).then(function (results) {
                    return results.data;
                });
            };*/
        })
    ;
});