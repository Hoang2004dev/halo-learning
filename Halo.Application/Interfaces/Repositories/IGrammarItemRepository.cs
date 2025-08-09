using Halo.Domain.Entities;

namespace Halo.Application.Interfaces.Repositories
{
    public interface IGrammarItemRepository
    {
        Task<GrammarItem?> GetByIdAsync(int id);
        Task<IEnumerable<GrammarItem>> GetByStudyDayIdAsync(int studyDayId);
        Task<IEnumerable<GrammarItem>> GetAllAsync();
        Task AddAsync(GrammarItem item);
        Task UpdateAsync(GrammarItem item);
        Task DeleteAsync(int id);
    }
}
