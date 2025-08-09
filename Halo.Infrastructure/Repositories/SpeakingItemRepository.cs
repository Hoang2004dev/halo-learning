using Halo.Application.Interfaces.Repositories;
using Halo.Domain.Entities;
using Halo.Infrastructure.Persistence.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace Halo.Infrastructure.Repositories
{
    public class SpeakingItemRepository : ISpeakingItemRepository
    {
        private readonly HaloDbContext _context;

        public SpeakingItemRepository(HaloDbContext context)
        {
            _context = context;
        }

        public async Task<SpeakingItem?> GetByIdAsync(int id) => await _context.SpeakingItems.FindAsync(id);
        public async Task<IEnumerable<SpeakingItem>> GetByStudyDayIdAsync(int studyDayId) =>
            await _context.SpeakingItems.Where(x => x.StudyDayId == studyDayId).ToListAsync();
        public async Task<IEnumerable<SpeakingItem>> GetAllAsync() => await _context.SpeakingItems.ToListAsync();
        public async Task AddAsync(SpeakingItem item) => await _context.SpeakingItems.AddAsync(item);
        public Task UpdateAsync(SpeakingItem item) { _context.SpeakingItems.Update(item); return Task.CompletedTask; }
        public async Task DeleteAsync(int id)
        {
            var entity = await _context.SpeakingItems.FindAsync(id);
            if (entity != null) _context.SpeakingItems.Remove(entity);
        }
    }
}
