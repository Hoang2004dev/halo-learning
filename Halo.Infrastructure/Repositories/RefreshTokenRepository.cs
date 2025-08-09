using Halo.Application.Interfaces.Repositories;
using Halo.Domain.Entities;
using Halo.Infrastructure.Persistence.DbContexts;
using Microsoft.EntityFrameworkCore;

namespace Halo.Infrastructure.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly HaloDbContext _context;

        public RefreshTokenRepository(HaloDbContext context)
        {
            _context = context;
        }

        public async Task<RefreshToken?> GetByIdAsync(Guid tokenId)
        {
            return await _context.RefreshTokens
                .FirstOrDefaultAsync(t => t.Id == tokenId);
        }

        public async Task<IEnumerable<RefreshToken>> GetByUserIdAsync(Guid userId)
        {
            return await _context.RefreshTokens
                .Where(t => t.UserId == userId)
                .ToListAsync();
        }

        public async Task<RefreshToken?> GetByTokenAsync(string token)
        {
            return await _context.RefreshTokens
                .FirstOrDefaultAsync(t => t.Token == token);
        }

        public async Task AddAsync(RefreshToken token)
        {
            await _context.RefreshTokens.AddAsync(token);
        }

        public Task UpdateAsync(RefreshToken token)
        {
            _context.RefreshTokens.Update(token);
            return Task.CompletedTask;
        }

        public async Task DeleteAsync(Guid tokenId)
        {
            var entity = await _context.RefreshTokens.FindAsync(tokenId);
            if (entity != null)
            {
                _context.RefreshTokens.Remove(entity);
            }
        }
    }
}
