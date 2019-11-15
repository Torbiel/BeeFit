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

        public async Task<IEnumerable<Meal>> GetManyByDate(string date, int userId)
        {
            var meals = new List<Meal>();

            foreach(var meal in _context.Set<Meal>())
            {
                if(meal.Date.GetDateTimeFormats('d').FirstOrDefault() == date && meal.UserId == userId)
                {
                    meals.Add(meal);
                }
            }

            return meals;
        }
    }
}
