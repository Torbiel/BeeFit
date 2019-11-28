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

        public async Task<PagedList<Ingredient>> GetManyByName(string name, PagingParams pagingParams)
        {
            var ingredients = _context.Set<Ingredient>().Where(i => i.Name.Contains(name));
            return await PagedList<Ingredient>.CreateAsync(ingredients, pagingParams.PageNumber, pagingParams.PageSize);
        }
        public async Task<PagedList<Ingredient>> GetManyByUserId(int id, PagingParams pagingParams)
        {
            var ingredients = _context.Set<Ingredient>().Where(i => i.UserId == id);
            return await PagedList<Ingredient>.CreateAsync(ingredients, pagingParams.PageNumber, pagingParams.PageSize);
        }

        public async Task<PagedList<Ingredient>> GetManyByNameAndUser(string name, int id, PagingParams pagingParams)
        {
            var ingredients = _context.Set<Ingredient>().Where(i => i.UserId == id && i.Name.Contains(name));
            return await PagedList<Ingredient>.CreateAsync(ingredients, pagingParams.PageNumber, pagingParams.PageSize);
        }
    }
}
