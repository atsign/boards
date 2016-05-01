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
            // TODO: Assert that there are no tasks associated with this category

            var categoryCount = _context.Categories.Where(q => q.BoardId == boardId).ToList().Count;
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
                    .OrderBy(q => q.ColorCode)
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
    }
}
