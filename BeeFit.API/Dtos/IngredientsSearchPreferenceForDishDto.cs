using BeeFit.API.Models;

namespace BeeFit.API.Dtos
{
    public class IngredientsSearchPreferenceForDishDto
    {
        public virtual Ingredient Ingredient { get; set; }
        public int IngredientId { get; set; }
        public virtual SearchPreferenceDto SearchPreference { get; set; }
        public int SearchPreferenceId { get; set; }
    }
}
