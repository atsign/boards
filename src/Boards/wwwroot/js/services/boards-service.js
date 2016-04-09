define(['angular'], function (angular) {
    angular.module('boards-app')
        .service('boardsService', function ($http) {
            var boardsService = this;

            boardsService.getBoards = function () {
                return $http.get('/api/boards')
                    .then(function (results) {
                        return results.data;
                    })
                ;
            };
        })
    ;
});