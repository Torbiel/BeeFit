using BeeFit.API.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeeFit.API.Models
{
    public class Meal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public MealType Type { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public virtual Dish Dish { get; set; }
        public virtual Ingredient Ingredients { get; set; }
        public double? Quantity { get; set; }
    }
}
