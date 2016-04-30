using System.ComponentModel.DataAnnotations;

namespace Boards.ViewModels
{
    public class CategoryViewModel
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [Range(1,8)]
        public int ColorCode { get; set; }
    }
}