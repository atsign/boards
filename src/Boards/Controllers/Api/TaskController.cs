using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Boards.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.Authorization;
using AutoMapper;
using System.Net;

namespace Boards.Controllers.Api
{
    [Authorize]
    [Route("api/boards/{id}/tasks")]
    public class TaskController : BoardsBaseController
    {
        private ILogger<TaskController> _logger;

        public TaskController(IBoardsRepository repository, ILogger<TaskController> logger) : base(repository)
        {
            _logger = logger;
        }

        [HttpPost("")]
        public JsonResult Post([FromBody]TaskViewModel vm)
        {
            string serverErrorMessage = "There was a problem saving this category. Please try again.";

            try
            {
                if (ModelState.IsValid)
                {
                    _assertUserAccessToBoard();

                    var newTask = Mapper.Map<Models.Task>(vm);
                    newTask.BoardId = int.Parse((string)RouteData.Values["id"]);
                    _repository.AddTask(newTask);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<Models.Task, TaskViewModel>(newTask));
                    }
                }
            }

            catch (Exception ex)
            {
                _logger.LogError("Failed to save new task", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = serverErrorMessage, ModelState = ModelState });
        }

        [HttpDelete("{taskId}")]
        public JsonResult Delete(int taskId)
        {
            try
            {
                _assertUserAccessToBoard();
                _repository.RemoveTask(taskId, int.Parse((string)RouteData.Values["id"]));

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
        public JsonResult Put([FromBody] TaskViewModel vm)
        {
            try
            {
                _assertUserAccessToBoard();

                if (ModelState.IsValid)
                {
                    var task = Mapper.Map<TaskViewModel, Models.Task>(vm);
                    task.BoardId = int.Parse((string)RouteData.Values["id"]);
                    _repository.UpdateTask(task);

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
                    return Json(new { Message = "Invalid task parameters", ModelState = ModelState });
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Failed", exception = ex.Message });
            }
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            try
            {
                _assertUserAccessToBoard();
                return Json(_repository.GetAllBoardTasks(int.Parse((string)RouteData.Values["id"])));
            }

            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Failed", exception = ex.Message });
            }
        }
    }
}
