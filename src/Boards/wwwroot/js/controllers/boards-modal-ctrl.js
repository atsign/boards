define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('BoardsModalCtrl', function (boardsService, $sce, $scope) {
            var boardsModal = this;

            boardsModal.ctaText = $sce.trustAsHtml("Save");
            boardsModal.saving = false;
            boardsModal.serverErrorMessage = '';

            boardsModal.closeModal = function () {
                resetModal();
            };

            boardsModal.saveClicked = function (name, description, id) {
                var servicePromise;
                boardsModal.ctaText = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin"></i> Saving');
                boardsModal.saving = true;

                if ($scope.modalMethod === 'new') {
                    servicePromise = boardsService.addBoard(name, description);
                } else if ($scope.modalMethod === 'update') {
                    servicePromise = boardsService.updateBoard(id, name, description);
                }

                servicePromise
                    .then(function () {
                        resetModal();
                        $scope.$parent.$broadcast('reloadList');
                    }, function (err) {
                        boardsModal.serverErrorMessage = err.data.message;
                        boardsModal.saving = false;
                        boardsModal.ctaText = $sce.trustAsHtml('Save');
                    })
                ;
            };

            function openUpdateModal(event, id, name, description) {
                boardsModal.name = name;
                boardsModal.id = id;
                boardsModal.description = description;

                $scope.modalMethod = "update";
                $scope.modalTitle = "Update Board";
                $scope.modalActive = true;
            };

            function resetModal() {
                boardsModal.name = '';
                boardsModal.description = '';
                boardsModal.serverErrorMessage = '';
                boardsModal.saving = false;
                boardsModal.ctaText = $sce.trustAsHtml('Save');

                $scope.modalActive = false;

                $scope.form.$setPristine()
                $scope.form.$setUntouched();
            }

            $scope.$on('openUpdateModal', openUpdateModal);
        });
    ;
});