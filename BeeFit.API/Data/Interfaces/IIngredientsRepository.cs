using BeeFit.API.Helpers;
using BeeFit.API.Models;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IIngredientsRepository : IBeeFitRepository
    {
        public Task<PagedList<Ingredient>> GetManyByName(string name, PagingParams pagingParams);
        public Task<PagedList<Ingredient>> GetManyByUserId(int id, PagingParams pagingParams);
        public Task<PagedList<Ingredient>> GetManyByNameAndUser(string name, int id, PagingParams pagingParams);
    }
}
