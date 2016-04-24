using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boards.Models;
using Microsoft.AspNet.Authorization;
using Boards.ViewModels;
using Microsoft.AspNet.Identity;

namespace Boards.Controllers.Web
{
    public class AppController : Controller
    {
        private IBoardsRepository _repository;
        private SignInManager<BoardsUser> _signInManager;

        public AppController(IBoardsRepository repository, SignInManager<BoardsUser> signInManager)
        {
            _repository = repository;
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

        public async Task<IActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
               await _signInManager.SignOutAsync();
            }

            return RedirectToAction("Index", "App");
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
