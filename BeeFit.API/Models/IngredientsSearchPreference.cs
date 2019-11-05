namespace BeeFit.API.Models
{
    public class IngredientsSearchPreference
    {
        public virtual Ingredient Ingredient { get; set; }
        public int IngredientId { get; set; }
        public virtual SearchPreference SearchPreference { get; set; }
        public int SearchPreferenceId { get; set; }
    }
}
