﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Boards.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Boards.Controllers
{
    abstract public class BoardsBaseController : Controller
    {
        protected IBoardsRepository _repository;

        public BoardsBaseController(IBoardsRepository repository)
        {
            _repository = repository;
        }

        protected void _assertUserAccessToBoard()
        {
            int id;
            Int32.TryParse((string)RouteData.Values["id"], out id);
            _assertUserAccessToBoard(id);
        }

        protected void _assertUserAccessToBoard(int id)
        {
            Board thisBoard = _repository.GetBoardForUser(id, User.Identity.Name);
            if (thisBoard != null)
            {
                return;
            }

            throw new Exception($"User {User.Identity.Name} does not have access to board with ID {id}");
        }
    }
}
