using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boards.Models
{
    public class Task : BoardSortable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int BoardId { get; set; }
        public int CategoryId { get; set; }
        public int PhaseId { get; set; }
    }
}
