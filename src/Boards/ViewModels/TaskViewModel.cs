using System.ComponentModel.DataAnnotations;

namespace Boards.Models
{
    public class TaskViewModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [MaxLength(1024)]
        public string Description { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public int PhaseId { get; set; }
        public int Order { get; set; }
    }
}