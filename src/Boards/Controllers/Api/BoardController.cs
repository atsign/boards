using AutoMapper;
using Boards.Models;
using Boards.ViewModels;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Boards.Controllers.Api
{
    [Authorize]
    [Route("api/boards")]
    public class BoardController : Controller
    {
        private ILogger<BoardController> _logger;
        private IBoardsRepository _repository;

        public BoardController(IBoardsRepository repository, ILogger<BoardController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            var boards = Mapper.Map<IEnumerable<BoardViewModel>>(_repository.GetAllUserBoards(User.Identity.Name));
            return Json(boards);
        }

        [HttpPost("")]
        public JsonResult Post([FromBody]BoardViewModel vm)
        {
            string serverErrorMessage = "There was a problem saving your new board. Please try again.";

            try
            {
                if (ModelState.IsValid)
                {
                    var newBoard = Mapper.Map<Board>(vm);
                    newBoard.UserName = User.Identity.Name;

                    // Save to DB
                    _logger.LogInformation("Attempting to save new board");
                    _repository.AddBoard(newBoard);

                    if (_repository.SaveAll())
                    {
                        var newCategory = new Category()
                        {
                            Name = "Task",
                            BoardId = newBoard.Id,
                            ColorCode = 1
                        };

                        _repository.AddCategory(newCategory);

                        if (_repository.SaveAll())
                        {
                            Response.StatusCode = (int)HttpStatusCode.Created;
                            return Json(Mapper.Map<Board, BoardViewModel>(newBoard));
                        }
                        else
                        {
                            _logger.LogError($"Board creation succeeded but category creation failed. BoardId: {newBoard.Id}");
                            throw new Exception("Board creation succeeded but category creation failed.");
                        }
                    }
                }
            }

            catch (Exception ex)
            {
                _logger.LogError("Failed to save new board", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = serverErrorMessage });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = serverErrorMessage, ModelState = ModelState });
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            if (_repository.RemoveBoard(id, User.Identity.Name))
            {
                return Json(new { Message = "Success" });
            }
            else
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = "Failed" });
            }
        }

        [HttpPut("")]
        public JsonResult Put([FromBody] BoardViewModel vm)
        {
            string serverErrorMessage = "There was a problem updating your board. Please try again.";

            try
            {
                if (ModelState.IsValid)
                {
                    var board = Mapper.Map<Board>(vm);
                    var username = User.Identity.Name;

                    // Save to DB
                    _logger.LogInformation($"Attemping to update board \"{vm.Name}\" (ID: {vm.Id})");
                    _repository.UpdateBoard(board, username);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.OK;
                        return Json(Mapper.Map<Board, BoardViewModel>(board));
                    }
                }
            }

            catch (Exception ex)
            {
                _logger.LogError("Failed to update board.", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = serverErrorMessage });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = serverErrorMessage, ModelState = ModelState });
        }
    }
}
