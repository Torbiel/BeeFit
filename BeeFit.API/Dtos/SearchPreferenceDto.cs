using BeeFit.API.Models.Enums;

namespace BeeFit.API.Dtos
{
    public class SearchPreferenceDto
    {
        public string Name { get; set; }
        public PreferenceType PreferenceType { get; set; }
    }
}
