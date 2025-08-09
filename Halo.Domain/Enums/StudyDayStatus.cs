using System.Runtime.Serialization;

namespace Halo.Domain.Enums
{
    public enum StudyDayStatus
    {
        [EnumMember(Value = "not_started")]
        NotStarted,

        [EnumMember(Value = "in_progress")]
        InProgress,

        [EnumMember(Value = "completed")]
        Completed,

        [EnumMember(Value = "overdue")]
        Overdue
    }
}
