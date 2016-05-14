define(['angular', 'lib/sortable.min'], function (angular, Sortable) {
    angular.module('boards-app')
        .controller('PhaseCtrl', function ($scope, $element, taskService) {
            var phaseCtrl = this;

            phaseCtrl.item = $scope.item;
            phaseCtrl.boardId = $scope.boardId;

            phaseCtrl.itemClicked = function () {
                console.log('Item Clicked');
            };

            phaseCtrl.onTaskChange = function (e) {
                var taskViewModel = {
                    id: e.item.attributes['data-task-id'].value,
                    name: e.item.attributes['data-task-name'].value,
                    description: e.item.attributes['data-task-description'].value,
                    categoryId: e.item.attributes['data-category-id'].value,
                    phaseId: e.srcElement.attributes['data-phase-id'].value,
                    order: e.newIndex + 1
                };

                taskService.updateTask(taskViewModel, phaseCtrl.boardId)
                    .catch(function () {
                        alert("There was an issue updating this task's data. Please try again.");
                        $scope.$parent.updateBoardData();
                    })
                ;
            };

            new Sortable($element.find('div')[0], {
                forceFallback: true,
                fallbackClass: 'is-dragging',
                ghostClass: 'placeholder',
                group: 'phase',
                onAdd: phaseCtrl.onTaskChange,
                onUpdate: phaseCtrl.onTaskChange
            });
        });
    ;
});