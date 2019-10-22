using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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

        [HttpPost("add")]
        public async Task<IActionResult> Add(IngredientForAddDto ingredientForAddDto)
        {
            var userClaim = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = Convert.ToInt32(userClaim.Value);
            var user = await _repo.Get<User>(userId);

            ingredientForAddDto.User = user;

            var ingredientToAdd = _mapper.Map<Ingredient>(ingredientForAddDto);

            _repo.Add(ingredientToAdd);

            return Ok(ingredientToAdd);
        }
    }
}
