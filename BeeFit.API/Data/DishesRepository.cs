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

        public async Task<PagedList<Dish>> GetMany(FoodSearchParams searchParams)
        {
            if(searchParams.Name == null)
            {
                searchParams.Name = "";
            }

            var dishes = _context.Set<Dish>().Where(d => d.Name.Contains(searchParams.Name)).OrderByDescending(d => d.Name).AsQueryable();

            //foreach (var pref in searchPreferences)
            //{
            //    dishes.Where(d => d.Ingredients.All(i => i.Ingredient.SearchPreferences.FirstOrDefault(s => s.SearchPreferenceId == pref.Id) != null));
            //}

            if(searchParams.UserId != null && searchParams.UserId != 0)
            {
                dishes = dishes.Where(d => d.UserId == searchParams.UserId);
            }

            if(searchParams.MinCallories != null)
            {
                dishes = dishes.Where(d => d.Callories >= searchParams.MinCallories);
            }

            if(searchParams.MaxCallories != null)
            {
                dishes = dishes.Where(d => d.Callories <= searchParams.MaxCallories);
            }

            if(searchParams.OrderBy != null)
            {
                switch(searchParams.OrderBy)
                {
                    case FoodOrderBy.Callories:
                        {
                            dishes = searchParams.Ascending ? dishes.OrderBy(d => d.Callories) : dishes.OrderByDescending(d => d.Callories);
                            break;
                        }

                    case FoodOrderBy.Fats:
                        {
                            dishes = searchParams.Ascending ? dishes.OrderBy(d => d.Fats) : dishes.OrderByDescending(d => d.Fats);
                            break;
                        }

                    case FoodOrderBy.Proteins:
                        {
                            dishes = searchParams.Ascending ? dishes.OrderBy(d => d.Proteins) : dishes.OrderByDescending(d => d.Proteins);
                            break;
                        }

                    case FoodOrderBy.Carbohydrates:
                        {
                            dishes = searchParams.Ascending ? dishes.OrderBy(d => d.Carbohydrates) : dishes.OrderByDescending(d => d.Carbohydrates);
                            break;
                        }

                    default:
                        {
                            dishes = searchParams.Ascending ? dishes.OrderBy(d => d.Name) : dishes.OrderByDescending(d => d.Name);
                            break;
                        }
                }
            }

            return await PagedList<Dish>.CreateAsync(dishes, searchParams.PageNumber, searchParams.PageSize);
        }
    }
}
