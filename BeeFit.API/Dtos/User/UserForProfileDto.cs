using BeeFit.API.Dtos.Targets;
using BeeFit.API.Dtos.UsersParameters;
using BeeFit.API.Dtos.UsersSearchPreferences;
using BeeFit.API.Models.Enums;
using System;
using System.Collections.Generic;

namespace BeeFit.API.Dtos.User
{
    public class UserForProfileDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        public int Height { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Username { get; set; }
        public ICollection<UsersParameterForGetDto> Parameters { get; set; }
        public ICollection<UsersSearchPreferenceForGetDto> SearchPreferences { get; set; }
        public TargetForGetDto Target { get; set; }
    }
}
