using Halo.Application.Dtos.Auth;
using Halo.Application.Interfaces.Repositories;
using Halo.Application.Interfaces.Services;
using Halo.Domain.Entities;
using Halo.Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Halo.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepo;
        private readonly IJwtService _jwtService;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly IUnitOfWork _unit;

        public AuthService(
            IUserRepository userRepo,
            IJwtService jwtService,
            IPasswordHasher<User> passwordHasher,
            IRefreshTokenService refreshTokenService,
            IUnitOfWork unit)
        {
            _userRepo = userRepo;
            _jwtService = jwtService;
            _passwordHasher = passwordHasher;
            _refreshTokenService = refreshTokenService;
            _unit = unit;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto dto)
        {
            var existing = await _userRepo.GetByEmailAsync(dto.Email);
            if (existing != null) throw new Exception("Email already registered");

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = dto.Username,
                Email = dto.Email,
                Role = UserRole.Student,
                Status = UserStatus.Active,
                CreatedAt = DateTime.UtcNow,
                PasswordHash = _passwordHasher.HashPassword(new User(), dto.Password)
            };

            await _userRepo.AddAsync(user);
            await _unit.SaveChangesAsync();

            var refreshToken = await _refreshTokenService.CreateTokenWithDeviceLimitAsync(user, "REGISTER");

            return new AuthResponseDto
            {
                AccessToken = _jwtService.GenerateAccessToken(user),
                RefreshToken = refreshToken.Token,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role.ToString()
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginRequestDto dto, string? deviceInfo = null)
        {
            var user = await _userRepo.GetByEmailAsync(dto.Email)
                ?? throw new Exception("Invalid email or password");

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (result == PasswordVerificationResult.Failed)
                throw new Exception("Invalid email or password");

            var refreshToken = await _refreshTokenService.CreateTokenWithDeviceLimitAsync(user, deviceInfo);

            return new AuthResponseDto
            {
                AccessToken = _jwtService.GenerateAccessToken(user),
                RefreshToken = refreshToken.Token,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role.ToString()
            };
        }

        public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken, string? deviceInfo = null)
        {
            var user = await _refreshTokenService.ValidateAndGetUserFromTokenAsync(refreshToken);

            await _refreshTokenService.RevokeTokenAsync(refreshToken);

            var newRefreshToken = await _refreshTokenService.CreateTokenWithDeviceLimitAsync(user, deviceInfo);

            return new AuthResponseDto
            {
                AccessToken = _jwtService.GenerateAccessToken(user),
                RefreshToken = newRefreshToken.Token,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role.ToString()
            };
        }
    }
}
