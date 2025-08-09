using Halo.Application.Dtos.WritingItem;
using Halo.Application.Exceptions;
using Halo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Halo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WritingItemController : ControllerBase
    {
        private readonly IWritingItemService _service;

        public WritingItemController(IWritingItemService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null) throw new NotFoundException("WritingItem", id);
            return Ok(result);
        }

        [HttpGet("study-day/{studyDayId}")]
        public async Task<IActionResult> GetByStudyDayId(int studyDayId)
        {
            var result = await _service.GetByStudyDayIdAsync(studyDayId);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateWritingItemDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateWritingItemDto dto)
        {
            var success = await _service.UpdateAsync(dto);
            if (!success) throw new NotFoundException("WritingItem", dto.Id);
            return Ok("Updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) throw new NotFoundException("WritingItem", id);
            return Ok("Deleted successfully");
        }
    }
}
