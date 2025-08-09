using Halo.Application.Interfaces.Repositories;
using Halo.Domain.Entities;
using Halo.Infrastructure.Persistence.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace Halo.Infrastructure.Repositories
{
    public class GrammarItemRepository : IGrammarItemRepository
    {
        private readonly HaloDbContext _context;

        public GrammarItemRepository(HaloDbContext context)
        {
            _context = context;
        }

        public async Task<GrammarItem?> GetByIdAsync(int id) => await _context.GrammarItems.FindAsync(id);
        public async Task<IEnumerable<GrammarItem>> GetByStudyDayIdAsync(int studyDayId) =>
            await _context.GrammarItems.Where(x => x.StudyDayId == studyDayId).ToListAsync();
        public async Task<IEnumerable<GrammarItem>> GetAllAsync() => await _context.GrammarItems.ToListAsync();
        public async Task AddAsync(GrammarItem item) => await _context.GrammarItems.AddAsync(item);
        public Task UpdateAsync(GrammarItem item) { _context.GrammarItems.Update(item); return Task.CompletedTask; }
        public async Task DeleteAsync(int id)
        {
            var entity = await _context.GrammarItems.FindAsync(id);
            if (entity != null) _context.GrammarItems.Remove(entity);
        }
    }
}
