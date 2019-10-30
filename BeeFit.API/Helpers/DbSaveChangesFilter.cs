using BeeFit.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;

namespace BeeFit.API.Helpers
{
    public class DbSaveChangesFilter : IAsyncActionFilter
    {
        private readonly BeeFitDbContext _context;
        
        public DbSaveChangesFilter(BeeFitDbContext context)
        {
            _context = context;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var result = await next();

            if(result.Exception == null || result.ExceptionHandled)
            {
                await _context.SaveChangesAsync();
            }
        }
    }
}
