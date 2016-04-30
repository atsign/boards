using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using System.Net;
using Microsoft.AspNet.Authorization;
using Boards.Models;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Boards.ViewModels;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Boards.Controllers.Api
{
    [Authorize]
    [Route("api/boards/{id}/categories")]
    public class CategoryController : Controller
    {
        private ILogger<BoardController> _logger;
        private IBoardsRepository _repository;

        public CategoryController(IBoardsRepository repository, ILogger<BoardController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpPost("")]
        public JsonResult Post([FromBody]CategoryViewModel vm)
        {
            string serverErrorMessage = "There was a problem saving this category. Please try again.";

            try
            {
                if (ModelState.IsValid)
                {
                    _assertUserAccessToBoard();

                    var newCategory = Mapper.Map<Category>(vm);
                    newCategory.BoardId = int.Parse((string)RouteData.Values["id"]);
                    _repository.AddCategory(newCategory);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<Category, CategoryViewModel>(newCategory));
                    }
                }
            }

            catch(Exception ex)
            {
                _logger.LogError("Failed to save new category", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = serverErrorMessage, ModelState = ModelState });
        }

        [HttpDelete("{categoryId}")]
        public JsonResult Delete(int categoryId)
        {
            try
            {
                _assertUserAccessToBoard();
                _repository.RemoveCategory(categoryId, int.Parse((string) RouteData.Values["id"]));

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
        public JsonResult Put([FromBody] CategoryViewModel vm)
        {
            try
            {
                _assertUserAccessToBoard();

                if (ModelState.IsValid)
                {
                    var category = Mapper.Map<CategoryViewModel, Category>(vm);
                    category.BoardId = int.Parse((string)RouteData.Values["id"]);
                    _repository.UpdateCategory(category);

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
                    return Json(new { Message = "Invalid category parameters", ModelState = ModelState });
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Failed", exception = ex.Message } );
            }
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            try
            {
                _assertUserAccessToBoard();
                var categories = Mapper.Map<IEnumerable<CategoryViewModel>>(_repository.GetAllBoardCategories(int.Parse((string)RouteData.Values["id"])));
                return Json(categories);
            }

            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Failed", exception = ex.Message });
            }
        }

        private void _assertUserAccessToBoard()
        {
            int id;
            if (Int32.TryParse((string)RouteData.Values["id"], out id))
            {
                Board thisBoard = _repository.GetBoardForUser(id, User.Identity.Name);
                if (thisBoard != null)
                {
                    return;
                }
            }

            throw new Exception($"User {User.Identity.Name} does not have access to board with ID {id}");
        }
    }
}
