using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Boards.ViewModels
{
    public class AccountSettingsViewModel
    {
        [MinLength(8)]
        [Required]
        public string OldPassword { get; set; }
        [MinLength(8)]
        [Required]
        public string NewPassword { get; set; }
        [MinLength(8)]
        [Required]
        public string PasswordConfirm { get; set; }
    }
}
