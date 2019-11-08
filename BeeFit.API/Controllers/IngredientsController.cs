using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Add(IngredientDto ingredientForAddDto)
        {
            var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = int.Parse(userClaim.Value);
            var user = await _repo.GetById<User>(userId);

            ingredientForAddDto.User = user;

            var ingredientToAdd = _mapper.Map<Ingredient>(ingredientForAddDto);

            _repo.Add(ingredientToAdd);

            return Ok();
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var ingredient = await _repo.GetById<Ingredient>(id);
            var ingredientToReturn = _mapper.Map<IngredientDto>(ingredient);

            return Ok(ingredientToReturn);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetManyByName(string name)
        {
            var ingredients = await _repo.Find<Ingredient>(i => i.Name.Contains(name));
            var ingredientsToReturn = _mapper.Map<IngredientDto>(ingredients);

            return Ok(ingredientsToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, IngredientDto ingredientDto)
        {
            var ingredientToUpdate = await _repo.GetById<Ingredient>(id);

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(userId != ingredientToUpdate.User.Id)
            {
                return Unauthorized("You can't update someone else's ingredient.");
            }

            ingredientDto.User = await _repo.GetById<User>(userId); // We have to set the user again on update, otherwise it will become null in db
            _mapper.Map(ingredientDto, ingredientToUpdate); // This automatically updates the ingredient

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if(await _repo.Delete<Ingredient>(id))
            {
                return Ok();
            }

            return BadRequest("This ingredient doesn't exist.");
        }
    }
}
