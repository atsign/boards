using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Boards.Models;
using Microsoft.AspNet.Authorization;
using System.Net;

namespace Boards.Controllers.Web
{
    [Authorize]
    [Route("boards")]
    public class BoardsController : BoardsBaseController
    {
        public BoardsController(IBoardsRepository repository) : base(repository)
        {

        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("{id}/categories")]
        public IActionResult Categories()
        {
            try
            {
                _assertUserAccessToBoard();

                Board thisBoard = _getCurrentBoard();

                ViewBag.BoardName = thisBoard.Name;
                ViewBag.BoardId = thisBoard.Id;
                return View();
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return RedirectToAction("PageNotFound", "App");
            }
        }

        [HttpGet("{id}")]
        public IActionResult Board()
        {
            try
            {
                _assertUserAccessToBoard();

                Board thisBoard = _getCurrentBoard();

                ViewBag.BoardName = thisBoard.Name;
                ViewBag.BoardId = thisBoard.Id;
                ViewBag.BoardDescription = thisBoard.Description;
                return View();
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return RedirectToAction("PageNotFound", "App");
            }
        }

        private Board _getCurrentBoard()
        {
            int boardId = int.Parse((string)RouteData.Values["id"]);
            return _repository.GetBoardForUser(boardId, User.Identity.Name);
        }
    }
}
