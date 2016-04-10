define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('BoardsModalCtrl', function (boardsService, $sce, $scope) {
            var boardsModal = this;

            boardsModal.ctaText = $sce.trustAsHtml("Save");
            boardsModal.saving = false;
            boardsModal.serverErrorMessage = '';

            boardsModal.closeModal = function () {
                resetModal();
            }

            boardsModal.saveClicked = function (name, description) {
                boardsModal.ctaText = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin"></i> Saving');
                boardsModal.saving = true;

                boardsService.addBoard(name, description)
                    .then(function () {
                        resetModal();
                        $scope.$parent.$broadcast('reloadList');
                    }, function (err) {
                        boardsModal.serverErrorMessage = err.data.message;
                        boardsModal.saving = false;
                        boardsModal.ctaText = $sce.trustAsHtml('Save');
                    })
                ;
            }

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
        });
    ;
});