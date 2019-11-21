using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos.Ingredients;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BeeFit.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        private readonly IIngredientsRepository _repo;
        private readonly IMapper _mapper;

        public IngredientsController(IMapper mapper, IIngredientsRepository repo)
        {
            _mapper = mapper;
            _repo = repo;
        }


        [HttpPost]
        public async Task<IActionResult> Add(IngredientForAddDto ingredientDto)
        {
            var ingredientToAdd = _mapper.Map<Ingredient>(ingredientDto);

            var currentUserId = int.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var currentUser = await _repo.GetById<User>(currentUserId);
            ingredientToAdd.User = currentUser;

            _repo.Add(ingredientToAdd);

            return Ok();
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var ingredient = await _repo.GetById<Ingredient>(id);
            var ingredientToReturn = _mapper.Map<IngredientForGetDto>(ingredient);

            return Ok(ingredientToReturn);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetManyByName(string name)
        {
            var ingredients = await _repo.GetManyByName(name);
            var ingredientsToReturn = _mapper.Map<IEnumerable<IngredientForGetDto>>(ingredients);

            return Ok(ingredientsToReturn);
        }

        [HttpGet]
        public IActionResult GetManyByUserId()
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var ingredients = _repo.GetManyByUserId(currentUserId);
            var ingredientsToReturn = _mapper.Map<IEnumerable<Ingredient>>(ingredients);

            return Ok(ingredientsToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, IngredientForUpdateDto ingredientDto)
        {
            var ingredientToUpdate = await _repo.GetById<Ingredient>(id);

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (currentUserId != ingredientToUpdate.User.Id)
            {
                return Unauthorized("You can't update someone else's ingredient.");
            }

            var currentUser = await _repo.GetById<User>(currentUserId);

            _mapper.Map(ingredientDto, ingredientToUpdate);
            ingredientToUpdate.User = currentUser; // We have to set the user again on update, otherwise it will become null in db

            _repo.Update(ingredientToUpdate);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _repo.Delete<Ingredient>(id))
            {
                return Ok();
            }

            return BadRequest("This ingredient doesn't exist.");
        }
    }
}
