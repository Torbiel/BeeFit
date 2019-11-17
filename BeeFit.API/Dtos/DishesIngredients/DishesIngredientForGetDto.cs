﻿using BeeFit.API.Dtos.Ingredients;

namespace BeeFit.API.Dtos.DishesIngredients
{
    public class DishesIngredientForGetDto
    {
        public virtual IngredientForGetDto Ingredient { get; set; }
        public double Quantity { get; set; }
    }
}