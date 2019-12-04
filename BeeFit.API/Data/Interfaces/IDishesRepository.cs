using BeeFit.API.Helpers;
using BeeFit.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IDishesRepository : IBeeFitRepository
    {
        public Task<PagedList<Dish>> GetMany(FoodSearchParams pagingParams);
    }
}
