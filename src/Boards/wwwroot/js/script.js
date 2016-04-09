require.config({
    paths: {
        'jquery': 'lib/jquery.min',
        'angular': 'lib/angular.min'
    },
    shim: {
        "angular": {
            exports: "angular"
        }
    }
});

require(['modules/app'], function (app) {
    app.init();
});