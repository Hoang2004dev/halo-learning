using Halo.Domain.Entities;

namespace Halo.Application.Interfaces.Repositories
{
    public interface IListeningItemRepository
    {
        Task<ListeningItem?> GetByIdAsync(int id);
        Task<IEnumerable<ListeningItem>> GetByStudyDayIdAsync(int studyDayId);
        Task<IEnumerable<ListeningItem>> GetAllAsync();
        Task AddAsync(ListeningItem item);
        Task UpdateAsync(ListeningItem item);
        Task DeleteAsync(int id);
    }
}
