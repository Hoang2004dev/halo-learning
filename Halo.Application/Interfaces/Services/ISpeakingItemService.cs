using Halo.Application.Dtos.SpeakingItem;

namespace Halo.Application.Interfaces.Services
{
    public interface ISpeakingItemService
    {
        Task<SpeakingItemDto?> GetByIdAsync(int id);
        Task<IEnumerable<SpeakingItemDto>> GetByStudyDayIdAsync(int studyDayId);
        Task<IEnumerable<SpeakingItemDto>> GetAllAsync();
        Task<SpeakingItemDto> CreateAsync(CreateSpeakingItemDto dto);
        Task<bool> UpdateAsync(UpdateSpeakingItemDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
