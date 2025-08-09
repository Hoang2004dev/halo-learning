using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Halo.Api.Filters
{
    public class AdminOnlyFilter : IAuthorizationFilter
    {
        private readonly ILogger<AdminOnlyFilter> _logger;

        public AdminOnlyFilter(ILogger<AdminOnlyFilter> logger)
        {
            _logger = logger;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if (!user.Identity?.IsAuthenticated ?? false)
            {
                context.Result = new UnauthorizedResult();
                _logger.LogWarning("❗ Unauthorized access attempt.");
                return;
            }

            if (!user.IsInRole("Admin"))
            {
                context.Result = new ForbidResult();
                _logger.LogWarning("❗ Forbidden: User {User} tried Admin endpoint.", user.Identity?.Name);
            }
        }
    }
}
