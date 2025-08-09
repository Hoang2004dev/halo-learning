namespace Halo.Api.Middlewares
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<AuthenticationMiddleware> _logger;

        public AuthenticationMiddleware(RequestDelegate next, ILogger<AuthenticationMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            // Ví dụ parse custom header
            if (context.Request.Headers.TryGetValue("X-Custom-Auth", out var token))
            {
                _logger.LogInformation("✅ Custom Auth Header found: {Token}", token);
                // TODO: Validate token, set context.User
            }

            await _next(context);
        }
    }
}
