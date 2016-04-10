﻿using AutoMapper;
using Boards.Models;
using Boards.ViewModels;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
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
            var boards = Mapper.Map<IEnumerable<BoardViewModel>>(_repository.GetAllBoards());
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

                    // Save to DB
                    _logger.LogInformation("Attempting to save new board");
                    _repository.AddBoard(newBoard);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<Board, BoardViewModel>(newBoard));
                    }
                }
            }

            catch(Exception ex)
            {
                _logger.LogError("Failed to save new board", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = serverErrorMessage });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = serverErrorMessage, ModelState = ModelState });
        }
    }
}
