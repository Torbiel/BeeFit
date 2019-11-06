using BeeFit.API.Models;
using BeeFit.API.Models.Enums;
using System;

namespace BeeFit.API.Dtos
{
    public class MealDto
    {
        public MealType Type { get; set; }
        public DateTime Date { get; set; }
        public virtual User User { get; set; }
        public virtual Dish Dish { get; set; }
        public virtual Ingredient Ingredient { get; set; }
        public double? Quantity { get; set; }
    }
}
