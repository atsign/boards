define(['angular'], function (angular) {
    angular.module('boards-app')
        .service('taskService', ['$http', function ($http) {
            var taskService = this;

            taskService.updateTask = function (taskViewModel, boardId) {
                return $http.put('/api/boards/' + boardId + '/tasks', taskViewModel)
                    .then(function (results) {
                        return results.data;
                    })
                ;
            };

            taskService.addTask = function (taskViewModel, boardId) {
                return $http.post('/api/boards/' + boardId + '/tasks', taskViewModel)
                    .then(function (results) {
                        return results.data
                    })
                ;
            };

            taskService.deleteTask = function (id, boardId) {
                return $http.delete('/api/boards/' + boardId + '/tasks/' + id);
            }
        }])
    ;
});