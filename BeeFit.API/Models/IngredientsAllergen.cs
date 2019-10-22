namespace BeeFit.API.Models
{
    public class IngredientsAllergen
    {
        public virtual Ingredient Ingredient { get; set; }
        public int IngredientId { get; set; }
        public virtual Allergen Allergen { get; set; }
        public int AllergenId { get; set; }
    }
}
