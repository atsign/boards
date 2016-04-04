using AutoMapper;
using Boards.Models;
using Boards.ViewModels;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Boards.Controllers.Api
{
    [Route("api/boards")]
    public class BoardController : Controller
    {
        private IBoardsRepository _repository;

        public BoardController(IBoardsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            var boards = Mapper.Map<IEnumerable<BoardViewModel>>(_repository.GetAllBoards());
            return Json(boards);
        }

        [HttpPost("")]
        public JsonResult Post([FromBody]BoardViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newBoard = Mapper.Map<Board>(vm);

                    // Save to DB

                    Response.StatusCode = (int)HttpStatusCode.Created;
                    return Json(Mapper.Map<Board, BoardViewModel>(newBoard));
                }
            }

            catch(Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }
    }
}
