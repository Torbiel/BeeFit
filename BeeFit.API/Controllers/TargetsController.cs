using AutoMapper;
using BeeFit.API.Data.Interfaces;
using BeeFit.API.Dtos;
using BeeFit.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeeFit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TargetsController : ControllerBase
    {
        private readonly IBeeFitRepository _repo;
        private readonly IMapper _mapper;

        public TargetsController(IBeeFitRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Add(TargetDto targetDto)
        {
            var targetToAdd = _mapper.Map<Target>(targetDto);
            _repo.Add(targetToAdd);

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var target = await _repo.GetById<Target>(id);
            var targetToReturn = _mapper.Map<TargetDto>(target);

            return Ok(targetToReturn);
        }

        [HttpPut]
        public IActionResult Update(TargetDto targetDto)
        {
            var targetToUpdate = _mapper.Map<Target>(targetDto);
            _repo.Update(targetToUpdate);

            return NoContent();
        }
    }
}
