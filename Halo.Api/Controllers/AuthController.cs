using Halo.Application.Dtos.Auth;
using Halo.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace Halo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
        {
            var result = await _authService.RegisterAsync(dto);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();
            var userAgent = Request.Headers["User-Agent"].ToString();
            var fullDeviceInfo = $"Client: {dto.DeviceInfo ?? "Unknown"} | IP: {ip} | UA: {userAgent}";

            var result = await _authService.LoginAsync(dto, fullDeviceInfo);
            return Ok(result);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequestDto dto)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();
            var userAgent = Request.Headers["User-Agent"].ToString();
            var deviceInfo = $"REFRESH | IP: {ip} | UA: {userAgent}";

            var result = await _authService.RefreshTokenAsync(dto.RefreshToken, deviceInfo);
            return Ok(result);
        }
    }
}
