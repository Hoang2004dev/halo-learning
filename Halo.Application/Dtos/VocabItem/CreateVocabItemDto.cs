using Halo.Domain.Enums;

namespace Halo.Application.Dtos.VocabItem
{
    public class CreateVocabItemDto
    {
        public string Word { get; set; } = null!;
        public string NativeMeaning { get; set; } = null!;
        public string ForeignMeaning { get; set; } = null!;
        public string? Example { get; set; }
        public string? AudioUrl { get; set; }
        public string? Description { get; set; }
        public VocabStatus Status { get; set; }
        public int StudyDayId { get; set; }
    }
}
