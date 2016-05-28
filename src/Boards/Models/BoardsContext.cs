using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Microsoft.AspNet.Hosting;

namespace Boards.Models
{
    public class BoardsContext : IdentityDbContext<BoardsUser>
    {
        private IHostingEnvironment _env;

        public DbSet<Board> Boards { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Phase> Phases { get; set; }
        public DbSet<Task> Tasks { get; set; }

        public BoardsContext(IHostingEnvironment env)
        {
            _env = env;
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connString;

            if (_env.IsDevelopment())
            {
                connString = Startup.Configuration["Data:BoardsDevContextConnection"];
            }
            else
            {
                connString = Startup.Configuration["Data:BoardsConnection:ConnectionString"];
            }

            optionsBuilder.UseSqlServer(connString);

            base.OnConfiguring(optionsBuilder);
        }
    }
}
