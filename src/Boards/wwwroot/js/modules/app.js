﻿define(['angular'], function (angular) {
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
            'services/categories-service',

            'controllers/boards-ctrl',
            'controllers/boards-list-ctrl',
            'controllers/boards-modal-ctrl',

            'controllers/categories-ctrl',
            'controllers/categories-list-ctrl',
            'controllers/categories-modal-ctrl',

            'directives/boards-list-directive',
            'directives/boards-modal-directive',

            'directives/categories-list-directive',
            'directives/categories-modal-directive'
        ], function () {
            angular.bootstrap(document, ['boards-app']);
        });
    };

    return APP;
});