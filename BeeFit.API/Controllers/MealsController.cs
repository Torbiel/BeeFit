﻿using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos.Meals;
using BeeFit.API.Helpers;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        public async Task<IActionResult> Add(MealForAddDto mealDto)
        {
            mealDto.Date = mealDto.Date.ToLocalTime();
            var mealToAdd = _mapper.Map<Meal>(mealDto);

            var currentUserId = int.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var currentUser = await _repo.GetById<User>(currentUserId);
            mealToAdd.User = currentUser;

            _repo.Add(mealToAdd);

            return Ok();
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var meal = await _repo.GetById<Meal>(id);
            var mealToReturn = _mapper.Map<MealForGetDto>(meal);

            return Ok(mealToReturn);
        }

        [HttpGet("{date:DateTime}")]
        public IActionResult GetManyByDate(DateTime date)
        {
            var currentUserId = int.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var convertedDate = date.GetDateTimeFormats('d').FirstOrDefault();
            var meals = _repo.GetManyByDate(convertedDate, currentUserId);
            var mealsToReturn = _mapper.Map<IEnumerable<MealForGetDto>>(meals);

            return Ok(mealsToReturn);
        }

        [HttpGet("{month:int}/{year:int}")]
        public IActionResult GetManyByMonthAndYear(int month, int year)
        {
            var currentUserId = int.Parse(HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var meals = _repo.GetManyByMonthAndYear(month, year, currentUserId);
            var mealsToReturn = _mapper.Map<IEnumerable<MealForGetDto>>(meals);

            return Ok(mealsToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, MealForUpdateDto mealDto)
        {
            var mealToUpdate = await _repo.GetById<Meal>(id);
            _mapper.Map(mealDto, mealToUpdate);

            _repo.Update(mealToUpdate);

            return NoContent();
        }

        [HttpDelete("{id}")]
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
