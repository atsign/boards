using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boards.Models
{
    public class BoardsContextSeedData
    {
        private BoardsContext _context;

        public BoardsContextSeedData(BoardsContext context)
        {
            _context = context;
        }

        public void EnsureSeedData()
        {
            if (!_context.Boards.Any())
            {
                var firstBoard = new Board()
                {
                    Name = "First Board",
                    Description = "Sed stet invidunt ut dolore amet minim et elit clita clita dolores voluptua ut tempor rebum sit et erat lorem",
                    UserId = 1
                };

                var secondBoard = new Board()
                {
                    Name = "Second Board",
                    Description = "Vero nibh eu et dolor hendrerit quis amet dolor dolore nulla nam dignissim clita et dolores dolore eum et voluptua",
                    UserId = 1
                };

                _context.Add(firstBoard);
                _context.Add(secondBoard);
                _context.SaveChanges();
            }
        }
    }
}
