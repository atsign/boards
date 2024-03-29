﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Boards.ViewModels;
using Boards.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.Authorization;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Boards.Controllers.Web
{
    public class AccountController : Controller
    {
        private ILogger<AccountController> _logger;
        private SignInManager<BoardsUser> _signInManager;
        private UserManager<BoardsUser> _userManager;

        public AccountController(UserManager<BoardsUser> userManager,
                                 ILogger<AccountController> logger,
                                 SignInManager<BoardsUser> signInManager)
        {
            _userManager = userManager;
            _logger = logger;
            _signInManager = signInManager;
        }

        public async Task<IActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                await _signInManager.SignOutAsync();
            }

            return RedirectToAction("Index", "App");
        }

        [HttpGet("/sign-up")]
        public IActionResult SignUp()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Boards");
            }
            return View();
        }

        [HttpPost("/sign-up")]
        public async Task<IActionResult> SignUp(SignUpViewModel vm)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Boards");
            }

            if (ModelState.IsValid)
            {
                if (vm.Password != vm.PasswordConfirm)
                {
                    ModelState.AddModelError("PasswordConfirm", "Passwords did not match. Please try again.");
                }
                else
                {
                    BoardsUser newUser = new BoardsUser()
                    {
                        UserName = vm.Username
                    };

                    var newUserResult = await _userManager.CreateAsync(newUser, vm.Password);
                    if (newUserResult.Succeeded)
                    {
                        var signInResult = await _signInManager.PasswordSignInAsync(vm.Username, vm.Password, true, false);
                        if (signInResult.Succeeded)
                        {
                            return RedirectToAction("Index", "Boards");
                        }
                        else
                        {
                            _logger.LogError($"Unable to sign into user account \"{vm.Username}\" immediately after account creation.");
                            ModelState.AddModelError("", "There was a problem creating your new account. Please try again.");
                        }
                    }
                    else
                    {
                        foreach (var error in newUserResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
            }

            return View();
        }

        [Authorize]
        [HttpGet("/settings")]
        public IActionResult AccountSettings()
        {
            return View();
        }

        [Authorize]
        [HttpPost("/settings")]
        public async Task<IActionResult> AccountSettings(AccountSettingsViewModel vm)
        {
            if (ModelState.IsValid)
            {
                if (vm.NewPassword == vm.PasswordConfirm)
                {
                    var currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
                    var changePasswordResult = await _userManager.ChangePasswordAsync(currentUser, vm.OldPassword, vm.NewPassword);

                    if (changePasswordResult.Succeeded)
                    {
                        ViewBag.AppMessage = "Password Updated";
                    }
                    else
                    {
                        foreach (var error in changePasswordResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Your new password and re-typed new password did not match. Please try again.");
                }
            }

            return View();
        }
    }
}
