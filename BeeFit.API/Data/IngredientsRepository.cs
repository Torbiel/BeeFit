using BeeFit.API.Data.Interfaces;
using BeeFit.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Data
{
    public class IngredientsRepository : BeeFitRepository, IIngredientsRepository
    {
        public IngredientsRepository(BeeFitDbContext context) : base(context) { }

        public async Task<List<Ingredient>> GetManyByName(string name)
        {
            return await _context.Set<Ingredient>().Where(i => i.Name.Contains(name)).ToListAsync();
        }
    }
}
