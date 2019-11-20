using BeeFit.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IIngredientsRepository : IBeeFitRepository
    {
        public Task<IEnumerable<Ingredient>> GetManyByName(string name);
        public IEnumerable<Ingredient> GetManyByUserId(int id);
    }
}
