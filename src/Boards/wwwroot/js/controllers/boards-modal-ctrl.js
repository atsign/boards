define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('BoardsModalCtrl', function (boardsService, $sce, $scope) {
            var boardsModal = this;

            boardsModal.ctaText = $sce.trustAsHtml("Save");
            boardsModal.saving = false;

            boardsModal.closeModal = function () {
                $scope.modalActive = false;
            }

            boardsModal.saveClicked = function (name, description) {
                boardsModal.ctaText = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin"></i> Saving');
                boardsModal.saving = true;
                /*
                boardsService.addBoard(name, description)
                    .then(function (results) {
                        console.log('Board saved.', results);
                    }, function (err) {
                        console.log("Board save failed", err);
                    })
                ;
                */
            }
        });
    ;
});