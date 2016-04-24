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
            var board = _context.Boards.Where<Board>(q => q.Id == Id).Where<Board>(q => q.UserName == username).FirstOrDefault();

            try
            {
                _context.Remove(board);
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
    }
}
