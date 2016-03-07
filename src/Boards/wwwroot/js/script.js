require.config({
    paths: {
        'jquery': 'lib/jquery.min'
    }
});

require(['modules/app'], function (app) {
    app.init();
});