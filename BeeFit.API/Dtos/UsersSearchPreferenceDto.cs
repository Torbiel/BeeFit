using BeeFit.API.Models.Enums;

namespace BeeFit.API.Dtos
{
    public class UsersSearchPreferenceDto
    {
        public string Name { get; set; }
        public PreferenceType PreferenceType { get; set; }
    }
}
