using System.Collections.Generic;

namespace Boards.Models
{
    public interface IBoardsRepository
    {
        IEnumerable<Board> GetAllBoards();
        void AddBoard(Board newBoard);
        bool SaveAll();
        bool RemoveBoard(int id);
    }
}