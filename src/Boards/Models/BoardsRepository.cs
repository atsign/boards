using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boards.Models
{
    public class BoardsRepository : IBoardsRepository
    {
        private BoardsContext _context;

        public BoardsRepository(BoardsContext context)
        {
            _context = context;
        }

        public IEnumerable<Board> GetAllBoards()
        {
            return _context.Boards.OrderBy(t => t.Name).ToList();
        }
    }
}
