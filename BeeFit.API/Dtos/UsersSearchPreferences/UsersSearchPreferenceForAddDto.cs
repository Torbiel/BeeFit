using BeeFit.API.Models.Enums;

namespace BeeFit.API.Dtos.UsersSearchPreferences
{
    public class UsersSearchPreferenceForAddDto
    {
        public string Name { get; set; }
        public PreferenceType PreferenceType { get; set; }
    }
}
