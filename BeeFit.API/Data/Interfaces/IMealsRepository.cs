using BeeFit.API.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BeeFit.API.Data.Interfaces
{
    public interface IMealsRepository : IBeeFitRepository
    {
        public Task<IEnumerable<Meal>> GetManyByDate(string date, int userId);
    }
}
