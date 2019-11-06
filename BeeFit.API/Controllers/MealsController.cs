using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BeeFit.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MealsController : ControllerBase
    {
        private readonly IMealsRepository _repo;
        private readonly IMapper _mapper;

        public MealsController(IMealsRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult Add(MealDto mealDto)
        {
            var dishToAdd = _mapper.Map<Meal>(mealDto);
            _repo.Add(dishToAdd);

            return Ok(dishToAdd);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var meal = await _repo.GetById<Meal>(id);
            var mealToReturn = _mapper.Map<MealDto>(meal);

            return Ok(mealToReturn);
        }

        [HttpGet("{date}")]
        public async Task<IActionResult> GetManyByDate(DateTime date)
        {
            var meals = await _repo.GetManyByDate(date);
            var mealsToReturn = _mapper.Map<MealDto>(meals);

            return Ok(mealsToReturn);
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, MealDto mealDto)
        {
            var mealToUpdate = await _repo.GetById<Meal>(id);
            _mapper.Map(mealDto, mealToUpdate);

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            if(await _repo.Delete<Meal>(id))
            {
                return Ok();
            }

            return BadRequest("This meal doesn't exist.");
        }
    }
}
