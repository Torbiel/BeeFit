using System.Text.Json.Serialization;

﻿namespace BeeFit.API.Models
{
    public class UsersAllergen
    {
        [JsonIgnore]
        public virtual User User { get; set; }
        [JsonIgnore]
        public int UserId { get; set; }
        public virtual Allergen Allergen { get; set; }
        [JsonIgnore]
        public int AllergenId { get; set; }
    }
}
