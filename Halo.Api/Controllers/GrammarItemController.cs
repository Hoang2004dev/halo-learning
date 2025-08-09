using Halo.Application.Dtos.GrammarItem;
using Halo.Application.Exceptions;
using Halo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Halo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GrammarItemController : ControllerBase
    {
        private readonly IGrammarItemService _service;

        public GrammarItemController(IGrammarItemService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null) throw new NotFoundException("GrammarItem", id);
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
        public async Task<IActionResult> Create([FromBody] CreateGrammarItemDto dto)
        {
            var result = await _service.CreateAsync(dto);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateGrammarItemDto dto)
        {
            var success = await _service.UpdateAsync(dto);
            if (!success) throw new NotFoundException("GrammarItem", dto.Id);
            return Ok("Updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) throw new NotFoundException("GrammarItem", id);
            return Ok("Deleted successfully");
        }
    }
}
