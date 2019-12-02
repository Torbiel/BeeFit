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

        public async Task<PagedList<Ingredient>> GetMany(FoodSearchParams pagingParams)
        {
            if (pagingParams.Name == null)
            {
                pagingParams.Name = "";
            }

            var ingredients = _context.Set<Ingredient>().Where(i => i.Name.Contains(pagingParams.Name)).OrderByDescending(d => d.Name).AsQueryable();

            if (pagingParams.UserId != null)
            {
                ingredients = ingredients.Where(d => d.UserId == pagingParams.UserId);
            }

            if (pagingParams.MinCallories != null)
            {
                ingredients = ingredients.Where(d => d.Callories >= pagingParams.MinCallories);
            }

            if (pagingParams.MaxCallories != null)
            {
                ingredients = ingredients.Where(d => d.Callories <= pagingParams.MaxCallories);
            }

            return await PagedList<Ingredient>.CreateAsync(ingredients, pagingParams.PageNumber, pagingParams.PageSize);
        }
    }
}
