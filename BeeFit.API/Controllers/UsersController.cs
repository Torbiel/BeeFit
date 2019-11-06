using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos;
using BeeFit.API.Helpers;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BeeFit.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IBeeFitRepository _repo;
        private readonly IAuthRepository _authRepo;
        private readonly IMapper _mapper;

        public UsersController(IBeeFitRepository repo, IAuthRepository authrepo, IMapper mapper)
        {
            _repo = repo;
            _authRepo = authrepo;
            _mapper = mapper;
        }

        // [Authorize(Roles = Role.Admin)] TODO?: Role-based authentication

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _repo.GetById<User>(id);
            var userToReturn = _mapper.Map<UserForProfileDto>(user);

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            var userToUpdate = await _repo.GetById<User>(id);
            var oldPass = userForUpdateDto.OldPassword;
            var newPass = userForUpdateDto.NewPassword;
            
            if(!string.IsNullOrWhiteSpace(oldPass) && !string.IsNullOrWhiteSpace(newPass))
            {
                if (_authRepo.CreateNewPassword(userToUpdate, userForUpdateDto.OldPassword, userForUpdateDto.NewPassword) == null)
                {
                    return BadRequest("Old password is invalid.");
                }
            }

            _mapper.Map(userForUpdateDto, userToUpdate);
            await _repo.SaveAll();

            return NoContent();
        }
    }
}
