using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;

namespace Boards.Models
{
    public class BoardsContext : IdentityDbContext<BoardsUser>
    {
        public DbSet<Board> Boards { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Phase> Phases { get; set; }

        public BoardsContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connString = Startup.Configuration["Data:BoardsContextConnection"];
            optionsBuilder.UseSqlServer(connString);

            base.OnConfiguring(optionsBuilder);
        }
    }
}
