using AutoMapper;
using Boards.ViewModels;
using Microsoft.Data.Entity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boards.Models
{
    public class BoardsRepository : IBoardsRepository
    {
        private BoardsContext _context;
        private ILogger<BoardsRepository> _logger;

        public BoardsRepository(BoardsContext context, ILogger<BoardsRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void AddBoard(Board newBoard)
        {
            _context.Add(newBoard);
        }

        public IEnumerable<Board> GetAllUserBoards(string username)
        {
            try
            {
                return _context.Boards
                    .OrderBy(t => t.Name)
                    .Where(t => t.UserName == username)
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Unable to retrieve boards from database", ex);
                return null;
            }
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }

        public bool RemoveBoard(int Id, string username)
        {
            var board = _context.Boards.Where<Board>(q => q.Id == Id && q.UserName == username).FirstOrDefault();
            var categories = _context.Categories.Where<Category>(q => q.BoardId == Id);

            try
            {
                _context.Remove(board);

                foreach (Category cat in categories)
                {
                    _context.Remove(cat);
                }

                return SaveAll();
            }
            catch (Exception ex)
            {
                _logger.LogError("Unable to delete board", ex);
                return false;
            }
        }

        public void UpdateBoard(Board board, string username)
        {
            var existingBoard = _context.Boards.Where<Board>(q => q.Id == board.Id).Where<Board>(q => q.UserName == username).FirstOrDefault();

            if (existingBoard != null)
            {
                existingBoard.Name = board.Name;
                existingBoard.Description = board.Description;
                _context.Update(existingBoard);
            } else
            {
                _logger.LogError($"Unable to find board with ID {board.Id} for user {username}");
                throw new Exception();
            }
        }

        public void AddCategory(Category newCategory)
        {
            _context.Add(newCategory);
        }

        public Board GetBoardForUser(int id, string name)
        {
            return _context.Boards.Where(q => q.Id == id && q.UserName == name).FirstOrDefault();
        }

        public void RemoveCategory(int id, int boardId)
        {
            int taskCount = _context.Tasks.Where(q => q.CategoryId == id && q.BoardId == boardId).ToList().Count;
            if (taskCount > 0)
            {
                _logger.LogError($"Category {id} still had tasks associated with it when attempting to delete it.");
                throw new Exception("A category cannot be deleted if it still has tasks. Please re-assign or delete the tasks assigned to this category before deleting it.");
            }

            int categoryCount = _context.Categories.Where(q => q.BoardId == boardId).ToList().Count;
            if (categoryCount < 2)
            {
                _logger.LogError($"A board must have at least 1 category. Category count was {categoryCount} when trying to delete category with ID {id}");
                throw new Exception("A board must have at least 1 category.");
            }

            var existingCategory = _context.Categories.Where(q => q.Id == id && q.BoardId == boardId).FirstOrDefault();
            if (existingCategory != null)
            {
                _context.Remove(existingCategory);
            }
            else
            {
                _logger.LogError($"Unable to find category with ID {id} for board with ID {boardId}");
                throw new Exception($"Unable to find category with ID {id} for board with ID {boardId}");
            }
        }

        public void UpdateCategory(Category category)
        {
            // Assert that the category ID and the boardId have not been changed
            var existingCategory = _context.Categories.Where(q => q.Id == category.Id && q.BoardId == category.BoardId).FirstOrDefault();
            if (existingCategory == null)
            {
                string errorMessage = $"A category's ID or its board's ID cannot be altered.";
                _logger.LogError(errorMessage);
                throw new Exception(errorMessage);
            }

            existingCategory.Name = category.Name;
            existingCategory.ColorCode = category.ColorCode;
            _context.Update(existingCategory);
        }

        public IEnumerable<Category> GetAllBoardCategories(int boardId)
        {
            try
            {
                return _context.Categories
                    .Where(q => q.BoardId == boardId)
                    .OrderBy(q => q.Name)
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Unable to retrieve categories for board with ID {boardId}", ex.Message);
                // Error has been logged for reference. Return an empty Category list for front-end
                return new List<Category>();
            }
        }

        public void AddPhase(Phase newPhase)
        {
            _context.Add(newPhase);
        }

        public IEnumerable<Phase> GetAllBoardPhases(int boardId)
        {
            return _context.Phases
                .Where(q => q.BoardId == boardId)
                .OrderBy(q => q.Order)
                .ToList();
        }

        public void RemovePhase(int id, int boardId)
        {
            var taskCount = _context.Tasks.Where(q => q.BoardId == boardId && q.PhaseId == id).ToList().Count;
            if (taskCount > 0)
            {
                _logger.LogError($"Phase {id} still had tasks associated with it when attempting to delete it.");
                throw new Exception("A phase cannot be deleted if it still has tasks. Please re-assign or delete the tasks assigned to this phase before deleting it.");
            }

            var phaseCount = _context.Phases.Where(q => q.BoardId == boardId).ToList().Count;
            if (phaseCount < 3)
            {
                _logger.LogError($"A board must have at least 2 phases. Phase count was {phaseCount} when trying to delete category with ID {id}");
                throw new Exception("A board must have at least 2 phases.");
            }

            var existingPhase = _context.Phases.Where(q => q.Id == id && q.BoardId == boardId).FirstOrDefault();
            if (existingPhase != null)
            {
                _context.Remove(existingPhase);

                // Update order value of remaining phases
                IEnumerable<Phase> remainingPhases = _context.Phases.Where(q => q.BoardId == boardId && q.Id != id).OrderBy(q => q.Order).ToList();
                _updateOrderValues(remainingPhases);
            }
            else
            {
                string errorMessage = $"Unable to find phase with ID {id} for board with ID {boardId}";
                _logger.LogError(errorMessage);
                throw new Exception(errorMessage);
            }
        }

        public void UpdatePhase(Phase phase)
        {
            // Assert that the phase ID and the boardId have not been changed
            var existingPhase = _context.Phases.Where(q => q.Id == phase.Id && q.BoardId == phase.BoardId).FirstOrDefault();
            if (existingPhase == null)
            {
                string errorMessage = $"A phase's ID or its board's ID cannot be altered.";
                _logger.LogError(errorMessage);
                throw new Exception(errorMessage);
            }

            int phaseCount = _context.Phases.Where(q => q.BoardId == phase.BoardId).ToList().Count;

            existingPhase.Name = phase.Name;
            existingPhase.Order = (phase.Order <= 0 ? existingPhase.Order : Math.Min(phase.Order, phaseCount));
            _context.Update(existingPhase);

            List<Phase> updatedPhases = _context.Phases.Where(q => q.BoardId == phase.BoardId && q.Id != phase.Id).ToList();
            updatedPhases.Insert(existingPhase.Order - 1, existingPhase);
            _updateOrderValues(updatedPhases);
        }

        public void AddTask(Task task)
        {
            _assertValidCategoryAndPhase(task);

            // Update existing tasks' order values
            List<Task> existingTasksInPhase = _context.Tasks.Where(q => q.PhaseId == task.PhaseId).OrderBy(q => q.Order).ToList();
            existingTasksInPhase.Insert(0, task);
            _updateOrderValues(existingTasksInPhase);

            _context.Add(task);
        }

        public void RemoveTask(int id, int boardId)
        {
            Task existingTask = _context.Tasks.Where(q => q.Id == id && q.BoardId == boardId).FirstOrDefault();
            if (existingTask != null)
            {
                _context.Remove(existingTask);

                // Update order value of remaining tasks
                IEnumerable<Task> remainingTasksInPhase = _context.Tasks.Where(q => q.BoardId == boardId && q.Id != id && q.PhaseId == existingTask.PhaseId).OrderBy(q => q.Order).ToList();
                _updateOrderValues(remainingTasksInPhase);
            }
            else
            {
                string errorMessage = $"Unable to find task with ID {id} for board with ID {boardId}";
                _logger.LogError(errorMessage);
                throw new Exception(errorMessage);
            }
        }

        public void UpdateTask(Task task)
        {
            _assertValidCategoryAndPhase(task);

            // Assert that the task ID and the boardId have not been changed
            var existingTask = _context.Tasks.Where(q => q.Id == task.Id && q.BoardId == task.BoardId).FirstOrDefault();
            if (existingTask == null)
            {
                string errorMessage = $"A task's ID or its board's ID cannot be altered.";
                _logger.LogError(errorMessage);
                throw new Exception(errorMessage);
            }

            int existingPhaseId = existingTask.PhaseId;
            int newPhaseId = task.PhaseId;
            int taskCountInPhase = _context.Tasks.Where(q => q.BoardId == task.BoardId && q.PhaseId == task.PhaseId).ToList().Count;

            // If moving a task to a new phase, allow room for it when calculating maximum order value
            if (existingPhaseId != newPhaseId)
            {
                taskCountInPhase++;
            }

            existingTask.Name = task.Name;
            existingTask.Description = task.Description;
            existingTask.CategoryId = task.CategoryId;
            existingTask.PhaseId = task.PhaseId;
            existingTask.Order = (task.Order <= 0 ? 1 : Math.Min(task.Order, taskCountInPhase));
            _context.Update(existingTask);

            // Update task order values for tasks in both the old and new phases
            List<Task> updatedTasksOldPhase = _context.Tasks.Where(q => q.BoardId == task.BoardId && q.Id != task.Id && q.PhaseId == existingPhaseId).ToList();
            List<Task> updatedTasksNewPhase = _context.Tasks.Where(q => q.BoardId == task.BoardId && q.Id != task.Id && q.PhaseId == newPhaseId).ToList();
            updatedTasksNewPhase.Insert(existingTask.Order - 1, existingTask);
            _updateOrderValues(updatedTasksOldPhase);
            _updateOrderValues(updatedTasksNewPhase);
        }

        public IEnumerable<IEnumerable<Task>> GetAllBoardTasks(int id)
        {
            List<List<Task>> allTasks = new List<List<Task>>();

            List<Phase> phasesForBoard = _context.Phases.Where(q => q.BoardId == id).OrderBy(q => q.Order).ToList();
            foreach (Phase phase in phasesForBoard)
            {
                List<Task> tasks = _context.Tasks.Where(q => q.PhaseId == phase.Id && q.BoardId == id).OrderBy(q => q.Order).ToList();
                allTasks.Add(tasks);
            }

            return allTasks;
        }

        public Object GetBoardData(int id)
        {
            List<Object> taskData = new List<Object>();
            List<Phase> phases = _context.Phases.Where(q => q.BoardId == id).OrderBy(q => q.Order).ToList();
            List<Category> categories = _context.Categories.Where(q => q.BoardId == id).OrderBy(q => q.Name).ToList();

            foreach (Phase phase in phases)
            {
                List<Task> tasks = _context.Tasks.Where(q => q.BoardId == id && q.PhaseId == phase.Id).OrderBy(q => q.Order).ToList();
                taskData.Add(new
                {
                    phase = Mapper.Map<PhaseViewModel>(phase),
                    tasks = Mapper.Map<IEnumerable<TaskViewModel>>(tasks)
                });
            }

            return new
            {
                taskData = taskData,
                categories = categories
            };
        }

        private void _updateOrderValues(IEnumerable<BoardSortable> list)
        {
            int order = 1;
            foreach (BoardSortable item in list)
            {
                item.Order = order++;
                _context.Update(item);
            }
        }

        private void _assertValidCategoryAndPhase(Task task)
        {
            Category categoryForTask = _context.Categories.Where(q => q.Id == task.CategoryId && q.BoardId == task.BoardId).FirstOrDefault();
            Phase phaseForTask = _context.Phases.Where(q => q.Id == task.PhaseId && q.BoardId == task.BoardId).FirstOrDefault();

            if (categoryForTask == null || phaseForTask == null)
            {
                string errorMessage = $"The task's phase and category must belong to the task's board";
                _logger.LogError(errorMessage);
                throw new Exception(errorMessage);
            }
        }
    }
}
