using BeeFit.API.Models.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeeFit.API.Models
{
    public class SearchPreference
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public PreferenceType PreferenceType { get; set; }

        public virtual ICollection<IngredientsSearchPreference> Ingredients { get; set; }
        public virtual ICollection<UsersSearchPreference> Users { get; set; }
    }
}
