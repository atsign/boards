using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Boards.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.Authorization;
using Boards.ViewModels;
using AutoMapper;
using System.Net;

namespace Boards.Controllers.Api
{
    [Authorize]
    [Route("api/boards/{id}/phases")]
    public class PhaseController : BoardsBaseController
    {
        private ILogger<PhaseController> _logger;

        public PhaseController(IBoardsRepository repository, ILogger<PhaseController> logger) : base(repository)
        {
            _logger = logger;
        }

        public JsonResult Get()
        {
            try
            {
                _assertUserAccessToBoard();

                int boardId = int.Parse((string)RouteData.Values["id"]);
                IEnumerable<Phase> allPhases = _repository.GetAllBoardPhases(boardId);

                return new JsonResult(Mapper.Map<IEnumerable<PhaseViewModel>>(allPhases));
            }

            catch(Exception ex)
            {
                _logger.LogError("Failed to get board phases", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }
        }

        [HttpPost("")]
        public JsonResult Post([FromBody]PhaseViewModel vm)
        {
            string serverErrorMessage = "There was a problem saving this phase. Please try again.";

            try
            {
                if (ModelState.IsValid)
                {
                    _assertUserAccessToBoard();

                    int boardId = int.Parse((string)RouteData.Values["id"]);
                    var newPhase = Mapper.Map<Phase>(vm);
                    var phaseCount = _repository.GetAllBoardPhases(boardId).Count();

                    if (phaseCount >= 6)
                    {
                        throw new Exception("Boards are limited to 6 phases. Please delete a phase before adding a new one.");
                    }

                    newPhase.BoardId = boardId;
                    newPhase.Order = phaseCount + 1;
                    _repository.AddPhase(newPhase);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<Phase, PhaseViewModel>(newPhase));
                    }
                }
            }

            catch (Exception ex)
            {
                _logger.LogError("Failed to save new category", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = serverErrorMessage, ModelState = ModelState });
        }

        [HttpDelete("{phaseId}")]
        public JsonResult Delete(int phaseId)
        {
            try
            {
                _assertUserAccessToBoard();
                _repository.RemovePhase(phaseId, int.Parse((string)RouteData.Values["id"]));

                if (_repository.SaveAll())
                {
                    return Json(new { message = "Success" });
                }
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { message = "Failed" });
                }

            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Failed", exception = ex.Message });
            }
        }

        [HttpPut("")]
        public JsonResult Put([FromBody] PhaseViewModel vm)
        {
            try
            {
                _assertUserAccessToBoard();

                if (ModelState.IsValid)
                {
                    var phase = Mapper.Map<PhaseViewModel, Phase>(vm);
                    phase.BoardId = int.Parse((string)RouteData.Values["id"]);
                    _repository.UpdatePhase(phase);

                    if (_repository.SaveAll())
                    {
                        return Json(vm);
                    }
                    else
                    {
                        Response.StatusCode = (int)HttpStatusCode.BadRequest;
                        return Json(new { message = "Update Failed", exception = ModelState });
                    }
                }
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { Message = "Invalid phase parameters", ModelState = ModelState });
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Failed", exception = ex.Message });
            }
        }
    }
}
