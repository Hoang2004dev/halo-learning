using Halo.Application.Dtos.VocabItem;

namespace Halo.Application.Interfaces.Services
{
    public interface IVocabItemService
    {
        Task<VocabItemDto?> GetByIdAsync(int id);
        Task<IEnumerable<VocabItemDto>> GetByStudyDayIdAsync(int studyDayId);
        Task<IEnumerable<VocabItemDto>> GetAllAsync();
        Task<VocabItemDto> CreateAsync(CreateVocabItemDto dto);
        Task<bool> UpdateAsync(UpdateVocabItemDto dto);
        Task<bool> DeleteAsync(int id);
        Task<VocabItemDto?> GetRandomByStudyDayIdAsync(int studyDayId);
        Task<VocabItemDto?> GetRandomGlobalAsync();
        Task<VocabItemDto> UpdateStatusAsync(UpdateVocabItemStatusDto dto);
    }
}
