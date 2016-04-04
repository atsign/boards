using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boards.Models;

namespace Boards.Controllers.Web
{
    public class AppController : Controller
    {
        private BoardsContext _context;

        public AppController(Models.BoardsContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Boards()
        {
            var boards = _context.Boards.OrderBy(t => t.Name).ToList();

            return View(boards);
        }

        public IActionResult Categories()
        {
            return View();
        }

        public IActionResult Board()
        {
            return View();
        }
    }
}
