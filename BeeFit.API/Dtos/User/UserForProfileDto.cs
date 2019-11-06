using BeeFit.API.Models;
using BeeFit.API.Models.Enums;
using System;
using System.Collections.Generic;

namespace BeeFit.API.Dtos
{
    public class UserForProfileDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        public int Height { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Username { get; set; }
        public ICollection<UsersParameter> Parameters { get; set; }
        public ICollection<UsersSearchPreferenceDto> SearchPreferences { get; set; }
    }
}
