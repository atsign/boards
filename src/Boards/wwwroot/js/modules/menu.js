define(['jquery'], function ($) {
    var MENU = MENU || {};

    MENU.$trigger = $('[data-action="menu-trigger"]');
    MENU.$triggerContainer = $('#menu-trigger-container');
    MENU.$caret = MENU.$trigger.find('i');

    MENU.init = function () {
        if (MENU.$trigger.is('*')) {
            MENU.initEvents();
        }
    };

    MENU.initEvents = function() {
        MENU.$trigger.on('click.menu', MENU.triggerClicked);

        MENU.$triggerContainer.on('click.menu', function (e) {
            e.stopPropagation();
        });

        $('body').on('click.menu', function () {
            MENU.$triggerContainer.removeClass('active');
            MENU.toggleCaret();
        });
    };

    MENU.triggerClicked = function () {
        MENU.$triggerContainer.toggleClass('active');
        MENU.toggleCaret();
    };

    MENU.toggleCaret = function () {
        if (MENU.$triggerContainer.hasClass('active')) {
            MENU.$caret
                .removeClass('fa-caret-down')
                .addClass('fa-caret-up')
            ;
        } else {
            MENU.$caret
                .addClass('fa-caret-down')
                .removeClass('fa-caret-up')
            ;
        }
    }

    return MENU;
});