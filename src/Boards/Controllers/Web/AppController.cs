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
                return RedirectToAction("Index", "Boards");
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
                        return RedirectToAction("Index", "Boards");
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

        public IActionResult PageNotFound()
        {
            return View();
        }
    }
}
