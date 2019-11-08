using BeeFit.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IIngredientsRepository : IBeeFitRepository
    {
        public Task<List<Ingredient>> GetManyByName(string name);
    }
}
