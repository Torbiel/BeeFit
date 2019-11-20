using BeeFit.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IDishesRepository : IBeeFitRepository
    {
        public Task<IEnumerable<Dish>> GetManyByName(string name);
        public IEnumerable<Dish> GetManyByUserId(int id);
    }
}
