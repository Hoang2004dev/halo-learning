using Halo.Api.Common;
using Halo.Application.Exceptions;
using System.Net;
using System.Text.Json;

namespace Halo.Api.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var traceId = context.TraceIdentifier;
            var correlationId = context.Items.ContainsKey("CorrelationId")
                ? context.Items["CorrelationId"]?.ToString()
                : "None";

            _logger.LogError(exception, "Exception in {Method} {Path} CorrelationId={CorrelationId}: {Message}",
                context.Request.Method, context.Request.Path, correlationId, exception.Message);

            var code = HttpStatusCode.InternalServerError;
            object? errors = null;
            string message = "An unexpected error occurred.";

            switch (exception)
            {
                case FluentValidation.ValidationException validation:
                    code = HttpStatusCode.BadRequest;
                    message = "Validation failed.";
                    errors = validation.Errors.Select(e => new
                    {
                        field = e.PropertyName,
                        error = e.ErrorMessage
                    });
                    break;
                case NotFoundException:
                    code = HttpStatusCode.NotFound;
                    message = exception.Message;
                    break;
                case ForbiddenAccessException:
                    code = HttpStatusCode.Forbidden;
                    message = exception.Message;
                    break;
                case UnauthorizedException:
                    code = HttpStatusCode.Unauthorized;
                    message = exception.Message;
                    break;
                case ConflictException:
                    code = HttpStatusCode.Conflict;
                    message = exception.Message;
                    break;
                case BadRequestException:
                    code = HttpStatusCode.BadRequest;
                    message = exception.Message;
                    break;
            }

            var showDetails = _env.IsDevelopment();
            if (showDetails && errors == null)
            {
                errors = new { details = exception.ToString() };
            }

            var response = ApiResponse<object>.Failure(message, errors, (int)code);
            response.TraceId = traceId;
            response.CorrelationId = correlationId;

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;

            var result = JsonSerializer.Serialize(response);
            await context.Response.WriteAsync(result);
        }
    }
}
