namespace BeeFit.API.Models
{
    public class DishesIngredient
    {
        public virtual Dish Dish { get; set; }
        public int DishId { get; set; }
        public virtual Ingredient Ingredient { get; set; }
        public int IngredientId { get; set; }
    }
}
