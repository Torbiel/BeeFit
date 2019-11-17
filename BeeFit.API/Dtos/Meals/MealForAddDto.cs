using BeeFit.API.Models.Enums;
using System;

namespace BeeFit.API.Dtos.Meals
{
    public class MealForAddDto
    {
        public MealType Type { get; set; }

        public DateTime Date { get; set; }

        public int UserId { get; set; }

        public int DishId { get; set; }

        public int IngredientId { get; set; }

        public double? Quantity { get; set; }
    }
}
