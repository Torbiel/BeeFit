using BeeFit.API.Dtos.Dishes;
using BeeFit.API.Dtos.Ingredients;
using BeeFit.API.Models.Enums;
using System;

namespace BeeFit.API.Dtos.Meals
{
    public class MealForGetDto
    {
        public MealType Type { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public virtual DishForGetDto Dish { get; set; }
        public virtual IngredientForGetDto Ingredient { get; set; }
        public double? Quantity { get; set; }
    }
}
