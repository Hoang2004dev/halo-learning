using Halo.Application.Interfaces.Repositories;
using Halo.Domain.Entities;
using Halo.Infrastructure.Persistence.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace Halo.Infrastructure.Repositories
{
    public class ListeningItemRepository : IListeningItemRepository
    {
        private readonly HaloDbContext _context;

        public ListeningItemRepository(HaloDbContext context)
        {
            _context = context;
        }

        public async Task<ListeningItem?> GetByIdAsync(int id) => await _context.ListeningItems.FindAsync(id);
        public async Task<IEnumerable<ListeningItem>> GetByStudyDayIdAsync(int studyDayId) =>
            await _context.ListeningItems.Where(x => x.StudyDayId == studyDayId).ToListAsync();
        public async Task<IEnumerable<ListeningItem>> GetAllAsync() => await _context.ListeningItems.ToListAsync();
        public async Task AddAsync(ListeningItem item) => await _context.ListeningItems.AddAsync(item);
        public Task UpdateAsync(ListeningItem item) { _context.ListeningItems.Update(item); return Task.CompletedTask; }
        public async Task DeleteAsync(int id)
        {
            var entity = await _context.ListeningItems.FindAsync(id);
            if (entity != null) _context.ListeningItems.Remove(entity);
        }
    }
}
