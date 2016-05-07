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
        void UpdateCategory(Category category);
        IEnumerable<Category> GetAllBoardCategories(int boardId);
        void AddPhase(Phase newPhase);
        IEnumerable<Phase> GetAllBoardPhases(int boardId);
    }
}