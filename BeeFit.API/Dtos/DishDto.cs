using BeeFit.API.Models;
using System.Collections.Generic;

namespace BeeFit.API.Dtos
{
    public class DishDto
    {
        public string Name { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<DishesIngredient> Ingredients { get; set; }
    }
}
