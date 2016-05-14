define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('CategoriesModalCtrl', function (categoriesService, $sce, $scope) {
            var categoriesModal = this;

            categoriesModal.ctaText = $sce.trustAsHtml("Save");
            categoriesModal.saving = false;
            categoriesModal.serverErrorMessage = '';

            categoriesModal.closeModal = function () {
                resetModal();
            };

            function resetModal() {
                categoriesModal.name = '';
                categoriesModal.colorCode = 1;
                categoriesModal.serverErrorMessage = '';
                categoriesModal.saving = false;
                categoriesModal.ctaText = $sce.trustAsHtml('Save');

                $scope.modalActive = false;

                $scope.form.$setPristine()
                $scope.form.$setUntouched();
            }

            categoriesModal.selectColorCode = function (colorCode) {
                $scope.modalColorCode = colorCode;
            };

            categoriesModal.saveClicked = function (name, colorCode, categoryId) {
                var servicePromise;
                categoriesModal.ctaText = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin"></i> Saving');
                categoriesModal.saving = true;

                if ($scope.modalMethod === 'new') {
                    servicePromise = categoriesService.addCategory(name, colorCode, $scope.boardId);
                } else if ($scope.modalMethod === 'update') {
                    servicePromise = categoriesService.updateBoard(categoryId, name, colorCode, $scope.boardId);
                }

                if (servicePromise) {
                    servicePromise
                        .then(function () {
                            resetModal();
                            $scope.$parent.$broadcast('reloadList');
                        }, function (err) {
                            categoriesModal.serverErrorMessage = err.data.message;
                            categoriesModal.saving = false;
                            categoriesModal.ctaText = $sce.trustAsHtml('Save');
                        })
                    ;
                } else {
                    console.log("servicePromise was undefined");
                    alert("There was a problem saving your category. Please try again.");
                }
            };

            function openUpdateModal(event, categoryId, name, colorCode) {
                categoriesModal.name = name;
                categoriesModal.categoryId = categoryId;
                categoriesModal.colorCode = colorCode;

                $scope.modalMethod = "update";
                $scope.modalTitle = "Update Category";
                $scope.modalColorCode = colorCode;
                $scope.modalActive = true;
            };

            $scope.$on('openUpdateModal', openUpdateModal);
        });
    ;
});