namespace BeeFit.API.Dtos.DishesIngredients
{
    public class DishesIngredientForUpdateDto
    {
        public int DishId { get; set; }
        public int IngredientId { get; set; }
        public double Quantity { get; set; }
    }
}
