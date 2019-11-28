using BeeFit.API.Helpers;
using BeeFit.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IDishesRepository : IBeeFitRepository
    {
        public Task<PagedList<Dish>> GetManyByName(string name, PagingParams pagingParams);
        public Task<PagedList<Dish>> GetManyByUserId(int id, PagingParams pagingParams);
        public Task<PagedList<Dish>> GetManyByNameAndUser(string name, int userId, PagingParams pagingParams);
    }
}
