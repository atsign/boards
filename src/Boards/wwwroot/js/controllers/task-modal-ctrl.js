define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('TaskModalCtrl', function (taskService, $scope, $sce) {
            var taskModal = this;

            taskModal.ctaText = $sce.trustAsHtml("Save");
            taskModal.saving = false;
            taskModal.serverErrorMessage = '';

            // Hack to get the category select to default to the first category
            var unregister = $scope.$watch($scope.boardCategories, function (categories) {
                if (categories) {
                    taskModal.category = categories[0];
                    unregister();
                }
            });

            taskModal.closeModal = function () {
                $scope.taskModalActive = false;
            };

            taskModal.saveClicked = function (name, description, categoryId, phaseId, order, taskId) {
                var servicePromise;
                taskModal.ctaText = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin"></i> Saving');
                taskModal.saving = true;

                var taskViewModel = {
                    name: name,
                    description: description,
                    categoryId: categoryId
                };

                if ($scope.taskModalMethod === 'new') {
                    taskViewModel.phaseId = $scope.defaultPhaseId;
                    taskViewModel.order = 1;
                    servicePromise = taskService.addTask(taskViewModel, $scope.boardId);
                }

                servicePromise
                    .then(function () {
                        resetModal();
                        $scope.resetBoard();
                    })
                    .catch(function (err) {
                        taskModal.serverErrorMessage = err.data.message;
                        taskModal.saving = false;
                        taskModal.ctaText = $sce.trustAsHtml('Save');
                    })
                ;
            };

            function resetModal() {
                taskModal.name = '';
                taskModal.description = '';
                taskModal.category = $scope.boardCategories()[0];
                taskModal.serverErrorMessage = '';
                taskModal.saving = false;
                taskModal.ctaText = $sce.trustAsHtml('Save');

                $scope.taskModalActive = false;

                $scope.form.$setPristine()
                $scope.form.$setUntouched();
            }
        })
    ;
});