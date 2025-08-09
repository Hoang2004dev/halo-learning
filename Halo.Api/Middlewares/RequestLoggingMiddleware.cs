using System.Diagnostics;

namespace Halo.Api.Middlewares
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            var traceId = Activity.Current?.Id ?? context.TraceIdentifier;
            var correlationId = context.Items.ContainsKey("CorrelationId")
                ? context.Items["CorrelationId"]?.ToString()
                : "None";

            var request = context.Request;
            var user = context.User?.Identity?.IsAuthenticated == true
                ? context.User.Identity.Name
                : "Anonymous";

            var fullPath = request.Path + request.QueryString;

            _logger.LogInformation(
                "➡️ HTTP Request [{TraceId}] CorrelationId={CorrelationId} User={User} {Method} {FullPath}",
                traceId, correlationId, user, request.Method, fullPath);

            foreach (var header in request.Headers)
            {
                _logger.LogDebug("Header: {Key} = {Value}", header.Key, header.Value);
            }

            await _next(context);

            _logger.LogInformation(
                "✅ HTTP Response [{TraceId}] CorrelationId={CorrelationId} Status={StatusCode}",
                traceId, correlationId, context.Response.StatusCode);
        }
    }
}
