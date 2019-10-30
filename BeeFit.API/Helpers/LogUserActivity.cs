using BeeFit.API.Data.Interfaces;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BeeFit.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next(); // Wait for action to complete
            var userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<IBeeFitRepository>();
            var user = await repo.Get<User>(userId);
            user.LastActive = DateTime.Now;

            await repo.SaveAll();
        }
    }
}
