using BeeFit.API.Dtos.DishesIngredients;
using System.Collections.Generic;

namespace BeeFit.API.Dtos.Dishes
{
    public class DishForAddDto
    {
        public string Name { get; set; }
        public int UserId { get; set; }
        public virtual ICollection<DishesIngredientForAddDto> Ingredients { get; set; }
        public float Callories { get; set; }
        public float Fats { get; set; }
        public float Proteins { get; set; }
        public float Carbohydrates { get; set; }
    }
}
