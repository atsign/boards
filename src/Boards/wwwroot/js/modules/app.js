define(['jquery'], function ($) {
    var APP = APP || {};

    APP.init = function () {
        console.log("app.js init has been called.");
        console.log("typeof $ is " + typeof $);
    };

    return APP;
});