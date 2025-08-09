using Halo.Application.Interfaces.Repositories;
using Halo.Application.Interfaces.Services;
using Halo.Domain.Entities;

namespace Halo.Application.Services
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IRefreshTokenRepository _tokenRepo;
        private readonly IUserRepository _userRepo;
        private readonly IJwtService _jwtService;
        private readonly IUnitOfWork _unit;

        public RefreshTokenService(
            IRefreshTokenRepository tokenRepo,
            IUserRepository userRepo,
            IJwtService jwtService,
            IUnitOfWork unit)
        {
            _tokenRepo = tokenRepo;
            _userRepo = userRepo;
            _jwtService = jwtService;
            _unit = unit;
        }

        public async Task<RefreshToken> CreateTokenWithDeviceLimitAsync(User user, string? deviceInfo)
        {
            var now = DateTime.UtcNow;
            var allTokens = await _tokenRepo.GetByUserIdAsync(user.Id);

            var validTokens = allTokens
                .Where(t => !t.IsRevoked && t.ExpiresAt > now)
                .OrderBy(t => t.CreatedAt)
                .ToList();

            deviceInfo = deviceInfo?.Trim().ToLowerInvariant();

            // Nếu đã tồn tại deviceInfo → revoke
            if (!string.IsNullOrWhiteSpace(deviceInfo))
            {
                var duplicated = validTokens.FirstOrDefault(t => t.DeviceInfo == deviceInfo);
                if (duplicated != null)
                {
                    duplicated.IsRevoked = true;
                    await _tokenRepo.UpdateAsync(duplicated);
                }
            }

            // Nếu vượt quá giới hạn → revoke token cũ nhất
            if (validTokens.Count >= 5)
            {
                var oldest = validTokens.First();
                oldest.IsRevoked = true;
                await _tokenRepo.UpdateAsync(oldest);
            }

            var token = new RefreshToken
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                Token = _jwtService.GenerateRefreshToken(),
                CreatedAt = now,
                ExpiresAt = now.AddDays(7),
                IsRevoked = false,
                DeviceInfo = deviceInfo
            };

            await _tokenRepo.AddAsync(token);
            await _unit.SaveChangesAsync();
            return token;
        }

        public async Task RevokeTokenAsync(string token)
        {
            var existing = await _tokenRepo.GetByTokenAsync(token);
            if (existing != null && !existing.IsRevoked)
            {
                existing.IsRevoked = true;
                await _tokenRepo.UpdateAsync(existing);
                await _unit.SaveChangesAsync();
            }
        }

        public async Task<RefreshToken?> GetByTokenAsync(string token)
        {
            return await _tokenRepo.GetByTokenAsync(token);
        }

        public async Task<IEnumerable<RefreshToken>> GetByUserIdAsync(Guid userId)
        {
            return await _tokenRepo.GetByUserIdAsync(userId);
        }

        public async Task<RefreshToken?> GetByIdAsync(Guid id)
        {
            return await _tokenRepo.GetByIdAsync(id);
        }

        public async Task<RefreshToken> ValidateAndGetTokenAsync(string token)
        {
            var existing = await _tokenRepo.GetByTokenAsync(token)
                ?? throw new Exception("Invalid refresh token");

            if (existing.ExpiresAt < DateTime.UtcNow || existing.IsRevoked)
                throw new Exception("Refresh token expired or revoked");

            return existing;
        }

        public async Task<User> ValidateAndGetUserFromTokenAsync(string token)
        {
            var validToken = await ValidateAndGetTokenAsync(token);
            var user = await _userRepo.GetByIdAsync(validToken.UserId)
                ?? throw new Exception("User not found");
            return user;
        }

        public async Task DeleteAsync(Guid id)
        {
            await _tokenRepo.DeleteAsync(id);
        }
    }
}
