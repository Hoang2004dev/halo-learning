using Halo.Application.Interfaces.Repositories;
using Halo.Domain.Entities;
using Halo.Domain.Enums;
using Halo.Infrastructure.Persistence.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace Halo.Infrastructure.Repositories
{
    public class VocabItemRepository : IVocabItemRepository
    {
        private readonly HaloDbContext _context;

        public VocabItemRepository(HaloDbContext context)
        {
            _context = context;
        }

        public async Task<VocabItem?> GetByIdAsync(int id)
        {
            return await _context.VocabItems
                .AsNoTracking() 
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<VocabItem>> GetByStudyDayIdAsync(int studyDayId)
        {
            return await _context.VocabItems
                .Where(v => v.StudyDayId == studyDayId)
                .ToListAsync();
        }

        public async Task<IEnumerable<VocabItem>> GetAllAsync()
        {
            return await _context.VocabItems.ToListAsync();
        }

        public async Task AddAsync(VocabItem item)
        {
            await _context.VocabItems.AddAsync(item);
        }

        public Task UpdateAsync(VocabItem item)
        {
            _context.VocabItems.Update(item);
            return Task.CompletedTask;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.VocabItems.FindAsync(id);
            if (entity != null)
            {
                _context.VocabItems.Remove(entity);
            }
        }

        public async Task<VocabItem?> GetRandomByStudyDayIdAsync(int studyDayId)
        {
            return await _context.VocabItems
                .Where(v => v.StudyDayId == studyDayId)
                .OrderBy(_ => Guid.NewGuid())
                .FirstOrDefaultAsync();
        }

        public async Task<VocabItem?> GetRandomGlobalAsync()
        {
            return await _context.VocabItems
                .OrderBy(_ => Guid.NewGuid())
                .FirstOrDefaultAsync();
        }

        public async Task<int> UpdateStatusAsync(int id, VocabStatus status, CancellationToken ct = default)
        {
            return await _context.VocabItems
                .Where(v => v.Id == id)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(v => v.Status, status)
                , ct);
        }
    }
}
