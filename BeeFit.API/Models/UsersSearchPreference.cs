using System.Text.Json.Serialization;

namespace BeeFit.API.Models
{
    public class UsersSearchPreference
    {
        [JsonIgnore]
        public virtual User User { get; set; }
        [JsonIgnore]
        public int UserId { get; set; }
        public virtual SearchPreference SearchPreference { get; set; }
        [JsonIgnore]
        public int SearchPreferenceId { get; set; }
    }
}
