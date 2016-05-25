define(['angular', 'lib/sortable.min'], function (angular, Sortable) {
    angular.module('boards-app')
        .controller('PhaseCtrl', ['$scope', '$element', '$filter', 'taskService', 'phaseService', function ($scope, $element, $filter, taskService, phaseService) {
            var phaseCtrl = this;

            phaseCtrl.item = $scope.item;
            phaseCtrl.boardId = $scope.boardId;
            phaseCtrl.phaseCount = $scope.phaseCount;

            phaseCtrl.getCategoryColor = function (categoryId) {
                var category = $filter('getCategoryById')($scope.boardCategories(), categoryId);
                return category.colorCode;
            };

            phaseCtrl.itemClicked = function (e) {
                var taskViewModel = getTaskViewModelFromDom(e.target, e.target.parentNode);
                $scope.$parent.$parent.$broadcast('openUpdateTaskModal', taskViewModel);
            };

            phaseCtrl.onTaskChange = function (e) {
                e.item.attributes['data-order'].value = e.newIndex + 1;
                var taskViewModel = getTaskViewModelFromDom(e.item, e.srcElement);

                taskService.updateTask(taskViewModel, phaseCtrl.boardId)
                    .catch(function () {
                        alert("There was an issue updating this task's data. Please try again.");
                        $scope.$parent.updateBoardData();
                    })
                ;
            };

            phaseCtrl.deletePhase = function (id, name) {
                if (!window.confirm("Are you sure you want to delete the phase \"" + name + "\"?")) {
                    return;
                }

                phaseService.deletePhase(id, phaseCtrl.boardId)
                    .then(function() {
                        $scope.$parent.updateBoardData();
                    })
                    .catch(function(err) {
                        alert(err);
                    });
                ;
            };

            phaseCtrl.openPhaseUpdateModal = function (phaseId, name) {
                $scope.$parent.openPhaseUpdateModal(phaseId, name);
            };

            new Sortable($element.find('div')[0], {
                forceFallback: true,
                fallbackClass: 'is-dragging',
                ghostClass: 'placeholder',
                group: 'phase',
                onAdd: phaseCtrl.onTaskChange,
                onUpdate: phaseCtrl.onTaskChange
            });

            function getTaskViewModelFromDom(taskElem, phaseElem) {
                return {
                    id: taskElem.attributes['data-task-id'].value,
                    name: taskElem.attributes['data-task-name'].value,
                    description: taskElem.attributes['data-task-description'].value,
                    categoryId: taskElem.attributes['data-category-id'].value,
                    phaseId: phaseElem.attributes['data-phase-id'].value,
                    order: taskElem.attributes['data-order'].value
                }
            }
        }]);
    ;
});