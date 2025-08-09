using Halo.Domain.Entities;
using Halo.Domain.Enums;

namespace Halo.Application.Interfaces.Repositories
{
    public interface IVocabItemRepository
    {
        Task<VocabItem?> GetByIdAsync(int id);
        Task<IEnumerable<VocabItem>> GetByStudyDayIdAsync(int studyDayId);
        Task<IEnumerable<VocabItem>> GetAllAsync();
        Task AddAsync(VocabItem item);
        Task UpdateAsync(VocabItem item);
        Task DeleteAsync(int id);
        Task<VocabItem?> GetRandomByStudyDayIdAsync(int studyDayId);
        Task<VocabItem?> GetRandomGlobalAsync();
        Task<int> UpdateStatusAsync(int id, VocabStatus status, CancellationToken ct = default);
    }
}
