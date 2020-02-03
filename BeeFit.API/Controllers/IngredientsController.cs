using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos.Ingredients;
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
        public IActionResult Add(IngredientForAddDto ingredientDto)
        {
            var ingredientToAdd = _mapper.Map<Ingredient>(ingredientDto);

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

        [HttpGet]
        public async Task<IActionResult> GetMany([FromQuery] FoodSearchParams searchParams)
        {
            var ingredients = await _repo.GetMany(searchParams);
            var ingredientsToReturn = _mapper.Map<IEnumerable<IngredientForGetDto>>(ingredients);

            Response.AddPagination(ingredients.CurrentPage, ingredients.PageSize, ingredients.TotalCount, ingredients.TotalPages);

            return Ok(ingredientsToReturn);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, IngredientForUpdateDto ingredientDto)
        {
            var ingredientToUpdate = _mapper.Map<Ingredient>(ingredientDto);

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
