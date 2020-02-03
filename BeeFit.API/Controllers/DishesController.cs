using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos.Dishes;
using BeeFit.API.Helpers;
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
        private readonly IDishesRepository _repo;
        private readonly IMapper _mapper;

        public DishesController(IDishesRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Add(DishForAddDto dishDto)
        {
            var dishToAdd = _mapper.Map<Dish>(dishDto);

            _repo.Add(dishToAdd);

            return Ok();
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var dish = await _repo.GetById<Dish>(id);
            var dishToReturn = _mapper.Map<DishForGetDto>(dish);

            return Ok(dishToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetMany([FromQuery] FoodSearchParams searchParams)
        {
            var dishes = await _repo.GetMany(searchParams);
            var dishesToReturn = _mapper.Map<IEnumerable<DishForGetDto>>(dishes);

            Response.AddPagination(dishes.CurrentPage, dishes.PageSize, dishes.TotalCount, dishes.TotalPages);

            return Ok(dishesToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DishForUpdateDto dishDto)
        {
            var dishToUpdate = await _repo.GetById<Dish>(id);
            _mapper.Map(dishDto, dishToUpdate);

            _repo.Update(dishToUpdate);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _repo.Delete<Dish>(id))
            {
                return Ok();
            }

            return BadRequest("This dish doesn't exist.");
        }
    }
}
