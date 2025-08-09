using Halo.Domain.Entities;

namespace Halo.Application.Interfaces.Services
{
    public interface IRefreshTokenService
    {
        Task<RefreshToken> CreateTokenWithDeviceLimitAsync(User user, string? deviceInfo);
        Task RevokeTokenAsync(string token);

        Task<RefreshToken?> GetByIdAsync(Guid id);
        Task<RefreshToken?> GetByTokenAsync(string token);
        Task<IEnumerable<RefreshToken>> GetByUserIdAsync(Guid userId);

        Task<RefreshToken> ValidateAndGetTokenAsync(string token);
        Task<User> ValidateAndGetUserFromTokenAsync(string token);

        Task DeleteAsync(Guid tokenId);
    }
}
