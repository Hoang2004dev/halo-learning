using Halo.Api.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Halo.Api.Filters
{
    public class ApiResponseWrapperFilter : IResultFilter
    {
        private readonly ILogger<ApiResponseWrapperFilter> _logger;

        public ApiResponseWrapperFilter(ILogger<ApiResponseWrapperFilter> logger)
        {
            _logger = logger;
        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
            if (context.Result is ObjectResult objectResult)
            {
                // Skip if already wrapped
                if (objectResult.Value is ApiResponse<object> ||
                    objectResult.Value?.GetType().IsGenericType == true &&
                    objectResult.Value.GetType().GetGenericTypeDefinition() == typeof(ApiResponse<>))
                {
                    return;
                }

                var traceId = context.HttpContext.TraceIdentifier;
                var correlationId = context.HttpContext.Items.ContainsKey("CorrelationId")
                    ? context.HttpContext.Items["CorrelationId"]?.ToString()
                    : null;

                var statusCode = objectResult.StatusCode ?? 200;

                ApiResponse<object> wrapped;

                if (statusCode >= 400)
                {
                    wrapped = ApiResponse<object>.Failure("Request failed", objectResult.Value, statusCode);
                }
                else
                {
                    wrapped = ApiResponse<object>.Success(objectResult.Value, "Request successful", statusCode);
                }

                wrapped.TraceId = traceId;
                wrapped.CorrelationId = correlationId;

                context.Result = new ObjectResult(wrapped)
                {
                    StatusCode = statusCode
                };

                _logger.LogDebug("Wrapped response for {Path}", context.HttpContext.Request.Path);
            }
        }

        public void OnResultExecuted(ResultExecutedContext context) { }
    }
}
