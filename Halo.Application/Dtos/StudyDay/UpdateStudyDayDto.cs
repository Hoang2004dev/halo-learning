using Halo.Domain.Enums;

namespace Halo.Application.Dtos.StudyDay
{
    public class UpdateStudyDayDto
    {
        public int Id { get; set; }
        public DateTime TargetDate { get; set; }
        public StudyDayStatus Status { get; set; }
        public string? Note { get; set; }
    }
}
