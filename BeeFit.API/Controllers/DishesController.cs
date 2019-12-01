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

            var currentUserId = int.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var currentUser = await _repo.GetById<User>(currentUserId);
            dishToAdd.User = currentUser;

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
        public async Task<IActionResult> GetManyByName([FromQuery] PagingParams pagingParams)
        {
            var dishes = await _repo.GetManyByName(pagingParams);
            var dishesToReturn = _mapper.Map<IEnumerable<DishForGetDto>>(dishes);

            Response.AddPagination(dishes.CurrentPage, dishes.PageSize, dishes.TotalCount, dishes.TotalPages);

            return Ok(dishesToReturn);
        }

        //[HttpGet]
        //public async Task<IActionResult> GetManyByUserId([FromQuery] PagingParams pagingParams)
        //{
        //    var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        //    var dishes = await _repo.GetManyByUserId(currentUserId, pagingParams);
        //    var dishesToReturn = _mapper.Map<IEnumerable<DishForGetDto>>(dishes);

        //    Response.AddPagination(dishes.CurrentPage, dishes.PageSize, dishes.TotalCount, dishes.TotalPages);

        //    return Ok(dishesToReturn);
        //}

        //[HttpGet("{userId}/{name}")]
        //public async Task<IActionResult> GetManyByNameAndUser(int userId, string name, [FromQuery] PagingParams pagingParams)
        //{
        //    var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        //    var dishes = await _repo.GetManyByNameAndUser(name, userId, pagingParams);
        //    var dishesToReturn = _mapper.Map<IEnumerable<DishForGetDto>>(dishes);

        //    return Ok(dishesToReturn);
        //}

        // TODO?: searching based on callories, fats, proteins, etc. (>= and <=)

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DishForUpdateDto dishDto)
        {
            var dishToUpdate = await _repo.GetById<Dish>(id);

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (currentUserId != dishToUpdate.User.Id)
            {
                var dishToAdd = _mapper.Map<DishForAddDto>(dishDto);
                await Add(dishToAdd);
            }
            else
            {
                _mapper.Map(dishDto, dishToUpdate);
                dishToUpdate.User = await _repo.GetById<User>(currentUserId); // We have to set the user again on update, otherwise it will become null in db

                _repo.Update(dishToUpdate);
            }

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
