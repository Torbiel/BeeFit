using BeeFit.API.Models;

namespace BeeFit.API.Dtos
{
    public class DishesIngredientForDishDto
    {
        public virtual Dish Dish { get; set; }
        public int DishId { get; set; }
        public virtual IngredientForDishDto Ingredient { get; set; }
        public int IngredientId { get; set; }
        public double Quantity { get; set; }
    }
}
