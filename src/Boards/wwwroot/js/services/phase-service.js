define(['angular'], function (angular) {
    angular.module('boards-app')
        .service('phaseService', ['$http', '$q', function ($http, $q) {
            var phaseService = this;

            phaseService.deletePhase = function (phaseId, boardId) {
                return $http.delete('/api/boards/' + boardId + '/phases/' + phaseId)
                    .catch(function (err) {
                        return $q.reject(err.data.exception);
                    })
                ;
            };

            phaseService.addPhase = function (name, boardId) {
                return $http.post('/api/boards/' + boardId + '/phases', {
                    name: name,
                }).then(function (results) {
                    return results.data;
                });
            };

            phaseService.updatePhase = function (phaseId, name, boardId) {
                return $http.put('/api/boards/' + boardId + '/phases', {
                    id: phaseId,
                    name: name
                }).then(function (results) {
                    return results.data;
                });
            };
        }])
    ;
});