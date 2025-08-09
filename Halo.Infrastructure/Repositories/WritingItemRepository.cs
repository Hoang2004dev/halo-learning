using Halo.Application.Interfaces.Repositories;
using Halo.Domain.Entities;
using Halo.Infrastructure.Persistence.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace Halo.Infrastructure.Repositories
{
    public class WritingItemRepository : IWritingItemRepository
    {
        private readonly HaloDbContext _context;

        public WritingItemRepository(HaloDbContext context)
        {
            _context = context;
        }

        public async Task<WritingItem?> GetByIdAsync(int id) => await _context.WritingItems.FindAsync(id);
        public async Task<IEnumerable<WritingItem>> GetByStudyDayIdAsync(int studyDayId) =>
            await _context.WritingItems.Where(x => x.StudyDayId == studyDayId).ToListAsync();
        public async Task<IEnumerable<WritingItem>> GetAllAsync() => await _context.WritingItems.ToListAsync();
        public async Task AddAsync(WritingItem item) => await _context.WritingItems.AddAsync(item);
        public Task UpdateAsync(WritingItem item) { _context.WritingItems.Update(item); return Task.CompletedTask; }
        public async Task DeleteAsync(int id)
        {
            var entity = await _context.WritingItems.FindAsync(id);
            if (entity != null) _context.WritingItems.Remove(entity);
        }
    }
}
