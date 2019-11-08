using BeeFit.API.Data.Interfaces;
using BeeFit.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Data
{
    public class MealsRepository : BeeFitRepository, IMealsRepository
    {
        public MealsRepository(BeeFitDbContext context) : base(context) { }

        public async Task<IEnumerable<Meal>> GetManyByDate(DateTime date)
        {
            return await _context.Set<Meal>().Where(m => m.Date == date).ToListAsync();
        }
    }
}
