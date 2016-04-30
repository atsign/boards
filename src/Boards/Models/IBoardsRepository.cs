using System.Collections.Generic;

namespace Boards.Models
{
    public interface IBoardsRepository
    {
        IEnumerable<Board> GetAllUserBoards(string name);
        void AddBoard(Board newBoard);
        bool SaveAll();
        bool RemoveBoard(int id, string username);
        void UpdateBoard(Board board, string username);

        void AddCategory(Category newCategory);
        Board GetBoardForUser(int id, string name);
        void RemoveCategory(int id, int boardId);
    }
}