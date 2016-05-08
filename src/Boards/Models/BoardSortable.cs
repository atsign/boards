using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boards.Models
{
    abstract public class BoardSortable
    {
        public int Order { get; set; }
    }
}
