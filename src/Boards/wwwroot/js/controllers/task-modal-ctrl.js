define(['angular'], function (angular) {
    angular.module('boards-app')
        .controller('TaskModalCtrl', function (taskService, $scope, $sce, $filter) {
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
                resetModal();
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
                } else if ($scope.taskModalMethod === 'update') {
                    taskViewModel.phaseId = phaseId;
                    taskViewModel.order = order;
                    taskViewModel.id = taskId;
                    servicePromise = taskService.updateTask(taskViewModel, $scope.boardId);
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

            $scope.$on('openUpdateTaskModal', function (e, taskViewModel) {
                $scope.taskModalActive = true;
                $scope.taskModalTitle = "Update Task";
                $scope.taskModalMethod = "update";

                taskModal.name = taskViewModel.name;
                taskModal.description = taskViewModel.description;
                taskModal.category = $filter('getCategoryById')($scope.boardCategories(), taskViewModel.categoryId);
                taskModal.phaseId = taskViewModel.phaseId;
                taskModal.order = taskViewModel.order;
                taskModal.taskId = taskViewModel.id;
            });

            function resetModal() {
                taskModal.name = '';
                taskModal.description = '';
                taskModal.category = $scope.boardCategories()[0];
                taskModal.serverErrorMessage = '';
                taskModal.saving = false;
                taskModal.ctaText = $sce.trustAsHtml('Save');

                $scope.taskModalActive = false;

                $scope.form.$setPristine();
                $scope.form.$setUntouched();
            }
        })
    ;
});