using Halo.Application.Dtos.GrammarItem;

namespace Halo.Application.Interfaces.Services
{
    public interface IGrammarItemService
    {
        Task<GrammarItemDto?> GetByIdAsync(int id);
        Task<IEnumerable<GrammarItemDto>> GetByStudyDayIdAsync(int studyDayId);
        Task<IEnumerable<GrammarItemDto>> GetAllAsync();
        Task<GrammarItemDto> CreateAsync(CreateGrammarItemDto dto);
        Task<bool> UpdateAsync(UpdateGrammarItemDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
