using BeeFit.API.Data;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BeeFit.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IBeeFitRepository _repo;

        public UsersController(IBeeFitRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetAll<User>();

            return Ok(users);
        }

        [HttpGet("/${id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.Get<User>(id);

            return Ok(user);
        }
    }
}
