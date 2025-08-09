using Halo.Application.Dtos.VocabItem;
using Halo.Application.Exceptions;
using Halo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Halo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VocabItemController : ControllerBase
    {
        private readonly IVocabItemService _service;

        public VocabItemController(IVocabItemService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null) throw new NotFoundException("VocabItem", id);
            return Ok(result);
        }

        [HttpGet("study-day/{studyDayId}")]
        public async Task<IActionResult> GetByStudyDay(int studyDayId)
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
        public async Task<IActionResult> Create([FromBody] CreateVocabItemDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateVocabItemDto dto)
        {
            var success = await _service.UpdateAsync(dto);
            if (!success) throw new NotFoundException("VocabItem", dto.Id);
            return Ok("Updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) throw new NotFoundException("VocabItem", id);
            return Ok("Deleted successfully");
        }

        [HttpGet("random/study-day/{studyDayId}")]
        public async Task<IActionResult> GetRandomByStudyDay(int studyDayId)
        {
            var result = await _service.GetRandomByStudyDayIdAsync(studyDayId);
            if (result == null) return NotFound("No vocab found for this study day");
            return Ok(result);
        }

        [HttpGet("random")]
        public async Task<IActionResult> GetRandomGlobal()
        {
            var result = await _service.GetRandomGlobalAsync();
            if (result == null) return NotFound("No vocab items found");
            return Ok(result);
        }

        [HttpPatch("{id:int}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateVocabItemStatusDto dto)
        {
            if (id != dto.Id) return BadRequest("Route id and body id mismatch.");
            var updated = await _service.UpdateStatusAsync(dto);
            return Ok(updated); 
        }
    }
}
