using Halo.Domain.Entities;

namespace Halo.Application.Interfaces.Repositories
{
    public interface ISpeakingItemRepository
    {
        Task<SpeakingItem?> GetByIdAsync(int id);
        Task<IEnumerable<SpeakingItem>> GetByStudyDayIdAsync(int studyDayId);
        Task<IEnumerable<SpeakingItem>> GetAllAsync();
        Task AddAsync(SpeakingItem item);
        Task UpdateAsync(SpeakingItem item);
        Task DeleteAsync(int id);
    }
}
