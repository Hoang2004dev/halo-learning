using Halo.Domain.Entities;

namespace Halo.Application.Interfaces.Repositories
{
    public interface IWritingItemRepository
    {
        Task<WritingItem?> GetByIdAsync(int id);
        Task<IEnumerable<WritingItem>> GetByStudyDayIdAsync(int studyDayId);
        Task<IEnumerable<WritingItem>> GetAllAsync();
        Task AddAsync(WritingItem item);
        Task UpdateAsync(WritingItem item);
        Task DeleteAsync(int id);
    }
}
