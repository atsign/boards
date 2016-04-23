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

        public async Task EnsureSeedDataAsync()
        {
            if (await _userManager.FindByEmailAsync("test@example.com") == null)
            {
                BoardsUser newUser = new BoardsUser()
                {
                    UserName = "test",
                    Email = "test@example.com"
                };

                var newUserCreated = await _userManager.CreateAsync(newUser, "Passw0rd!");
            }

            if (!_context.Boards.Any())
            {
                var firstBoard = new Board()
                {
                    Name = "First Board",
                    Description = "Sed stet invidunt ut dolore amet minim et elit clita clita dolores voluptua ut tempor rebum sit et erat lorem",
                    UserName = "test"
                };

                var secondBoard = new Board()
                {
                    Name = "Second Board",
                    Description = "Vero nibh eu et dolor hendrerit quis amet dolor dolore nulla nam dignissim clita et dolores dolore eum et voluptua",
                    UserName = "test"
                };

                _context.Add(firstBoard);
                _context.Add(secondBoard);
                _context.SaveChanges();
            }
        }
    }
}
