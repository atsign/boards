using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boards.Models
{
    public class BoardsContextSeedData
    {
        private BoardsContext _context;
        private UserManager<BoardsUser> _userManager;

        public BoardsContextSeedData(BoardsContext context, UserManager<BoardsUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async System.Threading.Tasks.Task EnsureSeedDataAsync()
        {
            if (await _userManager.FindByEmailAsync("test@example.com") == null)
            {
                BoardsUser newUser = new BoardsUser()
                {
                    UserName = "test",
                    Email = "test@example.com"
                };

                await _userManager.CreateAsync(newUser, "Passw0rd!");
            }

            if (await _userManager.FindByEmailAsync("test2@example.com") == null)
            {
                BoardsUser newUser2 = new BoardsUser()
                {
                    UserName = "test2",
                    Email = "test2@example.com"
                };

                await _userManager.CreateAsync(newUser2, "Passw0rd!");
            }

            if (!_context.Boards.Any())
            {
                var board1 = new Board()
                {
                    Name = "First Board",
                    Description = "Sed stet invidunt ut dolore amet minim et elit clita clita dolores voluptua ut tempor rebum sit et erat lorem",
                    UserName = "test"
                };

                var board2 = new Board()
                {
                    Name = "Second Board",
                    Description = "Vero nibh eu et dolor hendrerit quis amet dolor dolore nulla nam dignissim clita et dolores dolore eum et voluptua",
                    UserName = "test"
                };

                var board3 = new Board()
                {
                    Name = "Third Board",
                    Description = "Dolor ipsum consetetur nonumy in eos ea nam accusam amet tempor clita vel dolor invidunt sanctus rebum duis laoreet aliquyam",
                    UserName = "test2"
                };

                var board4 = new Board()
                {
                    Name = "Fourth Board",
                    Description = "Dolore sanctus dolor dolore ea eirmod iusto erat nostrud hendrerit justo dolor dolore eirmod invidunt diam duis in sea erat",
                    UserName = "test2"
                };

                _context.Add(board1);
                _context.Add(board2);
                _context.Add(board3);
                _context.Add(board4);
                _context.SaveChanges();

                Board[] boards = new Board[] { board1, board2, board3, board4 };
                _addDefaultCategories(boards);
                _addDefaultPhases(boards);
            }
        }

        private void _addDefaultCategories(Board[] boards)
        {
            foreach (Board board in boards)
            {
                var newCategory = new Category()
                {
                    Name = "Task",
                    BoardId = board.Id,
                    ColorCode = 1
                };
                _context.Add(newCategory);
            }

            _context.SaveChanges();
        }

        private void _addDefaultPhases(Board[] boards)
        {
            string[] phaseNames = { "Backlog", "In Progress", "Done" };

            foreach(Board board in boards)
            {
                int order = 1;
                foreach (string phaseName in phaseNames)
                {
                    Phase newPhase = new Phase()
                    {
                        Name = phaseName,
                        BoardId = board.Id,
                        Order = order++
                    };

                    _context.Add(newPhase);
                }
            }

            _context.SaveChanges();
        }
    }
}
