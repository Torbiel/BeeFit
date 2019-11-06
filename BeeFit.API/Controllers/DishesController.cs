﻿using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<IActionResult> Add(Dish dishDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
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

        [HttpGet("{name}")]
        public async Task<IActionResult> GetManyBySearchPreferences(string name, List<SearchPreference> searchPreferences)
        {
            var dishes = await _repo.GetManyBySearchPreference(name, searchPreferences);
            var dishesToReturn = _mapper.Map<ICollection<DishDto>>(dishes);

            return Ok(dishesToReturn);
        }

        // TODO?: searching based on callories, fats, proteins, etc. (>= and <=)

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DishDto dishDto)
        {
            var dishToUpdate = await _repo.GetById<Dish>(id);

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (userId != dishToUpdate.User.Id)
            {
                return Unauthorized("You can't update someone else's dish.");
            }

            dishDto.User = await _repo.GetById<User>(userId); // We have to set the user again on update, otherwise it will become null in db

            _mapper.Map(dishDto, dishToUpdate); // Auto-update

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
