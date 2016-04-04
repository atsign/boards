using System.Collections.Generic;

namespace Boards.Models
{
    public interface IBoardsRepository
    {
        IEnumerable<Board> GetAllBoards();
    }
}