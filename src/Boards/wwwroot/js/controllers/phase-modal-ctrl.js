define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('PhaseModalCtrl', ['phaseService', '$sce', '$scope', function (phaseService, $sce, $scope) {
            var phaseModal = this;

            phaseModal.ctaText = $sce.trustAsHtml("Save");
            phaseModal.saving = false;
            phaseModal.serverErrorMessage = '';

            phaseModal.closeModal = function () {
                resetModal();
            };

            phaseModal.saveClicked = function (name, id) {
                var servicePromise;
                phaseModal.ctaText = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin"></i> Saving');
                phaseModal.saving = true;

                if ($scope.phaseModalMethod === 'new') {
                    servicePromise = phaseService.addPhase(name, $scope.boardId);
                } else if ($scope.phaseModalMethod === 'update') {
                    servicePromise = phaseService.updatePhase(id, name, $scope.boardId);
                }

                servicePromise
                    .then(function () {
                        $scope.$parent.updateBoardData();
                        resetModal();
                    })
                    .catch(function (err) {
                        phaseModal.serverErrorMessage = err.data.message;
                        phaseModal.saving = false;
                        phaseModal.ctaText = $sce.trustAsHtml('Save');
                    })
                ;
            };

            function openUpdateModal(event, id, name) {
                phaseModal.name = name;
                phaseModal.id = id;

                $scope.phaseModalMethod = "update";
                $scope.phaseModalTitle = "Rename Phase";
                $scope.phaseModalActive = true;
            };

            function resetModal() {
                phaseModal.name = '';
                phaseModal.serverErrorMessage = '';
                phaseModal.saving = false;
                phaseModal.ctaText = $sce.trustAsHtml('Save');

                $scope.phaseModalActive = false;

                $scope.form.$setPristine()
                $scope.form.$setUntouched();
            }

            $scope.$on('openPhaseUpdateModal', openUpdateModal);
        }]);
    ;
});