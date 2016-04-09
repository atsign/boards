define(['angular'], function (agnular) {
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
            'directives/boards',
            'services/boards-service'
        ]);
    };

    return APP;
});