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

            dishes = Extensions.FilterDishes(dishes, searchParams);
            dishes = Extensions.SortDishes(dishes, searchParams);

            return await PagedList<Dish>.CreateAsync(dishes, searchParams.PageNumber, searchParams.PageSize);
        }
    }
}
