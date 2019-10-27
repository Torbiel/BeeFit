using BeeFit.API.Data.Interfaces;
﻿using AutoMapper;
using BeeFit.API.Dtos;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using BeeFit.API.Helpers;

namespace BeeFit.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IBeeFitRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IBeeFitRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // [Authorize(Roles = Role.Admin)] TODO?: Role-based authentication
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _repo.GetAll<User>();
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _repo.Get<User>(id);
            var userToReturn = _mapper.Map<UserForProfileDto>(user);

            return Ok(userToReturn);
        }
    }
}
