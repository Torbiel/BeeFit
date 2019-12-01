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

        public async Task<PagedList<Dish>> GetManyByName(string name, PagingParams pagingParams)
        {
            var dishes = _context.Set<Dish>().Where(d => d.Name.Contains(name));

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

        public async Task<PagedList<Dish>> GetManyByUserId(int id, PagingParams pagingParams)
        {
            var dishes = _context.Set<Dish>().Where(d => d.UserId == id);
            return await PagedList<Dish>.CreateAsync(dishes, pagingParams.PageNumber, pagingParams.PageSize);
        }

        public async Task<PagedList<Dish>> GetManyByNameAndUser(string name, int userId, PagingParams pagingParams)
        {
            var dishes = _context.Set<Dish>().Where(d => d.Name.Contains(name) && d.UserId == userId);
            return await PagedList<Dish>.CreateAsync(dishes, pagingParams.PageNumber, pagingParams.PageSize);
        }
    }
}
