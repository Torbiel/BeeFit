using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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
        private readonly IBeeFitRepository _repo;
        private readonly IMapper _mapper;

        public IngredientsController(IBeeFitRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Add(IngredientDto ingredientForAddDto)
        {
            var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = int.Parse(userClaim.Value);
            var user = await _repo.Get<User>(userId);

            ingredientForAddDto.User = user;

            var ingredientToAdd = _mapper.Map<Ingredient>(ingredientForAddDto);

            _repo.Add(ingredientToAdd);

            return Ok(ingredientToAdd);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var ingredient = await _repo.Get<Ingredient>(id);
            var ingredientToReturn = _mapper.Map<IngredientDto>(ingredient);

            return Ok(ingredientToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var ingredients = await _repo.GetAll<Ingredient>();
            var ingredientsToReturn = _mapper.Map<IEnumerable<IngredientDto>>(ingredients);

            return Ok(ingredientsToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, IngredientDto ingredientDto)
        {
            var ingredientToUpdate = await _repo.Get<Ingredient>(id);

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(userId != ingredientToUpdate.User.Id)
            {
                return Unauthorized();
            }

            ingredientDto.User = await _repo.Get<User>(userId); // We have to set the user again on update, otherwise it will become null in db
            _mapper.Map(ingredientDto, ingredientToUpdate); // This automatically updates the ingredient

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ingredientToDelete = await _repo.Get<Ingredient>(id);

            if(ingredientToDelete != null)
            {
                _repo.Delete<Ingredient>(id);
            }

            return Ok();
        }
    }
}
