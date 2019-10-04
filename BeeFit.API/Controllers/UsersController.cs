using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeeFit.API.Data;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BeeFit.API.Controllers
{
    public class UsersController : Controller
    {
        private readonly BeeFitDbContext _context;

        public UsersController(BeeFitDbContext context)
        {
            _context = context;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
