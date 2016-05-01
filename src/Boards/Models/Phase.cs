using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boards.Models
{
    public class Phase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Order { get; set; }
        public int BoardId { get; set; }
    }
}
