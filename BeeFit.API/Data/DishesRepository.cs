using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Helpers;
using BeeFit.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BeeFit.API.Data
{
    public class DishesRepository : BeeFitRepository, IDishesRepository
    {
        public DishesRepository(BeeFitDbContext context) : base(context) { }

        public async Task<PagedList<Dish>> GetManyByName(SearchParams pagingParams)
        {
            if(pagingParams.Name == null)
            {
                pagingParams.Name = "";
            }

            var dishes = _context.Set<Dish>().Where(d => d.Name.Contains(pagingParams.Name));

            //foreach (var pref in searchPreferences)
            //{
            //    dishes.Where(d => d.Ingredients.All(i => i.Ingredient.SearchPreferences.FirstOrDefault(s => s.SearchPreferenceId == pref.Id) != null));
            //}

            if(pagingParams.UserId != null)
            {
                dishes = dishes.Where(d => d.UserId == pagingParams.UserId);
            }

            if(pagingParams.MinCallories != null)
            {
                dishes = dishes.Where(d => d.Callories >= pagingParams.MinCallories);
            }

            if(pagingParams.MaxCallories != null)
            {
                dishes = dishes.Where(d => d.Callories <= pagingParams.MaxCallories);
            }

            return await PagedList<Dish>.CreateAsync(dishes, pagingParams.PageNumber, pagingParams.PageSize);
        }
    }
}
