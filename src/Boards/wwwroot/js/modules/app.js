define(['jquery'], function ($) {
    var APP = APP || {};

    APP.init = function () {
        var moduleInit = function (Module) {
            Module.init();
        };

        require(['modules/menu'], moduleInit);
    };

    return APP;
});