using System.Runtime.Serialization;

namespace Halo.Domain.Enums
{
    public enum VocabStatus
    {
        [EnumMember(Value = "not_learned")]
        NotLearned,

        [EnumMember(Value = "learning")]
        Learning,

        [EnumMember(Value = "mastered")]
        Mastered,

        [EnumMember(Value = "review")]
        Review
    }
}
