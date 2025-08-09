using Halo.Infrastructure.Converters;
using Microsoft.EntityFrameworkCore;

namespace Halo.Infrastructure.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void UseUtcDateTime(this ModelBuilder modelBuilder)
        {
            var utcConverter = new DateTimeUtcValueConverter();
            var nullableUtcConverter = new NullableDateTimeUtcValueConverter();

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(DateTime))
                    {
                        property.SetValueConverter(utcConverter);
                    }

                    if (property.ClrType == typeof(DateTime?))
                    {
                        property.SetValueConverter(nullableUtcConverter);
                    }
                }
            }
        }
    }
}
