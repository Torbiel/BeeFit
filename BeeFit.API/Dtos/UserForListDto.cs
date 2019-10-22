using BeeFit.API.Models.Enums;
using System;
using System.Collections.Generic;

namespace BeeFit.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        public int Height { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public bool Deleted { get; set; }
        public ICollection<UsersSearchPreferenceForListDto> Preferences { get; set; }
        public ICollection<UsersAllergenForListDto> Allergens { get; set; }
        public ICollection<UsersParameterForListDto> Parameters { get; set; }
    }
}
