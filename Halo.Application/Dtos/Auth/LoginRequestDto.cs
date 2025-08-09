namespace Halo.Application.Dtos.Auth
{
    public class LoginRequestDto
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? DeviceInfo { get; set; } // client truyền: "Chrome on Windows", "HaloApp iOS", etc
    }
}
