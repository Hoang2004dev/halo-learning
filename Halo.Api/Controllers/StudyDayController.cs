using Halo.Application.Dtos.StudyDay;
using Halo.Application.Exceptions;
using Halo.Application.Interfaces.Services;
using Halo.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Halo.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StudyDayController : ControllerBase
    {
        private readonly IStudyDayService _service;

        public StudyDayController(IStudyDayService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null)
                throw new NotFoundException("StudyDay", id);

            return Ok(result);
        }

        [HttpGet("date/{date}")]
        public async Task<IActionResult> GetByDate(DateTime date)
        {
            var result = await _service.FilterByDateAsync(date);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStudyDayDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateStudyDayDto dto)
        {
            var success = await _service.UpdateAsync(dto);
            if (!success) throw new NotFoundException("StudyDay", dto.Id);
            return Ok("Updated successfully");
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromQuery] StudyDayStatus newStatus)
        {
            var success = await _service.UpdateStatusAsync(id, newStatus);
            if (!success) throw new NotFoundException("StudyDay", id);
            return Ok("Status updated");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) throw new NotFoundException("StudyDay", id);
            return Ok("Deleted successfully");
        }
    }
}
