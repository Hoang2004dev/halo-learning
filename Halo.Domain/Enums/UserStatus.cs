using System.Runtime.Serialization;

namespace Halo.Domain.Enums
{
    public enum UserStatus
    {
        [EnumMember(Value = "active")]
        Active,

        [EnumMember(Value = "inactive")]
        Inactive,

        [EnumMember(Value = "banned")]
        Banned
    }
}
