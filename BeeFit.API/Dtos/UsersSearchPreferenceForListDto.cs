using BeeFit.API.Models.Enums;

namespace BeeFit.API.Dtos
{
    public class UsersSearchPreferenceForListDto
    {
        public int SearchPreferenceId { get; set; }
        public string Name { get; set; }
        public PreferenceType PreferenceType { get; set; }
    }
}
