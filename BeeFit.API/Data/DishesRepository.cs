using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BeeFit.API.Data
{
    public class DishesRepository : BeeFitRepository, IDishesRepository
    {
        public DishesRepository(BeeFitDbContext context) : base(context) { }

        public async Task<List<Dish>> GetManyByName(string name)
        {
            var dishes = await _context.Set<Dish>().Where(d => d.Name.Contains(name)).ToListAsync();

            //foreach (var pref in searchPreferences)
            //{
            //    dishes.Where(d => d.Ingredients.All(i => i.Ingredient.SearchPreferences.FirstOrDefault(s => s.SearchPreferenceId == pref.Id) != null));
            //}

            return dishes;
        }
    }
}
