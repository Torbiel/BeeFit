using BeeFit.API.Data.Interfaces;
using BeeFit.API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Data
{
    public class MealsRepository : BeeFitRepository, IMealsRepository
    {
        public MealsRepository(BeeFitDbContext context) : base(context) { }

        public IEnumerable<Meal> GetManyByDate(string date, int userId)
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

        public IEnumerable<Meal> GetManyByMonthAndYear(int month, int year, int userId)
        {
            var meals = new List<Meal>();

            foreach(var meal in _context.Set<Meal>())
            {
                if(meal.Date.Month == month && meal.Date.Year == year && meal.UserId == userId)
                {
                    meals.Add(meal);
                }
            }

            return meals;
        }
    }
}
