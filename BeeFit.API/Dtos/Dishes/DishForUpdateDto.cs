using BeeFit.API.Dtos.DishesIngredients;
using System.Collections.Generic;

namespace BeeFit.API.Dtos.Dishes
{
    public class DishForUpdateDto
    {
        public string Name { get; set; }
        public virtual ICollection<DishesIngredientForUpdateDto> Ingredients { get; set; }
        public float Callories { get; set; }
        public float Fats { get; set; }
        public float Proteins { get; set; }
        public float Carbohydrates { get; set; }
    }
}
