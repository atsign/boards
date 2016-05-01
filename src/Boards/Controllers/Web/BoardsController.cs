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

                int boardId = int.Parse((string)RouteData.Values["id"]);
                var thisBoard = _repository.GetBoardForUser(boardId, User.Identity.Name);

                ViewBag.BoardName = thisBoard.Name;
                ViewBag.BoardId = thisBoard.Id;
                return View();
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return HttpNotFound();
            }
        }

        [HttpGet("{id}")]
        public IActionResult Board()
        {
            return View();
        }
    }
}
