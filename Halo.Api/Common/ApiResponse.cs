using System.Diagnostics;

namespace Halo.Api.Common
{
    public class ApiResponse<T>
    {
        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }
        public object? Errors { get; set; }
        public string? TraceId { get; set; }
        public string? CorrelationId { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public static ApiResponse<T> Success(T data, string message = "Request successful", int statusCode = 200)
        {
            return new ApiResponse<T>
            {
                StatusCode = statusCode,
                Message = message,
                Data = data,
                TraceId = Activity.Current?.Id ?? string.Empty
            };
        }

        public static ApiResponse<T> Failure(string message = "Request failed", object? errors = null, int statusCode = 400)
        {
            return new ApiResponse<T>
            {
                StatusCode = statusCode,
                Message = message,
                Errors = errors,
                TraceId = Activity.Current?.Id ?? string.Empty,
                Timestamp = DateTime.UtcNow
            };
        }

        public static ApiResponse<T> NoContent(string message = "No content available")
        {
            return new ApiResponse<T>
            {
                StatusCode = 204,
                Message = message,
                TraceId = Activity.Current?.Id ?? string.Empty
            };
        }
    }
}
