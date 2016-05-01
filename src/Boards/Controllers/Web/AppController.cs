using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boards.Models;
using Microsoft.AspNet.Authorization;
using Boards.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.Logging;
using System.Net;

namespace Boards.Controllers.Web
{
    public class AppController : BoardsBaseController
    {
        private SignInManager<BoardsUser> _signInManager;

        public AppController(IBoardsRepository repository, SignInManager<BoardsUser> signInManager) : base(repository)
        {
            _signInManager = signInManager;
        }

        public IActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Boards", "App");
            }
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Index(LoginViewModel vm, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var signInResult = await _signInManager.PasswordSignInAsync(vm.Username, vm.Password, true, false);

                if (signInResult.Succeeded)
                {
                    if (string.IsNullOrWhiteSpace(returnUrl))
                    {
                        return RedirectToAction("Boards", "App");
                    } else
                    {
                        return Redirect(returnUrl);
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Username or password is incorrect. Please try again.");
                }
            }
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        [Authorize]
        public IActionResult Boards()
        {
            return View();
        }

        [Authorize]
        [HttpGet("/boards/{id}/categories")]
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
            catch(Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return HttpNotFound();
            }
        }

        public IActionResult Board()
        {
            return View();
        }

        public IActionResult PageNotFound()
        {
            return View();
        }
    }
}
