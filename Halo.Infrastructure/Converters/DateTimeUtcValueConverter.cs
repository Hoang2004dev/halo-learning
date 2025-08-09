using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Halo.Infrastructure.Converters
{
    public class DateTimeUtcValueConverter : ValueConverter<DateTime, DateTime>
    {
        public DateTimeUtcValueConverter()
            : base(
                v => v.Kind == DateTimeKind.Unspecified
                    ? DateTime.SpecifyKind(v, DateTimeKind.Utc)
                    : v.ToUniversalTime(),
                v => DateTime.SpecifyKind(v, DateTimeKind.Utc))
        {
        }
    }
}
