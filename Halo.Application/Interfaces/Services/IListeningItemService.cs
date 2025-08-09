using Halo.Application.Dtos.ListeningItem;

namespace Halo.Application.Interfaces.Services
{
    public interface IListeningItemService
    {
        Task<ListeningItemDto?> GetByIdAsync(int id);
        Task<IEnumerable<ListeningItemDto>> GetByStudyDayIdAsync(int studyDayId);
        Task<IEnumerable<ListeningItemDto>> GetAllAsync();
        Task<ListeningItemDto> CreateAsync(CreateListeningItemDto dto);
        Task<bool> UpdateAsync(UpdateListeningItemDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
