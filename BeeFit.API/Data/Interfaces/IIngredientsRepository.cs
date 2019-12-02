using BeeFit.API.Helpers;
using BeeFit.API.Models;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IIngredientsRepository : IBeeFitRepository
    {
        public Task<PagedList<Ingredient>> GetMany(FoodSearchParams pagingParams);
    }
}
