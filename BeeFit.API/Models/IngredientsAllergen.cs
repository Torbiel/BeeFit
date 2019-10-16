using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
