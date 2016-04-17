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

        public IEnumerable<Board> GetAllBoards()
        {
            try
            {
                return _context.Boards.OrderBy(t => t.Name).ToList();
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

        public bool RemoveBoard(int Id)
        {
            var board = _context.Boards.Where<Board>(q => q.Id == Id).FirstOrDefault();

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

        public void UpdateBoard(Board board)
        {
            _context.Update(board);
        }
    }
}
