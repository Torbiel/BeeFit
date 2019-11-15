using BeeFit.API.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Dtos.UsersSearchPreferences
{
    public class UsersSearchPreferenceForUpdateDto
    {
        public string Name { get; set; }
        public PreferenceType PreferenceType { get; set; }
    }
}
