define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('CategoriesCtrl', function () {
            var categoriesCtrl = this;

            categoriesCtrl.modalActive = false;

            categoriesCtrl.newCategoryClicked = function () {
                categoriesCtrl.modalTitle = "Add a Category";
                categoriesCtrl.modalActive = true;
                categoriesCtrl.modalMethod = "new";
                categoriesCtrl.modalColorCode = 1;
            };
        });
    ;
});