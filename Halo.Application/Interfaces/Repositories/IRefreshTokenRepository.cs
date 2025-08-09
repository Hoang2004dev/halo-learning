using Halo.Domain.Entities;

namespace Halo.Application.Interfaces.Repositories
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken?> GetByIdAsync(Guid tokenId);
        Task<IEnumerable<RefreshToken>> GetByUserIdAsync(Guid userId);
        Task<RefreshToken?> GetByTokenAsync(string token);
        Task AddAsync(RefreshToken token);
        Task UpdateAsync(RefreshToken token);
        Task DeleteAsync(Guid tokenId);
    }
}
