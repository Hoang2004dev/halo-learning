using Microsoft.Extensions.Options;
using System.Diagnostics;

namespace Halo.Api.Middlewares
{
    public class PerformanceMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<PerformanceMiddleware> _logger;
        private readonly PerformanceOptions _options;

        public PerformanceMiddleware(RequestDelegate next, ILogger<PerformanceMiddleware> logger, IOptions<PerformanceOptions> options)
        {
            _next = next;
            _logger = logger;
            _options = options.Value;
        }

        public async Task Invoke(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            await _next(context);
            stopwatch.Stop();

            var elapsedMs = stopwatch.ElapsedMilliseconds;
            var traceId = Activity.Current?.Id ?? context.TraceIdentifier;
            var correlationId = context.Items.ContainsKey("CorrelationId")
                ? context.Items["CorrelationId"]?.ToString()
                : "None";

            if (elapsedMs > _options.ThresholdMs)
            {
                _logger.LogWarning("🐌 SLOW REQUEST [{TraceId}] CorrelationId={CorrelationId} {Method} {Path} took {Elapsed} ms",
                    traceId, correlationId, context.Request.Method, context.Request.Path, elapsedMs);
            }
            else
            {
                _logger.LogDebug("⏱️ Request [{TraceId}] CorrelationId={CorrelationId} {Method} {Path} took {Elapsed} ms",
                    traceId, correlationId, context.Request.Method, context.Request.Path, elapsedMs);
            }
        }
    }
}
