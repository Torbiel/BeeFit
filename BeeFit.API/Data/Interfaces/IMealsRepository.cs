using BeeFit.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IMealsRepository : IBeeFitRepository
    {
        public IEnumerable<Meal> GetManyByDate(string date, int userId);
        public IEnumerable<Meal> GetManyByMonth(string date, int userId);
    }
}
