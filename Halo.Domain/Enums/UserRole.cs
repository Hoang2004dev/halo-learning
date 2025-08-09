using System.Runtime.Serialization;

namespace Halo.Domain.Enums
{
    public enum UserRole
    {
        [EnumMember(Value = "student")]
        Student,

        [EnumMember(Value = "teacher")]
        Teacher,

        [EnumMember(Value = "admin")]
        Admin
    }
}
