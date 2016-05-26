angular.module('templates-main', ['../wwwroot/js/templates/boards-list.tpl.html', '../wwwroot/js/templates/boards-modal.tpl.html', '../wwwroot/js/templates/categories-list.tpl.html', '../wwwroot/js/templates/categories-modal.tpl.html', '../wwwroot/js/templates/phase-modal.tpl.html', '../wwwroot/js/templates/phase.tpl.html', '../wwwroot/js/templates/single-board.tpl.html', '../wwwroot/js/templates/task-modal.tpl.html']);

angular.module("../wwwroot/js/templates/boards-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../wwwroot/js/templates/boards-list.tpl.html",
    "<ul ng-show=\"boardsList.items\">\n" +
    "    <li ng-repeat=\"board in boardsList.items\">\n" +
    "        <a href=\"/boards/{{board.id}}\">{{board.name}}</a>\n" +
    "        <span class=\"controls\">\n" +
    "            <i class=\"fa fa-pencil-square-o\" ng-click=\"boardsList.updateBoard(board.id, board.name, board.description)\"></i> <i class=\"fa fa-trash-o\" ng-click=\"boardsList.deleteBoard(board.id, board.name)\"></i>\n" +
    "        </span>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "<p class=\"message\" ng-hide=\"boardsList.haveLoaded\">\n" +
    "    <em><i class=\"fa fa-spinner fa-spin\"></i> Loading Boards</em>\n" +
    "</p>\n" +
    "<p class=\"message\" ng-show=\"boardsList.items && boardsList.items.length == 0\">\n" +
    "    <em>You don't have any boards yet.</em>\n" +
    "</p>\n" +
    "");
}]);

angular.module("../wwwroot/js/templates/boards-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../wwwroot/js/templates/boards-modal.tpl.html",
    "<div class=\"modal-content\">\n" +
    "    <form novalidate name=\"form\">\n" +
    "        <button type=\"button\" class=\"modal-close\" ng-click=\"boardsModal.closeModal()\"><i class=\"fa fa-times\"></i></button>\n" +
    "        <h2>{{modalTitle}}</h2>\n" +
    "        <div class=\"form-message\" ng-show=\"boardsModal.serverErrorMessage.length > 0\">\n" +
    "            {{boardsModal.serverErrorMessage}}\n" +
    "        </div>\n" +
    "        <label for=\"board-name-input\">Name</label>\n" +
    "        <input type=\"text\" value=\"\" id=\"board-name-input\" name=\"boardNameInput\" ng-model=\"boardsModal.name\" ng-disabled=\"boardsModal.saving\" required ng-maxlength=\"255\" />\n" +
    "        <div class=\"form-message\" ng-show=\"form.$submitted || form.boardNameInput.$touched\">\n" +
    "            <div ng-show=\"form.boardNameInput.$error.required\">Board name is required</div>\n" +
    "            <div ng-show=\"form.boardNameInput.$error.maxlength\">Board name must be less than 256 characters</div>\n" +
    "        </div>\n" +
    "        <label for=\"board-description-textarea\">Description</label>\n" +
    "        <textarea name=\"boardDescriptionTextarea\" id=\"board-description-textarea\" ng-model=\"boardsModal.description\" ng-disabled=\"boardsModal.saving\" ng-maxlength=\"2048\"></textarea>\n" +
    "        <div class=\"form-message\" ng-show=\"form.$submitted || form.boardDescriptionTextarea.$touched\">\n" +
    "            <div ng-show=\"form.boardDescriptionTextarea.$error.maxlength\">Board description must be less than 2048 characters</div>\n" +
    "        </div>\n" +
    "        <button type=\"submit\" ng-click=\"form.$valid && boardsModal.saveClicked(boardsModal.name, boardsModal.description, boardsModal.id)\" ng-disabled=\"boardsModal.saving\"><span ng-bind-html=\"boardsModal.ctaText\"></span></button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../wwwroot/js/templates/categories-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../wwwroot/js/templates/categories-list.tpl.html",
    "<ul>\n" +
    "    <li ng-repeat=\"category in categoriesList.items\" ng-class=\"'category category-' + category.colorCode\">\n" +
    "        <a href=\"#\" ng-click=\"categoriesList.updateCategory(category.id, category.name, category.colorCode)\">{{category.name}}</a>\n" +
    "        <span class=\"controls\" ng-if=\"categoriesList.items.length > 1\">\n" +
    "            <i class=\"fa fa-trash-o\" ng-click=\"categoriesList.deleteCategory(category.id, category.name)\"></i>\n" +
    "        </span>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "<p class=\"message\" ng-hide=\"categoriesList.haveLoaded\">\n" +
    "    <em><i class=\"fa fa-spinner fa-spin\"></i> Loading Boards</em>\n" +
    "</p>\n" +
    "");
}]);

angular.module("../wwwroot/js/templates/categories-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../wwwroot/js/templates/categories-modal.tpl.html",
    "<div class=\"modal-content\">\n" +
    "    <form novalidate name=\"form\">\n" +
    "        <button type=\"button\" class=\"modal-close\" ng-click=\"categoriesModal.closeModal()\"><i class=\"fa fa-times\"></i></button>\n" +
    "        <h2>{{modalTitle}}</h2>\n" +
    "        <div class=\"form-message\" ng-show=\"categoryModal.serverErrorMessage.length > 0\">\n" +
    "            {{categoryModal.serverErrorMessage}}\n" +
    "        </div>\n" +
    "        <label for=\"category-name-input\">Name</label>\n" +
    "        <input type=\"text\" value=\"\" id=\"category-name-input\" name=\"categoryNameInput\" ng-model=\"categoriesModal.name\" ng-disabled=\"categoriesModal.saving\" required ng-maxlength=\"100\" />\n" +
    "        <div class=\"form-message\" ng-show=\"form.$submitted || form.categoryNameInput.$touched\">\n" +
    "            <div ng-show=\"form.categoryNameInput.$error.required\">Category name is required</div>\n" +
    "            <div ng-show=\"form.categoryNameInput.$error.maxlength\">Category name must be 100 characters or less</div>\n" +
    "        </div>\n" +
    "        <label>Color</label>\n" +
    "        <div id=\"category-color-picker\">\n" +
    "            <div ng-repeat=\"i in [1,2,3,4,5,6,7,8] track by $index\"\n" +
    "                 ng-class=\"'color color-' + i + (modalColorCode === i ? ' selected' : '')\"\n" +
    "                 ng-click=\"categoriesModal.selectColorCode(i)\">\n" +
    "                <i class=\"fa fa-check-circle-o\"></i>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <button type=\"submit\" ng-click=\"form.$valid && categoriesModal.saveClicked(categoriesModal.name, modalColorCode, categoriesModal.categoryId)\" ng-disabled=\"categoriesModal.saving\"><span ng-bind-html=\"categoriesModal.ctaText\"></span></button>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("../wwwroot/js/templates/phase-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../wwwroot/js/templates/phase-modal.tpl.html",
    "<div class=\"modal-content\">\n" +
    "    <form novalidate name=\"form\">\n" +
    "        <button type=\"button\" class=\"modal-close\" ng-click=\"phaseModal.closeModal()\"><i class=\"fa fa-times\"></i></button>\n" +
    "        <h2>{{phaseModalTitle}}</h2>\n" +
    "        <div class=\"form-message\" ng-show=\"phaseModal.serverErrorMessage.length > 0\">\n" +
    "            {{phaseModal.serverErrorMessage}}\n" +
    "        </div>\n" +
    "        <label for=\"phase-name-input\">Name</label>\n" +
    "        <input type=\"text\" value=\"\" id=\"phase-name-input\" name=\"phaseNameInput\" ng-model=\"phaseModal.name\" ng-disabled=\"phaseModal.saving\" required ng-maxlength=\"20\" />\n" +
    "        <div class=\"form-message\" ng-show=\"form.$submitted || form.phaseNameInput.$touched\">\n" +
    "            <div ng-show=\"form.phaseNameInput.$error.required\">Phase name is required</div>\n" +
    "            <div ng-show=\"form.phaseNameInput.$error.maxlength\">Phase name must be 20 characters or less</div>\n" +
    "        </div>\n" +
    "        <button type=\"submit\" ng-click=\"form.$valid && phaseModal.saveClicked(phaseModal.name, phaseModal.id)\" ng-disabled=\"phaseModal.saving\"><span ng-bind-html=\"phaseModal.ctaText\"></span></button>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("../wwwroot/js/templates/phase.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../wwwroot/js/templates/phase.tpl.html",
    "<h2>\n" +
    "    {{phaseCtrl.item().phase.name}}\n" +
    "    <span class=\"controls\">\n" +
    "        <i class=\"fa fa-pencil-square-o\"\n" +
    "           ng-click=\"phaseCtrl.openPhaseUpdateModal(phaseCtrl.item().phase.id, phaseCtrl.item().phase.name)\">\n" +
    "        </i>\n" +
    "\n" +
    "        <i class=\"fa fa-trash-o\"\n" +
    "           ng-click=\"phaseCtrl.deletePhase(phaseCtrl.item().phase.id, phaseCtrl.item().phase.name)\">\n" +
    "        </i>\n" +
    "    </span>\n" +
    "</h2>\n" +
    "<div class=\"items\" data-phase-id=\"{{phaseCtrl.item().phase.id}}\">\n" +
    "    <div class=\"item category-{{phaseCtrl.getCategoryColor(task.categoryId)}}\"\n" +
    "         data-task-id=\"{{task.id}}\"\n" +
    "         data-task-name=\"{{task.name}}\"\n" +
    "         data-task-description=\"{{task.description}}\"\n" +
    "         data-category-id=\"{{task.categoryId}}\"\n" +
    "         data-order=\"{{task.order}}\"\n" +
    "         ng-repeat=\"task in phaseCtrl.item().tasks\"\n" +
    "         ng-click=\"phaseCtrl.itemClicked($event)\">\n" +
    "            {{task.name}}\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("../wwwroot/js/templates/single-board.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../wwwroot/js/templates/single-board.tpl.html",
    "<div id=\"board-controls\">\n" +
    "    <button ng-click=\"boardCtrl.newTaskClicked()\" class=\"new-item\"><i class=\"fa fa-plus\"></i> New Task</button>\n" +
    "    <a href=\"{{boardCtrl.categoryUrl}}\" class=\"cta-button categories\">Categories</a>\n" +
    "</div>\n" +
    "<div id=\"board\">\n" +
    "    <button class=\"add-phase\" ng-click=\"boardCtrl.newPhaseClicked()\"><i class=\"fa fa-plus\"></i> New Phase</button>\n" +
    "    <div phase\n" +
    "         class=\"phase\"\n" +
    "         item=\"item\"\n" +
    "         board-id=\"{{boardCtrl.boardId}}\"\n" +
    "         phase-count=\"{{boardCtrl.taskData.length}}\"\n" +
    "         board-categories=\"boardCtrl.categories\"\n" +
    "         ng-repeat=\"item in boardCtrl.taskData\">\n" +
    "    </div>\n" +
    "    <p class=\"message\" ng-hide=\"boardCtrl.hasLoaded\">\n" +
    "        <i class=\"fa fa-spinner fa-spin\"></i> Loading tasks\n" +
    "    </p>\n" +
    "</div>\n" +
    "\n" +
    "<div task-modal\n" +
    "     task-modal-title=\"boardCtrl.taskModalTitle\"\n" +
    "     task-modal-active=\"boardCtrl.taskModalActive\"\n" +
    "     task-modal-method=\"boardCtrl.taskModalMethod\"\n" +
    "     board-categories=\"boardCtrl.categories\"\n" +
    "     default-phase-id=\"boardCtrl.defaultPhaseId\"\n" +
    "     reset-board=\"boardCtrl.updateBoardData()\"\n" +
    "     ng-class=\"['modal', {active: boardCtrl.taskModalActive}]\"\n" +
    "     board-id=\"{{boardCtrl.boardId}}\">\n" +
    "</div>\n" +
    "\n" +
    "<div phase-modal\n" +
    "     phase-modal-title=\"boardCtrl.phaseModalTitle\"\n" +
    "     phase-modal-active=\"boardCtrl.phaseModalActive\"\n" +
    "     phase-modal-method=\"boardCtrl.phaseModalMethod\"\n" +
    "     reset-board=\"boardCtrl.updateBoardData()\"\n" +
    "     ng-class=\"['modal', {active: boardCtrl.phaseModalActive}]\"\n" +
    "     board-id=\"{{boardCtrl.boardId}}\">\n" +
    "</div>");
}]);

angular.module("../wwwroot/js/templates/task-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../wwwroot/js/templates/task-modal.tpl.html",
    "<div class=\"modal-content\">\n" +
    "    <form novalidate name=\"form\">\n" +
    "        <button type=\"button\" class=\"modal-close\" ng-click=\"taskModal.closeModal()\"><i class=\"fa fa-times\"></i></button>\n" +
    "        <h2>{{taskModalTitle}}</h2>\n" +
    "        <button type=\"button\"\n" +
    "                class=\"delete\"\n" +
    "                ng-if=\"taskModalMethod == 'update'\"\n" +
    "                ng-click=\"taskModal.deleteClicked()\"\n" +
    "                ng-disabled=\"taskModal.deleting\">\n" +
    "            Delete Task\n" +
    "        </button>\n" +
    "        <div class=\"form-message\" ng-show=\"taskModal.serverErrorMessage.length > 0\">\n" +
    "            {{taskModal.serverErrorMessage}}\n" +
    "        </div>\n" +
    "        <label for=\"task-name-input\">Name</label>\n" +
    "        <input type=\"text\" value=\"\" id=\"task-name-input\" name=\"taskNameInput\" ng-model=\"taskModal.name\" ng-disabled=\"taskModal.saving\" required ng-maxlength=\"100\" />\n" +
    "        <div class=\"form-message\" ng-show=\"form.$submitted || form.taskNameInput.$touched\">\n" +
    "            <div ng-show=\"form.taskNameInput.$error.required\">Task name is required</div>\n" +
    "            <div ng-show=\"form.taskNameInput.$error.maxlength\">Task name must be less than 100 characters</div>\n" +
    "        </div>\n" +
    "        <label for=\"task-description-textarea\">Description</label>\n" +
    "        <textarea name=\"taskDescriptionTextarea\" id=\"task-description-textarea\" ng-model=\"taskModal.description\" ng-disabled=\"taskModal.saving\" ng-maxlength=\"1024\"></textarea>\n" +
    "        <div class=\"form-message\" ng-show=\"form.$submitted || form.taskDescriptionTextarea.$touched\">\n" +
    "            <div ng-show=\"form.taskDescriptionTextarea.$error.maxlength\">Task description must be less than 1024 characters</div>\n" +
    "        </div>\n" +
    "        <label for=\"task-category-select\">Category</label>\n" +
    "        <select id=\"task-category-select\"\n" +
    "                ng-model=\"taskModal.category\"\n" +
    "                ng-options=\"category.name for category in boardCategories() track by category.id\"\n" +
    "                ng-disabled=\"taskModal.saving\">\n" +
    "        </select>\n" +
    "        <button type=\"submit\"\n" +
    "                ng-click=\"form.$valid && taskModal.saveClicked(taskModal.name, taskModal.description, taskModal.category.id, taskModal.phaseId, taskModal.order, taskModal.taskId)\"\n" +
    "                ng-disabled=\"taskModal.saving\">\n" +
    "            <span ng-bind-html=\"taskModal.ctaText\"></span>\n" +
    "        </button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "");
}]);
