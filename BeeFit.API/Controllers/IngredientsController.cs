using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BeeFit.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        private readonly IBeeFitRepository _repo;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public IngredientsController(IBeeFitRepository repo, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _repo = repo;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create(IngredientDto ingredientForAddDto)
        {
            var userClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = Convert.ToInt32(userClaim.Value);
            var user = await _repo.Get<User>(userId);

            ingredientForAddDto.User = user;

            var ingredientToAdd = _mapper.Map<Ingredient>(ingredientForAddDto);

            _repo.Add(ingredientToAdd);

            return Ok(ingredientToAdd);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
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

            _mapper.Map(ingredientDto, ingredientToUpdate); // This automatically updates the ingredient

            return Ok();
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
