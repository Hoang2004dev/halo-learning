using Halo.Application.Dtos.WritingItem;

namespace Halo.Application.Interfaces.Services
{
    public interface IWritingItemService
    {
        Task<WritingItemDto?> GetByIdAsync(int id);
        Task<IEnumerable<WritingItemDto>> GetByStudyDayIdAsync(int studyDayId);
        Task<IEnumerable<WritingItemDto>> GetAllAsync();
        Task<WritingItemDto> CreateAsync(CreateWritingItemDto dto);
        Task<bool> UpdateAsync(UpdateWritingItemDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
