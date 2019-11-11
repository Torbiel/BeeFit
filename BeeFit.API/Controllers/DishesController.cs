using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BeeFit.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DishesController : ControllerBase
    {
        private readonly IBeeFitRepository _repo;
        private readonly IMapper _mapper;

        public DishesController(IBeeFitRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Add(Dish dishDto) 
        {
            var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = int.Parse(userClaim.Value);
            var user = await _repo.GetById<User>(userId);

            dishDto.User = user;

            var dishToAdd = _mapper.Map<Dish>(dishDto);

            _repo.Add(dishToAdd);

            return Ok(dishToAdd);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var dish = await _repo.GetById<Dish>(id);
            var dishToReturn = _mapper.Map<DishDto>(dish);

            return Ok(dishToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetManyByName(string name)
        {


            return Ok();
        }
    }
}
