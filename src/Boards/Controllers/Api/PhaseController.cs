using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Boards.Models;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.Authorization;

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
    }
}
