define(['angular'], function (angular) {
    angular.module('boards-app')
        .service('boardsService', ['$http', function ($http) {
            var boardsService = this;

            boardsService.getBoards = function () {
                return $http.get('/api/boards')
                    .then(function (results) {
                        return results.data;
                    })
                ;
            };

            boardsService.getBoardData = function (id) {
                return $http.get('/api/boards/' + id)
                    .then(function (results) {
                        return results.data;
                    })
                ;
            };

            boardsService.addBoard = function (name, description) {
                return $http.post('/api/boards', {
                    name: name,
                    description: description
                }).then(function (results) {
                    return results.data;
                });
            };

            boardsService.deleteBoard = function (id) {
                return $http.delete('/api/boards/' + id);
            };

            boardsService.updateBoard = function (id, name, description) {
                return $http.put('/api/boards', {
                    id: id,
                    name: name,
                    description: description
                }).then(function (results) {
                    return results.data;
                });
            }
        }])
    ;
});