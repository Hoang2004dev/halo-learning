using System.Net;

namespace Halo.Application.Exceptions
{
    public class ForbiddenException : Exception
    {
        public int StatusCode { get; } = (int)HttpStatusCode.Forbidden;

        public ForbiddenException(string message = "You are not allowed to perform this action.")
            : base(message)
        {
        }
    }
}
