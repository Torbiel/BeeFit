﻿using System;
using System.ComponentModel.DataAnnotations;

namespace BeeFit.API.Dtos.User
{
    public class UserForRegisterDto
    {
        // TODO: validation only in SPA
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
