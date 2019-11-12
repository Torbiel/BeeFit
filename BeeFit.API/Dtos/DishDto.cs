using System.Collections.Generic;

namespace BeeFit.API.Dtos
{
    public class DishDto
    {
        public string Name { get; set; }
        public ICollection<DishesIngredientForDishDto> Ingredients { get; set; }
    }
}
