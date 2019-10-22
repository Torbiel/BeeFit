using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BeeFit.API.Models
{
    public class UsersParameter
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [JsonIgnore]
        public virtual User User { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public double? Weight { get; set; }
        public double? AbdominalCircumference { get; set; }
        public double? BicepsCircumference { get; set; }
        public double? ThighCircumference { get; set; }
    }
}
