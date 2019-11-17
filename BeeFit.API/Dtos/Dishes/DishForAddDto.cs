using BeeFit.API.Dtos.DishesIngredients;
using System.Collections.Generic;

namespace BeeFit.API.Dtos.Dishes
{
    public class DishForAddDto
    {
        public string Name { get; set; }
        public virtual ICollection<DishesIngredientForAddDto> Ingredients { get; set; }
    }
}
