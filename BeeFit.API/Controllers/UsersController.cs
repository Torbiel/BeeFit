using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeeFit.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BeeFit.API.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly BeeFitDbContext _context;

        public UsersController(BeeFitDbContext context)
        {
            _context = context;
        }

        [HttpGet("/${id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            return Ok();
        }
    }
}
