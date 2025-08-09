using System.Reflection;
using System.Runtime.Serialization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Halo.Api.Common.Json
{
    public class FlexibleEnumConverter<T> : JsonConverter<T> where T : struct, Enum
    {
        private readonly Dictionary<string, T> _lookup;

        public FlexibleEnumConverter()
        {
            _lookup = typeof(T)
                .GetFields(BindingFlags.Public | BindingFlags.Static)
                .SelectMany(f =>
                {
                    var name = f.Name;
                    var enumValue = (T)f.GetValue(null)!;

                    // Lấy giá trị từ EnumMember (nếu có)
                    var enumMemberAttr = f.GetCustomAttribute<EnumMemberAttribute>();
                    var alias = enumMemberAttr?.Value;

                    return new[]
                    {
                    new KeyValuePair<string, T>(name.ToLower(), enumValue),
                    new KeyValuePair<string, T>(enumValue.ToString().ToLower(), enumValue),
                    new KeyValuePair<string, T>(alias?.ToLower() ?? "", enumValue)
                    };
                })
                .Where(x => !string.IsNullOrWhiteSpace(x.Key))
                .GroupBy(x => x.Key) // avoid duplicates
                .Select(g => g.First())
                .ToDictionary(k => k.Key, v => v.Value);
        }

        public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var str = reader.GetString();

            if (string.IsNullOrWhiteSpace(str))
                throw new JsonException("Enum value is null or empty.");

            if (_lookup.TryGetValue(str.ToLower(), out var result))
            {
                return result;
            }

            throw new JsonException($"Invalid value '{str}' for enum type {typeof(T).Name}.");
        }

        public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString());
        }
    }
}
