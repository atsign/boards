define(['angular'], function (angular) {
    var APP = APP || {};

    APP.init = function () {
        var moduleInit = function (Module) {
            Module.init();
        };

        // General app modules
        require(['modules/menu'], moduleInit);

        // Angular app modules
        angular.module('boards-app', []);
        require([
            'services/boards-service',
            'controllers/boards-ctrl',
            'controllers/boards-list-ctrl',
            'controllers/boards-modal-ctrl',
            'directives/boards-list-directive',
            'directives/boards-modal-directive'
        ], function () {
            angular.bootstrap(document, ['boards-app']);
        });
    };

    return APP;
});