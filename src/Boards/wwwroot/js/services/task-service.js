define(['angular'], function (angular) {
    angular.module('boards-app')
        .service('taskService', function ($http) {
            var taskService = this;

            taskService.updateTask = function (taskViewModel, boardId) {
                return $http.put('/api/boards/' + boardId + '/tasks', taskViewModel)
                    .then(function (results) {
                        return results.data;
                    })
                ;
            }
        })
    ;
});