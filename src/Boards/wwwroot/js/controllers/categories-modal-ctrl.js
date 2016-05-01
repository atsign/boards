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

            categoriesModal.saveClicked = function (name, colorCode, id) {
                var servicePromise;
                categoriesModal.ctaText = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin"></i> Saving');
                categoriesModal.saving = true;

                if ($scope.modalMethod === 'new') {
                    servicePromise = categoriesService.addCategory(name, colorCode, $scope.boardId);
                }/* else if ($scope.modalMethod === 'update') {
                    servicePromise = boardsService.updateBoard(id, name, description);
                }*/

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

            /*

            function openUpdateModal(event, id, name, description) {
                boardsModal.name = name;
                boardsModal.id = id;
                boardsModal.description = description;

                $scope.modalMethod = "update";
                $scope.modalTitle = "Update Board";
                $scope.modalActive = true;
            };

            $scope.$on('openUpdateModal', openUpdateModal);
*/
        });
    ;
});