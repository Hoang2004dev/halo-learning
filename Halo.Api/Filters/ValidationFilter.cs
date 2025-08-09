using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Halo.Api.Filters
{
    public class ValidationFilter : IActionFilter
    {
        private readonly ILogger<ValidationFilter> _logger;

        public ValidationFilter(ILogger<ValidationFilter> logger)
        {
            _logger = logger;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var errors = context.ModelState
                    .Where(x => x.Value?.Errors.Any() == true)
                    .Select(x => new
                    {
                        field = x.Key,
                        errors = x.Value?.Errors.Select(e => e.ErrorMessage)
                    });

                _logger.LogWarning("❗ Validation failed for {Path}", context.HttpContext.Request.Path);

                context.Result = new BadRequestObjectResult(new
                {
                    status = 400,
                    message = "Validation failed.",
                    errors
                });
            }
        }

        public void OnActionExecuted(ActionExecutedContext context) { }
    }
}
