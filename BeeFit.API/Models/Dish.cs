﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeeFit.API.Models
{
    public class Dish
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public virtual ICollection<DishesIngredient> Ingredients { get; set; }
    }
}
