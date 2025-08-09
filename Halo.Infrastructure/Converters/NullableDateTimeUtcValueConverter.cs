using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Halo.Infrastructure.Converters
{
    public class NullableDateTimeUtcValueConverter : ValueConverter<DateTime?, DateTime?>
    {
        public NullableDateTimeUtcValueConverter()
            : base(
                v => v.HasValue
                    ? (v.Value.Kind == DateTimeKind.Unspecified
                        ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc)
                        : v.Value.ToUniversalTime())
                    : v,
                v => v.HasValue
                    ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc)
                    : v)
        {
        }
    }
}
