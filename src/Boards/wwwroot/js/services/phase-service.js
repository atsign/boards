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
        }])
    ;
});