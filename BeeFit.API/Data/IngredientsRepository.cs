using BeeFit.API.Data.Interfaces;
using BeeFit.API.Helpers;
using BeeFit.API.Models;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Data
{
    public class IngredientsRepository : BeeFitRepository, IIngredientsRepository
    {
        public IngredientsRepository(BeeFitDbContext context) : base(context) { }

        public async Task<PagedList<Ingredient>> GetMany(FoodSearchParams searchParams)
        {
            if (searchParams.Name == null)
            {
                searchParams.Name = "";
            }

            var ingredients = _context.Set<Ingredient>().Where(i => i.Name.Contains(searchParams.Name)).OrderByDescending(d => d.Name).AsQueryable();

            ingredients = Extensions.FilterIngredients(ingredients, searchParams);
            ingredients = Extensions.SortIngredients(ingredients, searchParams);

            return await PagedList<Ingredient>.CreateAsync(ingredients, searchParams.PageNumber, searchParams.PageSize);
        }
    }
}
