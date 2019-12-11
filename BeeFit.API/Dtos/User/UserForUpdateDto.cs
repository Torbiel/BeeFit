using BeeFit.API.Dtos.Targets;
using BeeFit.API.Dtos.UsersParameters;
using BeeFit.API.Models.Enums;
using System;
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
        public Gender Gender { get; set; }
        public int Height { get; set; }
        public DateTime DateOfBirth { get; set; }
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Your password has to contain 8 or more characters.")]
        public string NewPassword { get; set; }
        public ICollection<UsersParameterForUpdateDto> Parameters { get; set; }
        public TargetForUpdateDto Target { get; set; }
    }
}
