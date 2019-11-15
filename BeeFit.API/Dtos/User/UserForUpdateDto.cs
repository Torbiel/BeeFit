using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BeeFit.API.Dtos.User
{
    public class UserForUpdateDto
    {
        public string Username { get; set; }
        [EmailAddress(ErrorMessage = "Incorrect email address.")]
        public string Email { get; set; }
        public string OldPassword { get; set; }
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Your password has to contain 8 or more characters.")]
        public string NewPassword { get; set; }
        public ICollection<UsersParameterDto> Parameters { get; set; }
        public TargetForAddDto Target { get; set; }
    }
}
