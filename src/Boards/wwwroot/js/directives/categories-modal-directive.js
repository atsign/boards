define(['angular'], function (angular) {
    angular.module('boards-app')
        .directive('categoriesModal', function () {
            return {
                templateUrl: '../wwwroot/js/templates/categories-modal.tpl.html',
                restrict: 'A',
                controller: 'CategoriesModalCtrl as categoriesModal',
                scope: {
                    modalTitle: '=',
                    modalActive: '=',
                    modalMethod: '=',
                    modalColorCode: '=',
                    boardId: "@"
                }
            };
        })
    ;
});