using BeeFit.API.Models.Enums;

namespace BeeFit.API.Dtos.SearchPreferences
{
    public class SearchPreferenceForGetDto
    {
        public string Name { get; set; }
        public PreferenceType PreferenceType { get; set; }
    }
}
