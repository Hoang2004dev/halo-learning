using Halo.Application.Dtos.Auth;

namespace Halo.Application.Interfaces.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterRequestDto dto);
        Task<AuthResponseDto> LoginAsync(LoginRequestDto dto, string? deviceInfo = null);
        Task<AuthResponseDto> RefreshTokenAsync(string refreshToken, string? deviceInfo = null);
    }
}
