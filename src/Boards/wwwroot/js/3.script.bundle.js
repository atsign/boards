webpackJsonp([3],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/*!***********************************************!*\
  !*** ./wwwroot/js/services/boards-service.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .service('boardsService', ['$http', function ($http) {
	            var boardsService = this;
	
	            boardsService.getBoards = function () {
	                return $http.get('/api/boards')
	                    .then(function (results) {
	                        return results.data;
	                    })
	                ;
	            };
	
	            boardsService.getBoardData = function (id) {
	                return $http.get('/api/boards/' + id)
	                    .then(function (results) {
	                        return results.data;
	                    })
	                ;
	            };
	
	            boardsService.addBoard = function (name, description) {
	                return $http.post('/api/boards', {
	                    name: name,
	                    description: description
	                }).then(function (results) {
	                    return results.data;
	                });
	            };
	
	            boardsService.deleteBoard = function (id) {
	                return $http.delete('/api/boards/' + id);
	            };
	
	            boardsService.updateBoard = function (id, name, description) {
	                return $http.put('/api/boards', {
	                    id: id,
	                    name: name,
	                    description: description
	                }).then(function (results) {
	                    return results.data;
	                });
	            }
	        }])
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 7 */
/*!***************************************************!*\
  !*** ./wwwroot/js/services/categories-service.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .service('categoriesService', ['$http', function ($http) {
	            var categoriesService = this;
	
	            categoriesService.getCategoriesForBoard = function (boardId) {
	                return $http.get('/api/boards/' + boardId + '/categories')
	                    .then(function (results) {
	                        return results.data;
	                    })
	                ;
	            };
	
	            categoriesService.deleteCategory = function (categoryId, boardId) {
	                return $http.delete('/api/boards/' + boardId + '/categories/' + categoryId);
	            };
	
	            categoriesService.addCategory = function (name, colorCode, boardId) {
	                return $http.post('/api/boards/' + boardId + '/categories', {
	                    name: name,
	                    colorCode: colorCode
	                }).then(function (results) {
	                    return results.data;
	                });
	            };
	
	            categoriesService.updateBoard = function (categoryId, name, colorCode, boardId) {
	                return $http.put('/api/boards/' + boardId + '/categories', {
	                    id: categoryId,
	                    name: name,
	                    colorCode: colorCode
	                }).then(function (results) {
	                    return results.data;
	                });
	            };
	        }])
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 8 */
/*!*********************************************!*\
  !*** ./wwwroot/js/services/task-service.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .service('taskService', ['$http', function ($http) {
	            var taskService = this;
	
	            taskService.updateTask = function (taskViewModel, boardId) {
	                return $http.put('/api/boards/' + boardId + '/tasks', taskViewModel)
	                    .then(function (results) {
	                        return results.data;
	                    })
	                ;
	            };
	
	            taskService.addTask = function (taskViewModel, boardId) {
	                return $http.post('/api/boards/' + boardId + '/tasks', taskViewModel)
	                    .then(function (results) {
	                        return results.data
	                    })
	                ;
	            };
	
	            taskService.deleteTask = function (id, boardId) {
	                return $http.delete('/api/boards/' + boardId + '/tasks/' + id);
	            }
	        }])
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 9 */
/*!**********************************************!*\
  !*** ./wwwroot/js/services/phase-service.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .service('phaseService', ['$http', '$q', function ($http, $q) {
	            var phaseService = this;
	
	            phaseService.deletePhase = function (phaseId, boardId) {
	                return $http.delete('/api/boards/' + boardId + '/phases/' + phaseId)
	                    .catch(function (err) {
	                        return $q.reject(err.data.exception);
	                    })
	                ;
	            };
	
	            phaseService.addPhase = function (name, boardId) {
	                return $http.post('/api/boards/' + boardId + '/phases', {
	                    name: name,
	                }).then(function (results) {
	                    return results.data;
	                });
	            };
	
	            phaseService.updatePhase = function (phaseId, name, boardId) {
	                return $http.put('/api/boards/' + boardId + '/phases', {
	                    id: phaseId,
	                    name: name
	                }).then(function (results) {
	                    return results.data;
	                });
	            };
	        }])
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 10 */
/*!***********************************************!*\
  !*** ./wwwroot/js/controllers/boards-ctrl.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .controller('BoardsCtrl', function () {
	            var boardsCtrl = this;
	
	            boardsCtrl.modalActive = false;
	
	            boardsCtrl.newBoardClicked = function () {
	                boardsCtrl.modalTitle = "Add a Board";
	                boardsCtrl.modalActive = true;
	                boardsCtrl.modalMethod = "new";
	            };
	        });
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 11 */
/*!****************************************************!*\
  !*** ./wwwroot/js/controllers/boards-list-ctrl.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .controller('BoardsListCtrl', ['boardsService', '$scope', function (boardsService, $scope) {
	            var boardsList = this;
	
	            boardsList.haveLoaded = false;
	
	            boardsList.reloadList = function () {
	                boardsService.getBoards().then(function (items) {
	                    boardsList.items = items;
	                    boardsList.haveLoaded = true;
	                });
	            };
	
	            boardsList.deleteBoard = function (id, name) {
	                if (window.confirm('Are you sure you want to delete "' + name + '"? This will also delete all of its tasks and categories.')) {
	                    boardsService.deleteBoard(id)
	                        .then(function () {
	                            boardsList.reloadList();
	                        }, function (err) {
	                            alert('Unable to delete "' + name + '." Please try again.');
	                            console.log(err);
	                        })
	                    ;
	                }
	            };
	
	            boardsList.updateBoard = function (id, name, description) {
	                $scope.$parent.$broadcast('openUpdateModal', id, name, description);
	            };
	
	            boardsList.reloadList();
	
	            $scope.$on('reloadList', boardsList.reloadList);
	        }]);
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 12 */
/*!*****************************************************!*\
  !*** ./wwwroot/js/controllers/boards-modal-ctrl.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .controller('BoardsModalCtrl', ['boardsService', '$sce', '$scope', '$window', function (boardsService, $sce, $scope, $window) {
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
	                    .then(function (newBoard) {
	                        if ($scope.modalMethod === 'new') {
	                            $window.location.href = "/boards/" + newBoard.id;
	                        } else {
	                            resetModal();
	                            $scope.$parent.$broadcast('reloadList');
	                        }
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
	        }]);
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 13 */
/*!***************************************************!*\
  !*** ./wwwroot/js/controllers/categories-ctrl.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .controller('CategoriesCtrl', function () {
	            var categoriesCtrl = this;
	
	            categoriesCtrl.modalActive = false;
	
	            categoriesCtrl.newCategoryClicked = function () {
	                categoriesCtrl.modalTitle = "Add a Category";
	                categoriesCtrl.modalActive = true;
	                categoriesCtrl.modalMethod = "new";
	                categoriesCtrl.modalColorCode = 1;
	            };
	        });
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 14 */
/*!********************************************************!*\
  !*** ./wwwroot/js/controllers/categories-list-ctrl.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .controller('CategoriesListCtrl', ['categoriesService', '$scope', function (categoriesService, $scope) {
	            var categoriesList = this;
	            var boardId = $scope.boardId;
	
	            categoriesList.haveLoaded = false;
	
	            categoriesList.reloadList = function () {
	                categoriesService.getCategoriesForBoard(boardId).then(function (items) {
	                    categoriesList.items = items;
	                    categoriesList.haveLoaded = true;
	                });
	            };
	
	            categoriesList.deleteCategory = function (categoryId, name) {
	                if (window.confirm("Are you sure you want to delete the '" + name + "' category?")) {
	                    categoriesService.deleteCategory(categoryId, boardId)
	                        .then(function () {
	                            categoriesList.reloadList();
	                        })
	                        .catch(function (err) {
	                            alert('Unable to delete "' + name + '." ' + err.data.exception);
	                        })
	                    ;
	                }
	            };
	
	            categoriesList.updateCategory = function (categoryId, name, colorCode) {
	                $scope.$parent.$broadcast('openUpdateModal', categoryId, name, colorCode);
	            };
	
	            categoriesList.reloadList();
	
	            $scope.$on('reloadList', categoriesList.reloadList);
	        }])
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 15 */
/*!*********************************************************!*\
  !*** ./wwwroot/js/controllers/categories-modal-ctrl.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .controller('CategoriesModalCtrl', ['categoriesService', '$sce', '$scope', function (categoriesService, $sce, $scope) {
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
	
	            categoriesModal.saveClicked = function (name, colorCode, categoryId) {
	                var servicePromise;
	                categoriesModal.ctaText = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin"></i> Saving');
	                categoriesModal.saving = true;
	
	                if ($scope.modalMethod === 'new') {
	                    servicePromise = categoriesService.addCategory(name, colorCode, $scope.boardId);
	                } else if ($scope.modalMethod === 'update') {
	                    servicePromise = categoriesService.updateBoard(categoryId, name, colorCode, $scope.boardId);
	                }
	
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
	
	            function openUpdateModal(event, categoryId, name, colorCode) {
	                categoriesModal.name = name;
	                categoriesModal.categoryId = categoryId;
	                categoriesModal.colorCode = colorCode;
	
	                $scope.modalMethod = "update";
	                $scope.modalTitle = "Update Category";
	                $scope.modalColorCode = colorCode;
	                $scope.modalActive = true;
	            };
	
	            $scope.$on('openUpdateModal', openUpdateModal);
	        }]);
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 16 */
/*!*****************************************************!*\
  !*** ./wwwroot/js/controllers/single-board-ctrl.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .controller('SingleBoardCtrl', ['boardsService', '$scope', function (boardsService, $scope) {
	            var boardCtrl = this;
	
	            boardCtrl.categoryUrl = $scope.categoryUrl;
	            boardCtrl.hasLoaded = false;
	            boardCtrl.boardId = $scope.boardId;
	
	            boardCtrl.updateBoardData = function () {
	                boardCtrl.hasLoaded = false;
	
	                boardsService.getBoardData(boardCtrl.boardId)
	                    .then(function (data) {
	                        boardCtrl.taskData = data.taskData;
	                        boardCtrl.categories = data.categories;
	                        boardCtrl.defaultPhaseId = data.taskData[0].phase.id;
	                        boardCtrl.hasLoaded = true;
	                    })
	                ;
	            };
	
	            boardCtrl.newTaskClicked = function () {
	                boardCtrl.taskModalActive = true;
	                boardCtrl.taskModalTitle = "Add a Task";
	                boardCtrl.taskModalMethod = "new";
	            };
	
	            boardCtrl.newPhaseClicked = function () {
	                boardCtrl.phaseModalActive = true;
	                boardCtrl.phaseModalTitle = "Add a Phase";
	                boardCtrl.phaseModalMethod = "new";
	            };
	
	            boardCtrl.openPhaseUpdateModal = function (phaseId, name) {
	                $scope.$broadcast('openPhaseUpdateModal', phaseId, name);
	            }
	
	            boardCtrl.updateBoardData();
	
	            $scope.updateBoardData = boardCtrl.updateBoardData;
	            $scope.openPhaseUpdateModal = boardCtrl.openPhaseUpdateModal;
	        }]);
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 17 */
/*!**********************************************!*\
  !*** ./wwwroot/js/controllers/phase-ctrl.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2), __webpack_require__(/*! lib/sortable.min */ 18)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular, Sortable) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 18 */
/*!****************************************!*\
  !*** ./wwwroot/js/lib/sortable.min.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! Sortable 1.4.2 - MIT | git://github.com/rubaxa/Sortable.git */
	!function (a) { "use strict";  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (a), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = a() : "undefined" != typeof Package ? Sortable = a() : window.Sortable = a() }(function () { "use strict"; function a(a, b) { if (!a || !a.nodeType || 1 !== a.nodeType) throw "Sortable: `el` must be HTMLElement, and not " + {}.toString.call(a); this.el = a, this.options = b = r({}, b), a[L] = this; var c = { group: Math.random(), sort: !0, disabled: !1, store: null, handle: null, scroll: !0, scrollSensitivity: 30, scrollSpeed: 10, draggable: /[uo]l/i.test(a.nodeName) ? "li" : ">*", ghostClass: "sortable-ghost", chosenClass: "sortable-chosen", ignore: "a, img", filter: null, animation: 0, setData: function (a, b) { a.setData("Text", b.textContent) }, dropBubble: !1, dragoverBubble: !1, dataIdAttr: "data-id", delay: 0, forceFallback: !1, fallbackClass: "sortable-fallback", fallbackOnBody: !1 }; for (var d in c) !(d in b) && (b[d] = c[d]); V(b); for (var f in this) "_" === f.charAt(0) && (this[f] = this[f].bind(this)); this.nativeDraggable = b.forceFallback ? !1 : P, e(a, "mousedown", this._onTapStart), e(a, "touchstart", this._onTapStart), this.nativeDraggable && (e(a, "dragover", this), e(a, "dragenter", this)), T.push(this._onDragOver), b.store && this.sort(b.store.get(this)) } function b(a) { v && v.state !== a && (h(v, "display", a ? "none" : ""), !a && v.state && w.insertBefore(v, s), v.state = a) } function c(a, b, c) { if (a) { c = c || N, b = b.split("."); var d = b.shift().toUpperCase(), e = new RegExp("\\s(" + b.join("|") + ")(?=\\s)", "g"); do if (">*" === d && a.parentNode === c || ("" === d || a.nodeName.toUpperCase() == d) && (!b.length || ((" " + a.className + " ").match(e) || []).length == b.length)) return a; while (a !== c && (a = a.parentNode)) } return null } function d(a) { a.dataTransfer && (a.dataTransfer.dropEffect = "move"), a.preventDefault() } function e(a, b, c) { a.addEventListener(b, c, !1) } function f(a, b, c) { a.removeEventListener(b, c, !1) } function g(a, b, c) { if (a) if (a.classList) a.classList[c ? "add" : "remove"](b); else { var d = (" " + a.className + " ").replace(K, " ").replace(" " + b + " ", " "); a.className = (d + (c ? " " + b : "")).replace(K, " ") } } function h(a, b, c) { var d = a && a.style; if (d) { if (void 0 === c) return N.defaultView && N.defaultView.getComputedStyle ? c = N.defaultView.getComputedStyle(a, "") : a.currentStyle && (c = a.currentStyle), void 0 === b ? c : c[b]; b in d || (b = "-webkit-" + b), d[b] = c + ("string" == typeof c ? "" : "px") } } function i(a, b, c) { if (a) { var d = a.getElementsByTagName(b), e = 0, f = d.length; if (c) for (; f > e; e++) c(d[e], e); return d } return [] } function j(a, b, c, d, e, f, g) { var h = N.createEvent("Event"), i = (a || b[L]).options, j = "on" + c.charAt(0).toUpperCase() + c.substr(1); h.initEvent(c, !0, !0), h.to = b, h.from = e || b, h.item = d || b, h.clone = v, h.oldIndex = f, h.newIndex = g, b.dispatchEvent(h), i[j] && i[j].call(a, h) } function k(a, b, c, d, e, f) { var g, h, i = a[L], j = i.options.onMove; return g = N.createEvent("Event"), g.initEvent("move", !0, !0), g.to = b, g.from = a, g.dragged = c, g.draggedRect = d, g.related = e || b, g.relatedRect = f || b.getBoundingClientRect(), a.dispatchEvent(g), j && (h = j.call(i, g)), h } function l(a) { a.draggable = !1 } function m() { R = !1 } function n(a, b) { var c = a.lastElementChild, d = c.getBoundingClientRect(); return (b.clientY - (d.top + d.height) > 5 || b.clientX - (d.right + d.width) > 5) && c } function o(a) { for (var b = a.tagName + a.className + a.src + a.href + a.textContent, c = b.length, d = 0; c--;) d += b.charCodeAt(c); return d.toString(36) } function p(a) { var b = 0; if (!a || !a.parentNode) return -1; for (; a && (a = a.previousElementSibling) ;) "TEMPLATE" !== a.nodeName.toUpperCase() && b++; return b } function q(a, b) { var c, d; return function () { void 0 === c && (c = arguments, d = this, setTimeout(function () { 1 === c.length ? a.call(d, c[0]) : a.apply(d, c), c = void 0 }, b)) } } function r(a, b) { if (a && b) for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]); return a } var s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J = {}, K = /\s+/g, L = "Sortable" + (new Date).getTime(), M = window, N = M.document, O = M.parseInt, P = !!("draggable" in N.createElement("div")), Q = function (a) { return a = N.createElement("x"), a.style.cssText = "pointer-events:auto", "auto" === a.style.pointerEvents }(), R = !1, S = Math.abs, T = ([].slice, []), U = q(function (a, b, c) { if (c && b.scroll) { var d, e, f, g, h = b.scrollSensitivity, i = b.scrollSpeed, j = a.clientX, k = a.clientY, l = window.innerWidth, m = window.innerHeight; if (z !== c && (y = b.scroll, z = c, y === !0)) { y = c; do if (y.offsetWidth < y.scrollWidth || y.offsetHeight < y.scrollHeight) break; while (y = y.parentNode) } y && (d = y, e = y.getBoundingClientRect(), f = (S(e.right - j) <= h) - (S(e.left - j) <= h), g = (S(e.bottom - k) <= h) - (S(e.top - k) <= h)), f || g || (f = (h >= l - j) - (h >= j), g = (h >= m - k) - (h >= k), (f || g) && (d = M)), (J.vx !== f || J.vy !== g || J.el !== d) && (J.el = d, J.vx = f, J.vy = g, clearInterval(J.pid), d && (J.pid = setInterval(function () { d === M ? M.scrollTo(M.pageXOffset + f * i, M.pageYOffset + g * i) : (g && (d.scrollTop += g * i), f && (d.scrollLeft += f * i)) }, 24))) } }, 30), V = function (a) { var b = a.group; b && "object" == typeof b || (b = a.group = { name: b }), ["pull", "put"].forEach(function (a) { a in b || (b[a] = !0) }), a.groups = " " + b.name + (b.put.join ? " " + b.put.join(" ") : "") + " " }; return a.prototype = { constructor: a, _onTapStart: function (a) { var b = this, d = this.el, e = this.options, f = a.type, g = a.touches && a.touches[0], h = (g || a).target, i = h, k = e.filter; if (!("mousedown" === f && 0 !== a.button || e.disabled) && (h = c(h, e.draggable, d))) { if (D = p(h), "function" == typeof k) { if (k.call(this, a, h, this)) return j(b, i, "filter", h, d, D), void a.preventDefault() } else if (k && (k = k.split(",").some(function (a) { return a = c(i, a.trim(), d), a ? (j(b, a, "filter", h, d, D), !0) : void 0 }))) return void a.preventDefault(); (!e.handle || c(i, e.handle, d)) && this._prepareDragStart(a, g, h) } }, _prepareDragStart: function (a, b, c) { var d, f = this, h = f.el, j = f.options, k = h.ownerDocument; c && !s && c.parentNode === h && (G = a, w = h, s = c, t = s.parentNode, x = s.nextSibling, F = j.group, d = function () { f._disableDelayedDrag(), s.draggable = !0, g(s, f.options.chosenClass, !0), f._triggerDragStart(b) }, j.ignore.split(",").forEach(function (a) { i(s, a.trim(), l) }), e(k, "mouseup", f._onDrop), e(k, "touchend", f._onDrop), e(k, "touchcancel", f._onDrop), j.delay ? (e(k, "mouseup", f._disableDelayedDrag), e(k, "touchend", f._disableDelayedDrag), e(k, "touchcancel", f._disableDelayedDrag), e(k, "mousemove", f._disableDelayedDrag), e(k, "touchmove", f._disableDelayedDrag), f._dragStartTimer = setTimeout(d, j.delay)) : d()) }, _disableDelayedDrag: function () { var a = this.el.ownerDocument; clearTimeout(this._dragStartTimer), f(a, "mouseup", this._disableDelayedDrag), f(a, "touchend", this._disableDelayedDrag), f(a, "touchcancel", this._disableDelayedDrag), f(a, "mousemove", this._disableDelayedDrag), f(a, "touchmove", this._disableDelayedDrag) }, _triggerDragStart: function (a) { a ? (G = { target: s, clientX: a.clientX, clientY: a.clientY }, this._onDragStart(G, "touch")) : this.nativeDraggable ? (e(s, "dragend", this), e(w, "dragstart", this._onDragStart)) : this._onDragStart(G, !0); try { N.selection ? N.selection.empty() : window.getSelection().removeAllRanges() } catch (b) { } }, _dragStarted: function () { w && s && (g(s, this.options.ghostClass, !0), a.active = this, j(this, w, "start", s, w, D)) }, _emulateDragOver: function () { if (H) { if (this._lastX === H.clientX && this._lastY === H.clientY) return; this._lastX = H.clientX, this._lastY = H.clientY, Q || h(u, "display", "none"); var a = N.elementFromPoint(H.clientX, H.clientY), b = a, c = " " + this.options.group.name, d = T.length; if (b) do { if (b[L] && b[L].options.groups.indexOf(c) > -1) { for (; d--;) T[d]({ clientX: H.clientX, clientY: H.clientY, target: a, rootEl: b }); break } a = b } while (b = b.parentNode); Q || h(u, "display", "") } }, _onTouchMove: function (b) { if (G) { a.active || this._dragStarted(), this._appendGhost(); var c = b.touches ? b.touches[0] : b, d = c.clientX - G.clientX, e = c.clientY - G.clientY, f = b.touches ? "translate3d(" + d + "px," + e + "px,0)" : "translate(" + d + "px," + e + "px)"; I = !0, H = c, h(u, "webkitTransform", f), h(u, "mozTransform", f), h(u, "msTransform", f), h(u, "transform", f), b.preventDefault() } }, _appendGhost: function () { if (!u) { var a, b = s.getBoundingClientRect(), c = h(s), d = this.options; u = s.cloneNode(!0), g(u, d.ghostClass, !1), g(u, d.fallbackClass, !0), h(u, "top", b.top - O(c.marginTop, 10)), h(u, "left", b.left - O(c.marginLeft, 10)), h(u, "width", b.width), h(u, "height", b.height), h(u, "opacity", "0.8"), h(u, "position", "fixed"), h(u, "zIndex", "100000"), h(u, "pointerEvents", "none"), d.fallbackOnBody && N.body.appendChild(u) || w.appendChild(u), a = u.getBoundingClientRect(), h(u, "width", 2 * b.width - a.width), h(u, "height", 2 * b.height - a.height) } }, _onDragStart: function (a, b) { var c = a.dataTransfer, d = this.options; this._offUpEvents(), "clone" == F.pull && (v = s.cloneNode(!0), h(v, "display", "none"), w.insertBefore(v, s)), b ? ("touch" === b ? (e(N, "touchmove", this._onTouchMove), e(N, "touchend", this._onDrop), e(N, "touchcancel", this._onDrop)) : (e(N, "mousemove", this._onTouchMove), e(N, "mouseup", this._onDrop)), this._loopId = setInterval(this._emulateDragOver, 50)) : (c && (c.effectAllowed = "move", d.setData && d.setData.call(this, c, s)), e(N, "drop", this), setTimeout(this._dragStarted, 0)) }, _onDragOver: function (a) { var d, e, f, g = this.el, i = this.options, j = i.group, l = j.put, o = F === j, p = i.sort; if (void 0 !== a.preventDefault && (a.preventDefault(), !i.dragoverBubble && a.stopPropagation()), I = !0, F && !i.disabled && (o ? p || (f = !w.contains(s)) : F.pull && l && (F.name === j.name || l.indexOf && ~l.indexOf(F.name))) && (void 0 === a.rootEl || a.rootEl === this.el)) { if (U(a, i, this.el), R) return; if (d = c(a.target, i.draggable, g), e = s.getBoundingClientRect(), f) return b(!0), void (v || x ? w.insertBefore(s, v || x) : p || w.appendChild(s)); if (0 === g.children.length || g.children[0] === u || g === a.target && (d = n(g, a))) { if (d) { if (d.animated) return; r = d.getBoundingClientRect() } b(o), k(w, g, s, e, d, r) !== !1 && (s.contains(g) || (g.appendChild(s), t = g), this._animate(e, s), d && this._animate(r, d)) } else if (d && !d.animated && d !== s && void 0 !== d.parentNode[L]) { A !== d && (A = d, B = h(d), C = h(d.parentNode)); var q, r = d.getBoundingClientRect(), y = r.right - r.left, z = r.bottom - r.top, D = /left|right|inline/.test(B.cssFloat + B.display) || "flex" == C.display && 0 === C["flex-direction"].indexOf("row"), E = d.offsetWidth > s.offsetWidth, G = d.offsetHeight > s.offsetHeight, H = (D ? (a.clientX - r.left) / y : (a.clientY - r.top) / z) > .5, J = d.nextElementSibling, K = k(w, g, s, e, d, r); if (K !== !1) { if (R = !0, setTimeout(m, 30), b(o), 1 === K || -1 === K) q = 1 === K; else if (D) { var M = s.offsetTop, N = d.offsetTop; q = M === N ? d.previousElementSibling === s && !E || H && E : N > M } else q = J !== s && !G || H && G; s.contains(g) || (q && !J ? g.appendChild(s) : d.parentNode.insertBefore(s, q ? J : d)), t = s.parentNode, this._animate(e, s), this._animate(r, d) } } } }, _animate: function (a, b) { var c = this.options.animation; if (c) { var d = b.getBoundingClientRect(); h(b, "transition", "none"), h(b, "transform", "translate3d(" + (a.left - d.left) + "px," + (a.top - d.top) + "px,0)"), b.offsetWidth, h(b, "transition", "all " + c + "ms"), h(b, "transform", "translate3d(0,0,0)"), clearTimeout(b.animated), b.animated = setTimeout(function () { h(b, "transition", ""), h(b, "transform", ""), b.animated = !1 }, c) } }, _offUpEvents: function () { var a = this.el.ownerDocument; f(N, "touchmove", this._onTouchMove), f(a, "mouseup", this._onDrop), f(a, "touchend", this._onDrop), f(a, "touchcancel", this._onDrop) }, _onDrop: function (b) { var c = this.el, d = this.options; clearInterval(this._loopId), clearInterval(J.pid), clearTimeout(this._dragStartTimer), f(N, "mousemove", this._onTouchMove), this.nativeDraggable && (f(N, "drop", this), f(c, "dragstart", this._onDragStart)), this._offUpEvents(), b && (I && (b.preventDefault(), !d.dropBubble && b.stopPropagation()), u && u.parentNode.removeChild(u), s && (this.nativeDraggable && f(s, "dragend", this), l(s), g(s, this.options.ghostClass, !1), g(s, this.options.chosenClass, !1), w !== t ? (E = p(s), E >= 0 && (j(null, t, "sort", s, w, D, E), j(this, w, "sort", s, w, D, E), j(null, t, "add", s, w, D, E), j(this, w, "remove", s, w, D, E))) : (v && v.parentNode.removeChild(v), s.nextSibling !== x && (E = p(s), E >= 0 && (j(this, w, "update", s, w, D, E), j(this, w, "sort", s, w, D, E)))), a.active && ((null === E || -1 === E) && (E = D), j(this, w, "end", s, w, D, E), this.save())), w = s = t = u = x = v = y = z = G = H = I = E = A = B = F = a.active = null) }, handleEvent: function (a) { var b = a.type; "dragover" === b || "dragenter" === b ? s && (this._onDragOver(a), d(a)) : ("drop" === b || "dragend" === b) && this._onDrop(a) }, toArray: function () { for (var a, b = [], d = this.el.children, e = 0, f = d.length, g = this.options; f > e; e++) a = d[e], c(a, g.draggable, this.el) && b.push(a.getAttribute(g.dataIdAttr) || o(a)); return b }, sort: function (a) { var b = {}, d = this.el; this.toArray().forEach(function (a, e) { var f = d.children[e]; c(f, this.options.draggable, d) && (b[a] = f) }, this), a.forEach(function (a) { b[a] && (d.removeChild(b[a]), d.appendChild(b[a])) }) }, save: function () { var a = this.options.store; a && a.set(this) }, closest: function (a, b) { return c(a, b || this.options.draggable, this.el) }, option: function (a, b) { var c = this.options; return void 0 === b ? c[a] : (c[a] = b, void ("group" === a && V(c))) }, destroy: function () { var a = this.el; a[L] = null, f(a, "mousedown", this._onTapStart), f(a, "touchstart", this._onTapStart), this.nativeDraggable && (f(a, "dragover", this), f(a, "dragenter", this)), Array.prototype.forEach.call(a.querySelectorAll("[draggable]"), function (a) { a.removeAttribute("draggable") }), T.splice(T.indexOf(this._onDragOver), 1), this._onDrop(), this.el = a = null } }, a.utils = { on: e, off: f, css: h, find: i, is: function (a, b) { return !!c(a, b, a) }, extend: r, throttle: q, closest: c, toggleClass: g, index: p }, a.create = function (b, c) { return new a(b, c) }, a.version = "1.4.2", a });

/***/ },
/* 19 */
/*!***************************************************!*\
  !*** ./wwwroot/js/controllers/task-modal-ctrl.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .controller('TaskModalCtrl', ['taskService', '$scope', '$sce', '$filter', function (taskService, $scope, $sce, $filter) {
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
	
	            taskModal.deleteClicked = function () {
	                if (! window.confirm("Are you sure you want to delete this task?")) {
	                    return;
	                }
	
	                taskService.deleteTask(taskModal.taskId, $scope.boardId)
	                    .then(function () {
	                        resetModal();
	                        $scope.resetBoard();
	                    })
	                    .catch(function (err) {
	                        console.error(err);
	                        alert("There was an issue deleting this task. Please try again.");
	                    })
	                ;
	            };
	
	            $scope.$on('openUpdateTaskModal', function (e, taskViewModel) {
	                $scope.taskModalActive = true;
	                $scope.taskModalTitle = "Task Details";
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
	        }])
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 20 */
/*!****************************************************!*\
  !*** ./wwwroot/js/controllers/phase-modal-ctrl.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 21 */
/*!********************************************************!*\
  !*** ./wwwroot/js/directives/boards-list-directive.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .directive('boardsList', function () {
	            return {
	                templateUrl: '../wwwroot/js/templates/boards-list.tpl.html',
	                restrict: 'E',
	                controller: 'BoardsListCtrl as boardsList'
	            };
	        })
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 22 */
/*!*********************************************************!*\
  !*** ./wwwroot/js/directives/boards-modal-directive.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .directive('boardsModal', function () {
	            return {
	                templateUrl: '../wwwroot/js/templates/boards-modal.tpl.html',
	                restrict: 'A',
	                controller: 'BoardsModalCtrl as boardsModal',
	                scope: {
	                    modalTitle: '=',
	                    modalActive: '=',
	                    modalMethod: '='
	                }
	            };
	        })
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 23 */
/*!************************************************************!*\
  !*** ./wwwroot/js/directives/categories-list-directive.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .directive('categoriesList', function () {
	            return {
	                templateUrl: '../wwwroot/js/templates/categories-list.tpl.html',
	                restrict: 'E',
	                controller: 'CategoriesListCtrl as categoriesList',
	                scope: {
	                    boardId: "@"
	                }
	            };
	        })
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 24 */
/*!*************************************************************!*\
  !*** ./wwwroot/js/directives/categories-modal-directive.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .directive('categoriesModal', function () {
	            return {
	                templateUrl: '../wwwroot/js/templates/categories-modal.tpl.html',
	                restrict: 'A',
	                controller: 'CategoriesModalCtrl as categoriesModal',
	                scope: {
	                    modalTitle: '=',
	                    modalActive: '=',
	                    modalMethod: '=',
	                    modalColorCode: '=',
	                    boardId: "@"
	                }
	            };
	        })
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 25 */
/*!*********************************************************!*\
  !*** ./wwwroot/js/directives/single-board-directive.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .directive('singleBoard', function () {
	            return {
	                templateUrl: '../wwwroot/js/templates/single-board.tpl.html',
	                restrict: 'E',
	                controller: 'SingleBoardCtrl as boardCtrl',
	                scope: {
	                    categoryUrl: "@",
	                    boardId: "@"
	                }
	            };
	        })
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 26 */
/*!**************************************************!*\
  !*** ./wwwroot/js/directives/phase-directive.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .directive('phase', function () {
	            return {
	                templateUrl: '../wwwroot/js/templates/phase.tpl.html',
	                restrict: 'A',
	                controller: 'PhaseCtrl as phaseCtrl',
	                scope: {
	                    item: '&',
	                    boardId: '@',
	                    phaseCount: '@',
	                    boardCategories: '&'
	                }
	            };
	        })
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 27 */
/*!*******************************************************!*\
  !*** ./wwwroot/js/directives/task-modal-directive.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .directive('taskModal', function () {
	            return {
	                templateUrl: '../wwwroot/js/templates/task-modal.tpl.html',
	                restrict: 'A',
	                controller: 'TaskModalCtrl as taskModal',
	                scope: {
	                    boardId: "@",
	                    taskModalTitle: '=',
	                    taskModalActive: '=',
	                    taskModalMethod: '=',
	                    boardCategories: '&',
	                    defaultPhaseId: '=',
	                    resetBoard: '&'
	                }
	            };
	        })
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 28 */
/*!********************************************************!*\
  !*** ./wwwroot/js/directives/phase-modal-directive.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! angular */ 2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (angular) {
	    angular.module('boards-app')
	        .directive('phaseModal', function () {
	            return {
	                templateUrl: '../wwwroot/js/templates/phase-modal.tpl.html',
	                restrict: 'A',
	                controller: 'PhaseModalCtrl as phaseModal',
	                scope: {
	                    boardId: "@",
	                    phaseModalTitle: '=',
	                    phaseModalActive: '=',
	                    phaseModalMethod: '=',
	                    resetBoard: '&'
	                }
	            };
	        })
	    ;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
]);
//# sourceMappingURL=3.script.bundle.js.map