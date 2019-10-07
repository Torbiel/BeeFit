    using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        [EmailAddress(ErrorMessage = "Incorrect email address.")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Your password has to contain 8 or more characters.")]
        public string Password { get; set; }

        [Required]
        public DateTime Created { get; set; }
    }
}
